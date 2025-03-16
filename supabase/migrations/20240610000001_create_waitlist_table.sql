-- Create waitlist table for storing email signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT
);

-- Enable row level security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting emails (anyone can sign up)
DROP POLICY IF EXISTS "Anyone can add their email to waitlist" ON waitlist;
CREATE POLICY "Anyone can add their email to waitlist"
ON waitlist FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Create policy for admins to view all emails
DROP POLICY IF EXISTS "Admins can view all waitlist emails" ON waitlist;
CREATE POLICY "Admins can view all waitlist emails"
ON waitlist FOR SELECT
TO authenticated
USING (true);

-- Add to realtime
alter publication supabase_realtime add table waitlist;
