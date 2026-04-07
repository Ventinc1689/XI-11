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
}

// Filters for player search
export interface PlayerFilters {
    search?: string
    positions?: string
    clubs?: string
    nationality?: string
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