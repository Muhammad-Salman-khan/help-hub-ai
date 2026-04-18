-- Helplytics AI Database Schema
-- Run this in Supabase SQL Editor

-- Enable RLS
alter table if exists public.profiles enable row level security;

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  bio text,
  location text,
  skills text[] default '{}',
  interests text[] default '{}',
  role text default 'both', -- seeker, helper, both
  trust_score int default 0,
  completed_onboarding boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Requests table
create table if not exists public.requests (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  category text not null,
  urgency text default 'medium', -- low, medium, high
  status text default 'open', -- open, in_progress, solved
  tags text[] default '{}',
  author_id uuid references public.profiles(id) on delete cascade not null,
  ai_summary text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Request helpers (who offered to help)
create table if not exists public.request_helpers (
  id uuid default gen_random_uuid() primary key,
  request_id uuid references public.requests(id) on delete cascade not null,
  helper_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending', -- pending, accepted, declined
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(request_id, helper_id)
);

-- Messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Notifications table
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- request, message, solved, helper, trending
  title text not null,
  description text,
  link text,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Leaderboard cache
create table if not exists public.leaderboard (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  helped_count int default 0,
  rating decimal(2,1) default 5.0,
  points int default 0,
  period text default 'monthly', -- weekly, monthly, alltime
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, period)
);

-- RLS Policies

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Requests: viewable by all, insert by authenticated, update by author
CREATE POLICY "Requests are viewable by everyone" ON public.requests
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create requests" ON public.requests
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can update own requests" ON public.requests
  FOR UPDATE USING (auth.uid() = author_id);

-- Request helpers: viewable by all, insert by authenticated
CREATE POLICY "Request helpers are viewable by everyone" ON public.request_helpers
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can offer help" ON public.request_helpers
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Messages: viewable by sender or receiver
CREATE POLICY "Users can view own messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Notifications: viewable by user
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Leaderboard: viewable by all
CREATE POLICY "Leaderboard is viewable by everyone" ON public.leaderboard
  FOR SELECT USING (true);

-- Functions

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_requests_updated_at
  BEFORE UPDATE ON public.requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'role', 'both'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
