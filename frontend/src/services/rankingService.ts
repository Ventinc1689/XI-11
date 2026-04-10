import api from './api'
import type { RankingList, RankingEntry } from '../types/player'


// Service for all ranking-related API calls
export const RankingService = {
    
    // Fetch the ranking list and its entries for a given category
    getRanking: (category: string) => {
        return api.get<RankingList>(`/ranking/${encodeURIComponent(category)}`)
    },

    // Create a new ranking entry for the list
    addEntry: (listId: string, playerId: string, rank: number) => {
        return api.post(`/ranking/${listId}/entries`, {
            player_id: playerId,
            rank,
        })
    },

    // Remove an entry from the list
    removeEntry: (listId: string, entryId: string) => {
        return api.delete(`/ranking/${listId}/entries/${entryId}`)
    },

    // Reorder entries in the list by providing an array of entry IDs in the new order
    reorder: (listId: string, entryIds: string[]) => {
        return api.put(`/ranking/${listId}/update`, {
            entry_ids: entryIds,
        })
    },
}