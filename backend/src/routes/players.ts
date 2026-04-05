import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

// Helper function to apply search filter to a Supabase query
function applySearchFilter(query: any, search?: string) {
    if (search && search.trim()) {
        return query.ilike('name', `%${search.trim()}%`)
    }
    return query
}

// Helper function to apply nationality filter to a Supabase query
function applyNationalityFilter(query: any, nationality?: string) {
    if (nationality) {
        return query.eq('nationality', nationality)
    }
    return query
}

// Helper function to apply position filter to a Supabase query
async function applyPositionFilter(query: any, position?: string) {
    if (!position || position === 'All') return query

    // Get position ID
    const { data: posData } = await supabase
        .from('positions')
        .select('id')
        .eq('abbrev', position)
        .single()

    if (!posData) return null // Position doesn't exist

    // Get player IDs with this position
    const { data: junctionData } = await supabase
        .from('player_positions')
        .select('player_id')
        .eq('position_id', posData.id)

    if (!junctionData || junctionData.length === 0) return null 

    // Filter players to those IDs
    return query.in('id', junctionData.map(row => row.player_id))
}

// GET /api/players - Get all players
router.get('/', async (req: Request, res: Response) => {
    const { search, position, club, nationality } = req.query as Record<string, string | undefined>
    
    // Query the players table and include related club and position names
    let query = supabase
        .from('players')
        .select(`
            *,
            player_clubs(clubs(name)),
            player_positions(positions(abbrev))
        `)
        .order('name', { ascending: true })

    // Apply each filter — if the value is missing, the filter is skipped
    query = applySearchFilter(query, search)
    query = applyNationalityFilter(query, nationality)
    query = await applyPositionFilter(query, position)
    if (!query) return res.json([]) // No players matched the position

    const { data, error } = await query

    if (error) return res.status(500).json({ error: error.message })

    // Clean the data
    const cleanedData = data.map((player: any) => ({
        ...player,
        clubs: player.player_clubs?.map((pc: any) => pc.clubs?.name).filter(Boolean) ?? [],
        positions: player.player_positions?.map((pp: any) => pp.positions?.abbrev).filter(Boolean) ?? [],
        player_clubs: undefined,
        player_positions: undefined
    }))

    return res.json(cleanedData)
})

export default router