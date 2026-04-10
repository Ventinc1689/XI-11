import { Request, Response, NextFunction } from 'express'
import { supabase } from '../lib/supabase'

// Checks if the request has a valid JWT token in the Authorization header.
export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    // Verify the token with Supabase. If valid, we'll get the user data back.
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
        return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Attach the user to the request object so route handlers can access it
    (req as any).user = data.user

    // Token is valid — continue to the route handler
    next()
}