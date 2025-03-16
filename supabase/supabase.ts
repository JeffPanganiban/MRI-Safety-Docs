import { createClient } from "@supabase/supabase-js";

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create the Supabase client only if properly configured
let supabaseClient: ReturnType<typeof createClient> | null = null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey && supabaseUrl.startsWith("http");
};

// Initialize the client if properly configured
if (isSupabaseConfigured()) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

// Export the client (will be null if not configured)
export const supabase = supabaseClient;
