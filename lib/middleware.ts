import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { UserRole } from './database.types'

type RoleCheck = UserRole | 'admin'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: claimsData } = await supabase.auth.getClaims()
  const user = claimsData?.claims

  // Public routes - no auth needed
  const publicRoutes = ['/', '/auth', '/login', '/leaderboard', '/explore']
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname === route ||
    request.nextUrl.pathname.startsWith('/auth/')
  )

  // Auth routes - redirect to dashboard if logged in
  const authRoutes = ['/auth/login', '/auth/sign-up']
  const isAuthRoute = authRoutes.some(route =>
    request.nextUrl.pathname === route
  )

  // Redirect logged-in users away from auth pages
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Redirect non-logged-in users to login for protected routes
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Role-based access control for logged-in users
  if (user) {
    const userId = user.sub
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, completed_onboarding, email')
      .eq('id', userId)
      .single()

    const path = request.nextUrl.pathname

    // Check admin access first (before onboarding check)
    const requiredRoles = getRouteRoles(path)
    const isAdminRoute = requiredRoles?.includes('admin')

    // For now, admin is determined by a specific email or env variable
    // In production, use a proper admin flag in the database
    const isAdmin = profile?.email === process.env.ADMIN_EMAIL || false

    if (isAdminRoute && !isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    // Enforce onboarding completion (skip for admin)
    if (!profile?.completed_onboarding && path !== '/onboarding' && !isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }

    // Skip role check for onboarding, public routes, and admin
    if (profile?.completed_onboarding && path !== '/onboarding' && !isAdmin) {
      if (requiredRoles && !canAccess(profile?.role, requiredRoles)) {
        const url = request.nextUrl.clone()
        url.pathname = getRedirectForRole(profile?.role)
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}

function getRouteRoles(path: string): RoleCheck[] | null {
  // Exact matches
  const routeMap: Record<string, RoleCheck[]> = {
    '/admin': ['admin'],
    '/requests/new': ['seeker', 'both'],
    '/dashboard': ['seeker', 'helper', 'both'],
    '/explore': ['seeker', 'helper', 'both'],
    '/leaderboard': ['seeker', 'helper', 'both'],
    '/messages': ['seeker', 'helper', 'both'],
    '/notifications': ['seeker', 'helper', 'both'],
    '/profile': ['seeker', 'helper', 'both'],
    '/ai-center': ['seeker', 'helper', 'both'],
  }

  if (routeMap[path]) return routeMap[path]

  // Pattern matches
  if (path.startsWith('/requests/')) return ['seeker', 'helper', 'both']
  if (path.startsWith('/admin/')) return ['admin']

  return null
}

function canAccess(userRole: UserRole | null, required: RoleCheck[]): boolean {
  if (!userRole) return false
  if (userRole === 'both') return true
  return required.includes(userRole) || required.includes('both')
}

function getRedirectForRole(role: UserRole | null): string {
  if (!role) return '/auth/login'
  if (role === 'seeker') return '/explore'
  if (role === 'helper') return '/explore'
  return '/dashboard'
}
