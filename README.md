# HelpHub AI

A modern community-driven help platform built with Next.js, Supabase, and TypeScript. Connect people who need help with those who can provide it.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.103.3-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Role-Based Access Control](#role-based-access-control)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## Features

### Core Platform Features

- **Smart Request Creation** — AI-powered categorization, urgency detection, and tag suggestions
- **Role-Based Access** — Three user roles: Seeker, Helper, Both
- **Real-time Dashboard** — Personalized stats and activity tracking
- **Admin Panel** — Platform analytics and content moderation
- **Onboarding Flow** — Guided profile setup for new users
- **Responsive Design** — Mobile-first with beautiful warm aesthetic

### User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `seeker` | Need help with challenges | Create requests, browse, message |
| `helper` | Want to help others | Browse requests, offer help, message |
| `both` | Do both | Full platform access |

### Pages

- **Landing** — Hero section with feature highlights
- **Dashboard** — Role-aware personalized dashboard
- **Explore** — Browse all help requests
- **Request Detail** — View request, offer help, mark solved
- **Create Request** — AI-assisted request creation
- **AI Center** — Platform AI features hub
- **Leaderboard** — Top contributors
- **Messages** — Communication between users
- **Profile** — User profile management
- **Admin Panel** — Platform management (admin only)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
│                   (App Router + RSC)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Client     │  │   Server     │  │    Middleware    │  │
│  │  Components  │  │  Components  │  │   (Auth/RBAC)    │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Supabase Client                        │
│              (SSR + Browser + Database)                     │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │               │
               ┌────▼────┐     ┌─────▼─────┐
               │   Auth  │     │ Database  │
               │ (Magic  │     │ (Postgres)│
               │  Link)  │     └───────────┘
               └─────────┘
```

---

## Tech Stack

### Framework & Runtime
- **Next.js 16.2.4** — React framework with App Router
- **React 19.2.4** — UI library
- **TypeScript 5** — Type safety
- **Turbopack** — Fast development builds

### Database & Auth
- **Supabase** — Postgres database + Auth
- **@supabase/ssr** — Server-side rendering support
- **@supabase/supabase-js** — Client SDK

### UI & Styling
- **Tailwind CSS 4** — Utility-first styling
- **Radix UI** — Headless accessible components
- **shadcn/ui** — Pre-built component library
- **Lucide React** — Icon library
- **next-themes** — Dark/light mode

### Development Tools
- **ESLint 9** — Linting
- **Babel React Compiler** — Performance optimization

---

## Getting Started

### Prerequisites

- Node.js 18+ (Node.js 24 LTS recommended)
- npm, yarn, pnpm, or bun
- Supabase account (free tier works)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/helphub-ai.git
cd helphub-ai
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](httplocalhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file with these variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# Admin Configuration (optional)
ADMIN_EMAIL=admin@example.com
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy `Project URL` and `anon public` key
4. Run the database schema (see Database Schema section)

---

## Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Enums
CREATE TYPE user_role AS ENUM ('seeker', 'helper', 'both');
CREATE TYPE request_status AS ENUM ('open', 'in_progress', 'solved');
CREATE TYPE request_urgency AS ENUM ('low', 'medium', 'high');
CREATE TYPE helper_status AS ENUM ('pending', 'accepted', 'declined');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  bio TEXT,
  location TEXT,
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  role user_role DEFAULT 'both',
  trust_score INTEGER DEFAULT 0,
  completed_onboarding BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Requests table
CREATE TABLE requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  urgency request_urgency DEFAULT 'medium',
  status request_status DEFAULT 'open',
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ai_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Request helpers (junction table)
CREATE TABLE request_helpers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
  helper_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status helper_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(request_id, helper_id)
);

-- Messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leaderboard table
CREATE TABLE leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  helped_count INTEGER DEFAULT 0,
  rating DECIMAL DEFAULT 0,
  points INTEGER DEFAULT 0,
  period TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_helpers ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only owner can update
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Requests: anyone can read, only author can modify
CREATE POLICY "Requests are viewable by everyone" ON requests
  FOR SELECT USING (true);

CREATE POLICY "Users can create requests" ON requests
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update requests" ON requests
  FOR UPDATE USING (auth.uid() = author_id);

-- Triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## Role-Based Access Control

### Middleware Protection

The middleware (`lib/middleware.ts`) handles:

1. **Authentication check** — Redirects to login if not authenticated
2. **Onboarding enforcement** — Redirects to `/onboarding` if not completed
3. **Role-based access** — Blocks access based on user role
4. **Admin protection** — Only `ADMIN_EMAIL` can access `/admin`

### Protected Routes

| Route | Allowed Roles |
|-------|---------------|
| `/requests/new` | `seeker`, `both` |
| `/dashboard` | All authenticated |
| `/explore` | All authenticated |
| `/admin` | `ADMIN_EMAIL` only |

### Role Utilities

```typescript
import { canSeek, canHelp } from '@/lib/role-check'

// Check permissions
if (canSeek(user.role)) {
  // Show create request button
}

if (canHelp(user.role)) {
  // Show help offering UI
}
```

---

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── ai-center/         # AI features hub
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── explore/           # Browse requests
│   ├── leaderboard/       # Top contributors
│   ├── messages/          # Messaging
│   ├── notifications/     # Notifications
│   ├── onboarding/        # Profile setup
│   ├── profile/           # User profile
│   ├── protected/         # Protected demo
│   ├── requests/          # Request pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/             # React components
│   └── ui/                # shadcn/ui components
├── lib/                    # Utility functions
│   ├── client.ts          # Browser Supabase client
│   ├── database.types.ts  # TypeScript types
│   ├── middleware.ts      # Auth middleware
│   ├── role-check.ts     # Role utilities
│   ├── roles.ts          # Role definitions
│   ├── server.ts          # Server Supabase client
│   └── utils.ts           # Helper functions
├── public/                 # Static assets
├── .env.local              # Environment variables
├── next.config.js          # Next.js config
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind config
└── tsconfig.json           # TypeScript config
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy

```bash
# Using Vercel CLI
vercel --prod
```

### Self-Hosted

```bash
# Build
npm run build

# Start
npm start
```

---

## Development

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style

- **TypeScript** strict mode enabled
- **ESLint** for linting
- **Tailwind** for styling
- **Caveman mode** for commits

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "feat: add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT License — see LICENSE file for details.

---

## Support

- Documentation: [AGENTS.md](./AGENTS.md)
- Issues: [GitHub Issues](https://github.com/yourusername/helphub-ai/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/helphub-ai/discussions)

---

<p align="center">
  Built with ❤️ using Next.js, Supabase, and Tailwind CSS
</p>
