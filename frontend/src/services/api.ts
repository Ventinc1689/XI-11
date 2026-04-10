import axios from 'axios';
import { supabase } from '../lib/supabase'

// Create an Axios instance with the base URL of our API
const api = axios.create({
  baseURL: "/api/",
});

// Add a request interceptor to include the JWT token in all requests
api.interceptors.request.use(async (config) => {
    // Get the current session — this returns the latest token
    const { data: { session } } = await supabase.auth.getSession()

    // If the user is logged in, attach their token
    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`
    }

    return config
})

export default api;