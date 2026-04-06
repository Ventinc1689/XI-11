// Player type definition
export interface Player {
    id: string
    name: string
    nationality: string
    image_url: string | null
    is_active: boolean
    clubs: string[]
    positions: string[]
}

export interface PlayerListResponse {
    players: Player[]
}

// Filters for player search
export interface PlayerFilters {
    search?: string
    postions?: string
    clubs?: string
    nationality?: string
}

// Response format for player search API
export interface PlayerSearchResponse {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}