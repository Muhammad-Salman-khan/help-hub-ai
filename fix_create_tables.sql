-- Fix: Create all tables in proper dependency order
-- Run this in Supabase SQL Editor

-- 1. Profiles table first (no dependencies)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name text,
  bio text,
  location text,
  skills text[] DEFAULT '{}',
  interests text[] DEFAULT '{}',
  role text DEFAULT 'both',
  trust_score int DEFAULT 0,
  completed_onboarding boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Requests table (depends on profiles)
CREATE TABLE IF NOT EXISTS public.requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  urgency text DEFAULT 'medium',
  status text DEFAULT 'open',
  tags text[] DEFAULT '{}',
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  ai_summary text,
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on requests
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

-- 3. Request helpers table (depends on requests and profiles)
CREATE TABLE IF NOT EXISTS public.request_helpers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id uuid REFERENCES public.requests(id) ON DELETE CASCADE NOT NULL,
  helper_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT timezone('utc'::text, now()),
  UNIQUE(request_id, helper_id)
);

-- Enable RLS
ALTER TABLE public.request_helpers ENABLE ROW LEVEL SECURITY;

-- 4. Messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 5. Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  description text,
  link text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 6. Leaderboard table
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  helped_count int DEFAULT 0,
  rating decimal(2,1) DEFAULT 5.0,
  points int DEFAULT 0,
  period text DEFAULT 'monthly',
  updated_at timestamptz DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, period)
);

ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Verify all tables created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
