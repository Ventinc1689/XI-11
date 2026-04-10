// Player type definition
export interface Player {
    id: string
    name: string
    nationality: string
    country_code: string | null
    is_active: boolean
    clubs: string[]
    positions: string[]
}

export interface PlayerListResponse {
    players: Player[]
    onAdd: (playerId: string) => void
}

// Filters for player search
export interface PlayerFilters {
    search?: string
    positions?: string
    clubs?: string
    nationality?: string
}

// Props for PlayerSearch component
export interface PlayerPoolProps {
    onAdd: (playerId: string, rank: number, player: Player) => Promise<void>
    currentCount: number
    maxEntries: number
    changeTab: React.Dispatch<React.SetStateAction<'rankings' | 'pool'>>
}

// Response format for player search API
export interface PlayerSearchResponse {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

// Props for ranking options dropdown
export interface RankingOption {
    selectedOption: string
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
    dropdownOpen: boolean
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Individual ranking entry with player details
export interface RankingEntry {
    id: string
    rank: number
    player_id: string
    player: Player
}

// The ranking list metadata + its entries 
export interface RankingList {
    list: {
        id: string
        category: string
        max_entries: number
    }
    entries: RankingEntry[]
}

// Props for the RankingTable component
export interface RankingTableProps {
    entries: RankingEntry[]
    maxEntries: number
    loading: boolean
    error: string | null
    onRemove: (entryId: string) => Promise<void>
    onReorder: (newEntries: RankingEntry[]) => Promise<void>
}

// Props for the AddPlayerModal component
export interface AddPlayerModalProps {
    player: Player
    maxRank: number
    loading: boolean
    onConfirm: (rank: number) => void
    onClose: () => void
}