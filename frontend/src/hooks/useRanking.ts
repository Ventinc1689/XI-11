import { useEffect, useState } from 'react'
import { RankingService } from '../services/rankingService'
import type { RankingEntry, Player } from '../types/player'

// Custom hook to manage ranking list state and actions
export function useRanking(category: string) {
    const [entries, setEntries] = useState<RankingEntry[]>([])
    const [listId, setListId] = useState<string | null>(null)
    const [maxEntries, setMaxEntries] = useState(25)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch the ranking list whenever the category changes
    useEffect(() => {
        fetchRanking()
    }, [category])

    const fetchRanking = async () => {
        setLoading(true)
        setError(null)

        try {
            const { data } = await RankingService.getRanking(category)
            setListId(data.list.id)
            setMaxEntries(data.list.max_entries)
            setEntries(data.entries)
        } catch (err: any) {
            setError(err.response?.data?.error ?? 'Failed to load ranking')
        } finally {
            setLoading(false)
        }
    }

    // Add a player to the ranking list at a specific rank.
    const addPlayer = async (playerId: string, rank: number, player: Player) => {
        if (!listId) return

        const previousEntries = [...entries]

        // Build the new entries array with the player inserted at the right rank
        const updated = [...entries]

        // Shift ranks of existing entries at or below the target rank
        for (const entry of updated) {
            if (entry.rank >= rank) {
                entry.rank += 1
            }
        }

        // Insert the new entry with a temporary ID
        updated.push({
            id: 'temp-' + Date.now(),
            rank,
            player_id: playerId,
            player,
        })

        // Sort by rank so the list displays correctly
        updated.sort((a, b) => a.rank - b.rank)

        // Update UI immediately
        setEntries(updated)

        try {
            await RankingService.addEntry(listId, playerId, rank)
            await fetchRanking()
        } catch (err: any) {
            setEntries(previousEntries)
            const message = err.response?.data?.error ?? 'Failed to add player'
            throw new Error(message)
        }
    }

    // Remove a player from the ranking list by entry ID
    const removePlayer = async (entryId: string) => {
        if (!listId) return

        const previousEntries = [...entries]

        // Find the entry being removed
        const removedEntry = entries.find(e => e.id === entryId)
        if (!removedEntry) return

        // Remove it and re-number the remaining entries
        const updated = entries
            .filter(e => e.id !== entryId)
            .map((entry, index) => ({ ...entry, rank: index + 1 }))

        // Update UI immediately
        setEntries(updated)

        try {
            await RankingService.removeEntry(listId, entryId)
        } catch (err: any) {
            setEntries(previousEntries)
            const message = err.response?.data?.error ?? 'Failed to remove player'
            throw new Error(message)
        }
    }

    // Reorder players in the ranking list based on a new array of entries with updated ranks
    const reorderPlayers = async (newEntries: RankingEntry[]) => {
        if (!listId) return

        // Save the current order in case we need to revert
        const previousEntries = [...entries]

        // Optimistic update — show the new order immediately
        setEntries(newEntries)

        try {
            const entryIds = newEntries.map(e => e.id)
            await RankingService.reorder(listId, entryIds)
        } catch (err: any) {
            setEntries(previousEntries)
            const message = err.response?.data?.error ?? 'Failed to reorder'
            throw new Error(message)
        }
    }

    return {
        entries,
        listId,
        maxEntries,
        loading,
        error,
        addPlayer,
        removePlayer,
        reorderPlayers,
    }
}