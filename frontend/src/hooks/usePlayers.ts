import { useEffect, useState, useRef } from 'react'
import { PlayerService } from '../services/playerService'
import type { Player } from '../types/player'

export function usePlayers(search: string, position: string) {
    const [players, setPlayers] = useState<Player[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // To prevent race conditions when multiple requests are made in quick succession
    const latestRequest = useRef(0)

    // Debounce search and position filters
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPlayers()
        }, 300)

        return () => clearTimeout(timer)
    }, [search, position])

    // Fetch players with current filters
    const fetchPlayers = async () => {
        const requestId = ++latestRequest.current
        setLoading(true)
        setError(null)

        try {
            const filters: Record<string, string> = {}
            if (search.trim()) filters.search = search.trim()
            if (position && position !== 'All') filters.position = position

            const { data } = await PlayerService.getAllPlayers(filters)

            // If this response is outdated, ignore it
            if (requestId !== latestRequest.current) return

            setPlayers(data)
        } catch (err: any) {
            if (requestId !== latestRequest.current) return
            setError(err.response?.data?.error ?? 'Failed to fetch players')
        } finally {
            if (requestId === latestRequest.current) {
                setLoading(false)
            }
        }
    }

    return { players, loading, error }
}