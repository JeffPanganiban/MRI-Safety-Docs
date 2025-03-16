import { createClient } from "@supabase/supabase-js";

// Default to a valid URL if environment variables aren't available
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://gpjmttgqolnblfiiikra.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuaXhzd3R4dnVxdHl0bmVxZ29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjUyNDMsImV4cCI6MjA1NzMwMTI0M30.-qsxItJdRegH2_wQogU7sntv_tXhi1S1tjK6fkmYHyk";

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Create the client with the URL and key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
