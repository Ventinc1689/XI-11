import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase'

const router = Router()

// GET /api/players - Get all players
router.get('/', async (req: Request, res: Response) => {
    
    // Query the players table and include related club and position names
    const { data, error } = await supabase
        .from('players')
        .select(`
            *,
            player_clubs(clubs(name)),
            player_positions(positions(name))
        `)

    // Handle any errors that occur during the query
    if (error) {
        return res.status(500).json({ error: error.message })
    }

    // Clean the data
    const cleanedData = data.map((player: any) => ({
        ...player,
        clubs: player.player_clubs.map((pc: any) => pc.clubs.name),
        positions: player.player_positions.map((pp: any) => pp.positions.name),
        player_clubs: undefined,
        player_positions: undefined
    }))

    // Return the cleaned players as JSON
    return res.json(cleanedData)

})

export default router