-- Migration: Add missing author_id column to requests table
-- Run this in Supabase SQL Editor

-- Add author_id column if missing
ALTER TABLE public.requests
ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Make it NOT NULL after adding (will fail if existing rows have NULL)
-- If you have existing data, either:
--   1. Delete existing rows first: DELETE FROM public.requests;
--   2. Or set a default: UPDATE public.requests SET author_id = (SELECT id FROM profiles LIMIT 1);

-- Then run:
-- ALTER TABLE public.requests ALTER COLUMN author_id SET NOT NULL;

-- Verify column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'requests'
ORDER BY ordinal_position;
