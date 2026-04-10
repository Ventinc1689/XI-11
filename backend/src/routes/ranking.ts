import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase'
import { verifyAuth } from '../middleware/auth'

const router = Router()

// Checks the JWT token and attaches the user to the request if valid
router.use(verifyAuth)


// GET /api/ranking - Get the user's current ranking
router.get('/:category', async (req: Request, res: Response) => {
    const userId = (req as any).user.id
    const { category } = req.params as { category: string }

    try {
        // Try to find the user's existing list for this category
        let { data: list } = await supabase
            .from('ranking_categories')
            .select('*')
            .eq('user_id', userId)
            .eq('category', category)
            .single()

        // If no list exists, create a new one with empty player slots
        if (!list) {
            const maxEntries = getMaxEntries(category)

            const { data: newList, error: createError } = await supabase
                .from('ranking_categories')
                .insert({ user_id: userId, category, max_entries: maxEntries })
                .select()
                .single()

            if (createError) {
                return res.status(500).json({ error: createError.message })
            }
            list = newList
        }

        // Fetch all entries in this list, ordered by rank
        const { data: entries, error: entriesError } = await supabase
            .from('ranking_entries')
            .select(`
                id,
                rank,
                player_id,
                players (
                    id,
                    name, 
                    nationality,
                    country_code,
                    player_clubs(clubs(name)),
                    player_positions(positions(abbrev))
                )
            `)
            .eq('ranking_category_id', list.id)
            .order('rank', { ascending: true })
            
        if (entriesError) {
            return res.status(500).json({ error: entriesError.message })
        }

        // Clean up the nested player data 
        const cleanedEntries = entries.map((entry: any) => ({
            id: entry.id,
            rank: entry.rank,
            player_id: entry.player_id,
            player: {
                ...entry.players,
                clubs: entry.players?.player_clubs?.map((pc: any) => pc.clubs?.name).filter(Boolean) ?? [],
                positions: entry.players?.player_positions?.map((pp: any) => pp.positions?.abbrev).filter(Boolean) ?? [],
                player_clubs: undefined,
                player_positions: undefined,
            }
        }))

        // Return the list info along with the ranked player entries
        return res.json({
            list: {
                id: list.id,
                category: list.category,
                max_entries: list.max_entries,
            },
            entries: cleanedEntries,
        })
    } catch (error) {
        console.error('Error fetching ranking:', error)
        return res.status(500).json({ error: 'An unexpected error occurred' })
    }
})


// Add a player to a ranking list
router.post('/:listId/entries', async (req: Request, res: Response) => {
    const userId = (req as any).user.id
    const { listId } = req.params
    const { player_id, rank } = req.body

    if (!player_id) {
        return res.status(400).json({ error: 'player_id is required' })
    }
    if (!rank || rank < 1) {
        return res.status(400).json({ error: 'rank must be a positive number' })
    }

    try {
        // Verify this list belongs to the current user
        const { data: list, error: listError } = await supabase
            .from('ranking_categories')
            .select('id, max_entries')
            .eq('id', listId)
            .eq('user_id', userId)
            .single()

        if (listError || !list) {
            return res.status(404).json({ error: 'Ranking list not found' })
        }

        // Count how many entries are already in the list
        const { count } = await supabase
            .from('ranking_entries')
            .select('*', { count: 'exact', head: true })
            .eq('ranking_category_id', listId)

        // Check if the list is full
        if (count !== null && count >= list.max_entries) {
            return res.status(400).json({ error: `List is full (max ${list.max_entries})` })
        }

        // Cap the rank to the next available position
        const currentCount = count ?? 0
        const targetRank = Math.min(rank, currentCount + 1)

        // Shift existing entries down to make room
        const { data: toShift } = await supabase
            .from('ranking_entries')
            .select('id, rank')
            .eq('ranking_category_id', listId)
            .gte('rank', targetRank)
            .order('rank', { ascending: false }) // bottom up

        if (toShift) {
            for (const entry of toShift) {
                await supabase
                    .from('ranking_entries')
                    .update({ rank: entry.rank + 1 })
                    .eq('id', entry.id)
            }
        }

        // Insert the new player at the target rank
        const { data: newEntry, error: insertError } = await supabase
            .from('ranking_entries')
            .insert({
                ranking_category_id: listId,
                player_id,
                rank: targetRank,
            })
            .select()
            .single()

        // Handle unique constraint violation (player already in list)
        if (insertError) {
            if (insertError.code === '23505') {
                return res.status(400).json({ error: 'Player is already in this list' })
            }
            return res.status(500).json({ error: insertError.message })
        }

        // Update the list's updated_at timestamp
        await supabase
            .from('ranking_categories')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', listId)

        return res.status(201).json(newEntry)
    } catch (err) {
        console.error('Failed to add entry:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
})


// Delete an entry from a ranking list
router.delete('/:listId/entries/:entryId', async (req: Request, res: Response) => {
    const userId = (req as any).user.id
    const { listId, entryId } = req.params

    try {
        // Verify ownership
        const { data: list } = await supabase
            .from('ranking_categories')
            .select('id')
            .eq('id', listId)
            .eq('user_id', userId)
            .single()

        if (!list) return res.status(404).json({ error: 'Ranking category not found' })

        // Get the rank of the entry being removed 
        const { data: entry } = await supabase
            .from('ranking_entries')
            .select('rank')
            .eq('id', entryId)
            .eq('ranking_category_id', listId)
            .single()

        if (!entry) return res.status(404).json({ error: 'Entry not found' })

        // Delete the entry
        const { error: deleteError } = await supabase
            .from('ranking_entries')
            .delete()
            .eq('id', entryId)

        if (deleteError) return res.status(500).json({ error: deleteError.message })

        // Re-number all entries that were ranked BELOW the removed one
        const { data: remaining } = await supabase
            .from('ranking_entries')
            .select('id, rank')
            .eq('ranking_category_id', listId)
            .gt('rank', entry.rank)
            .order('rank', { ascending: true })

        if (remaining) {
            for (const r of remaining) {
                await supabase
                    .from('ranking_entries')
                    .update({ rank: r.rank - 1 })
                    .eq('id', r.id)
            }
        }

        // Update timestamp
        await supabase
            .from('ranking_categories')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', listId)

        return res.json({ message: 'Entry removed' })
    } catch (err) {
        console.error('Failed to remove entry:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
})


// Update the rank of an existing entry (e.g. drag-and-drop reorder)
router.put('/:listId/update', async (req: Request, res: Response) => {
    const userId = (req as any).user.id
    const { listId } = req.params
    const { entry_ids } = req.body

    if (!Array.isArray(entry_ids) || entry_ids.length === 0) {
        return res.status(400).json({ error: 'entry_ids array is required' })
    }

    try {
        // Verify ownership
        const { data: list } = await supabase
            .from('ranking_categories')
            .select('id')
            .eq('id', listId)
            .eq('user_id', userId)
            .single()

        if (!list) return res.status(404).json({ error: 'Ranking category not found' })

        // Fetch all current entries to preserve their player_id data
        const { data: currentEntries } = await supabase
            .from('ranking_entries')
            .select('id, player_id')
            .eq('ranking_category_id', listId)

        if (!currentEntries) return res.status(500).json({ error: 'Failed to fetch entries' })

        // Build a map of entry_id to player_id for quick lookup
        const entryMap = new Map(currentEntries.map(e => [e.id, e.player_id]))

        // Verify all provided entry IDs actually exist in this list
        const allValid = entry_ids.every((id: string) => entryMap.has(id))
        if (!allValid) {
            return res.status(400).json({ error: 'One or more entry IDs are invalid' })
        }

        // Delete all entries, then re-insert in the new order
        const { error: deleteError } = await supabase
            .from('ranking_entries')
            .delete()
            .eq('ranking_category_id', listId)

        if (deleteError) return res.status(500).json({ error: deleteError.message })

        // Re-insert with new ranks based on array position
        const newEntries = entry_ids.map((entryId: string, index: number) => ({
            ranking_category_id: listId,
            player_id: entryMap.get(entryId),
            rank: index + 1,
        }))

        const { error: insertError } = await supabase
            .from('ranking_entries')
            .insert(newEntries)

        if (insertError) return res.status(500).json({ error: insertError.message })

        // Update timestamp
        await supabase
            .from('ranking_categories')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', listId)

        return res.json({ message: 'Reorder successful' })
    } catch (err) {
        console.error('Failed to reorder:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
})

// Helper function to determine max entries based on category
function getMaxEntries(category: string): number {
    const limits: Record<string, number> = {
        'Top 25': 25,
        'Active': 25,
        'Strikers': 15,
        'Midfielders': 15,
        'Defenders': 15,
        'Goalkeepers': 10,
    }
    return limits[category] ?? 25
}

export default router