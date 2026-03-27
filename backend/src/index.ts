import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import playerRoutes from './routes/players'
import authRoutes from './routes/auth'

dotenv.config()
const app = express()

// Read port from .env, or default to 6000 if not set 
const PORT = process.env.PORT || 6000



// ==========================================
// Middleware
// Middleware runs on EVERY request before it hits your routes
// ==========================================

// Enable cors to allow React to talk to this server 
app.use(cors())

// Middleware to parse JSON bodies in requests
app.use(express.json())



// ==========================================
// Routes
// Mount the players router at /api/players
// So GET /api/players → players.ts router
// ==========================================
app.use('/api/players', playerRoutes)

app.use('/api/auth', authRoutes)

// Root route to check if the server is running
app.get('/', (req, res) => {
    res.json({ message: 'Eleven API is running'})
})



// ==========================================
// Start the server
// ==========================================
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}/`)
})