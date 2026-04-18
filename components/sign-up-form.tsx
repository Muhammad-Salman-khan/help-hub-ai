'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type UserRole = 'seeker' | 'helper' | 'both'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [role, setRole] = useState<UserRole>('both')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
          data: {
            role: role,
          },
        },
      })
      if (error) throw error
      router.push('/onboarding')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label>I want to...</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(v) => setRole(v as UserRole)}
                  className="grid gap-3"
                >
                  <div className="flex items-center space-x-2 rounded border p-3 hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="seeker" id="seeker" />
                    <Label htmlFor="seeker" className="cursor-pointer flex-1">
                      <div className="font-medium">Get Help</div>
                      <div className="text-xs text-muted-foreground">I need assistance</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded border p-3 hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="helper" id="helper" />
                    <Label htmlFor="helper" className="cursor-pointer flex-1">
                      <div className="font-medium">Give Help</div>
                      <div className="text-xs text-muted-foreground">I want to help others</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded border p-3 hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="cursor-pointer flex-1">
                      <div className="font-medium">Both</div>
                      <div className="text-xs text-muted-foreground">Give and receive help</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating an account...' : 'Sign up'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
