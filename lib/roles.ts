import type { UserRole } from './database.types'

type RoleCheck = UserRole | 'admin'

export function hasRole(userRole: UserRole | null, required: RoleCheck): boolean {
  if (!userRole) return false
  if (required === 'admin') return false // Admin handled separately
  if (userRole === 'both') return true
  return userRole === required
}

export function canAccess(
  userRole: UserRole | null,
  allowed: RoleCheck[]
): boolean {
  if (!userRole) return false
  return allowed.some(role => hasRole(userRole, role))
}

// Role-based route configuration
export const ROLE_ROUTES: Record<string, RoleCheck[]> = {
  // Seeker-only routes
  '/requests/new': ['seeker', 'both'],
  '/dashboard': ['seeker', 'helper', 'both'],

  // Helper-only routes
  '/leaderboard': ['helper', 'both', 'seeker'], // Open to all
  '/explore': ['helper', 'both', 'seeker'], // Open to all

  // Admin routes
  '/admin': ['admin'],
}

export function getRequiredRoles(path: string): RoleCheck[] | null {
  // Check exact match first
  if (ROLE_ROUTES[path]) return ROLE_ROUTES[path]

  // Check pattern matches
  for (const [route, roles] of Object.entries(ROLE_ROUTES)) {
    if (path.startsWith(route)) return roles
  }

  return null // No role restriction
}
