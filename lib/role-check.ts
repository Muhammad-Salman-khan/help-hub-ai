import { createClient } from './server'
import type { UserRole } from './database.types'

export interface UserWithRole {
  id: string
  email?: string
  role: UserRole | null
  completed_onboarding: boolean | null
}

export async function getCurrentUserWithRole(): Promise<UserWithRole | null> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, completed_onboarding')
    .eq('id', user.id)
    .single()

  return {
    id: user.id,
    email: user.email,
    role: profile?.role ?? null,
    completed_onboarding: profile?.completed_onboarding ?? null,
  }
}

export function canSeek(role: UserRole | null): boolean {
  return role === 'seeker' || role === 'both'
}

export function canHelp(role: UserRole | null): boolean {
  return role === 'helper' || role === 'both'
}

export function isBoth(role: UserRole | null): boolean {
  return role === 'both'
}

export function roleDisplayName(role: UserRole | null): string {
  if (!role) return 'Unknown'
  return role.charAt(0).toUpperCase() + role.slice(1)
}
