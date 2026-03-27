import { Router, Request, Response } from 'express'
import { supabase } from '../lib/supabase' 
import { z } from 'zod'

const router = Router()

// Validation schema for user registration
const registerSchema = z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(7, 'Password must be at least 7 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    first_name: z.string().optional(),
    last_name: z.string().optional()
})

// ==========================================
// POST /api/auth/register
// Creates a new user account
// ==========================================
router.post('/register', async (req: Request, res: Response) => {
    // Validate the request body against the schema
    const result = registerSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message })
    }

    // Extract user details from the request body
    const { email, password, username, first_name, last_name } = result.data

    // Create the user in Supabase
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    })

    if (error) return res.status(400).json({ error: error.message })

    // Update the user's profile with additional information
    await supabase
        .from('users')
        .update({ username, first_name, last_name })
        .eq('id', data.user.id)

    return res.status(201).json({ message: 'User created successfully' })
})

// Validation schema for user login
const loginSchema = z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
})


// ==========================================
// POST /api/auth/login
// Logs in existing user, returns access token
// ==========================================
router.post('/login', async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message })
    }

    const { email, password } = result.data

    // Attempt to sign in the user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) return res.status(400).json({ error: 'Invalid email or password' })

    // Return the access token and user info
    return res.json({
        token: data.session.access_token,
        user: {
            id: data.user.id,
            email: data.user.email
        }
    })
})

router.get('/me', async (req: Request, res: Response) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(401).json({ error: 'No token provided' })

    // Get the user associated with the token
    const { data, error } = await supabase.auth.getUser(token)

    if (error) return res.status(401).json({ error: 'Invalid token' })

    const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

    if (profileError) return res.status(400).json({ error: profileError.message })

    return res.json(profile)
})

export default router