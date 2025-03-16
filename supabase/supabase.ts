import { createClient } from "@supabase/supabase-js";

// Try-catch block to handle URL construction errors
let supabase;
try {
  const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL ||
    "https://gpjmttgqolnblfiiikra.supabase.co";
  const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuaXhzd3R4dnVxdHl0bmVxZ29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjUyNDMsImV4cCI6MjA1NzMwMTI0M30.-qsxItJdRegH2_wQogU7sntv_tXhi1S1tjK6fkmYHyk";

  // Only create client if both values are non-empty strings
  if (
    typeof supabaseUrl === "string" &&
    supabaseUrl.startsWith("http") &&
    typeof supabaseAnonKey === "string" &&
    supabaseAnonKey.length > 0
  ) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.error("Invalid Supabase configuration");
    supabase = null;
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error);
  supabase = null;
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabase;
};

// Export the client
export { supabase };
