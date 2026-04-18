import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

export type TypedSupabaseClient = ReturnType<typeof createBrowserClient<Database>>

export function createClient(): TypedSupabaseClient {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
