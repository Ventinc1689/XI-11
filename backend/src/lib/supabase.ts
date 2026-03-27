import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure that the necessary environment variables are set
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create a Supabase client using the URL and service role key
export const supabase = createClient(supabaseUrl, supabaseKey);