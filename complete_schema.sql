  -- Complete schema: Drop existing and recreate
  -- WARNING: This deletes all data!

  -- Drop dependent tables first
  DROP TABLE IF EXISTS public.leaderboard CASCADE;
  DROP TABLE IF EXISTS public.notifications CASCADE;
  DROP TABLE IF EXISTS public.messages CASCADE;
  DROP TABLE IF EXISTS public.request_helpers CASCADE;
  DROP TABLE IF EXISTS public.requests CASCADE;
  DROP TABLE IF EXISTS public.profiles CASCADE;

  -- Drop functions and triggers
  DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
  DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

  -- 1. Profiles table
  CREATE TABLE public.profiles (
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

  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

  -- 2. Requests table
  CREATE TABLE public.requests (
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

  ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

  -- 3. Request helpers
  CREATE TABLE public.request_helpers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id uuid REFERENCES public.requests(id) ON DELETE CASCADE NOT NULL,
    helper_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT timezone('utc'::text, now()),
    UNIQUE(request_id, helper_id)
  );

  ALTER TABLE public.request_helpers ENABLE ROW LEVEL SECURITY;

  -- 4. Messages
  CREATE TABLE public.messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content text NOT NULL,
    read boolean DEFAULT false,
    created_at timestamptz DEFAULT timezone('utc'::text, now())
  );

  ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

  -- 5. Notifications
  CREATE TABLE public.notifications (
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

  -- 6. Leaderboard
  CREATE TABLE public.leaderboard (
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

  -- RLS Policies

  -- Profiles
  CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
  CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

  -- Requests
  CREATE POLICY "Requests are viewable by everyone" ON public.requests FOR SELECT USING (true);
  CREATE POLICY "Authenticated users can create requests" ON public.requests FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
  CREATE POLICY "Authors can update own requests" ON public.requests FOR UPDATE USING (auth.uid() = author_id);

  -- Request helpers
  CREATE POLICY "Request helpers are viewable by everyone" ON public.request_helpers FOR SELECT USING (true);
  CREATE POLICY "Authenticated users can offer help" ON public.request_helpers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

  -- Messages
  CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
  CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

  -- Notifications
  CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

  -- Leaderboard
  CREATE POLICY "Leaderboard is viewable by everyone" ON public.leaderboard FOR SELECT USING (true);

  -- Functions
  CREATE OR REPLACE FUNCTION public.handle_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- Triggers
  CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

  CREATE TRIGGER handle_requests_updated_at
    BEFORE UPDATE ON public.requests
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

  -- User creation trigger
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO public.profiles (id, role)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'role', 'both'));
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

  -- Verify
  SELECT 'profiles' as table_name, COUNT(*) as columns FROM information_schema.columns WHERE table_name = 'profiles'
  UNION ALL
  SELECT 'requests', COUNT(*) FROM information_schema.columns WHERE table_name = 'requests'
  UNION ALL
  SELECT 'request_helpers', COUNT(*) FROM information_schema.columns WHERE table_name = 'request_helpers'
  UNION ALL
  SELECT 'messages', COUNT(*) FROM information_schema.columns WHERE table_name = 'messages'
  UNION ALL
  SELECT 'notifications', COUNT(*) FROM information_schema.columns WHERE table_name = 'notifications'
  UNION ALL
  SELECT 'leaderboard', COUNT(*) FROM information_schema.columns WHERE table_name = 'leaderboard';
