"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@/lib/client"

type UserRole = "seeker" | "helper" | "both"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [role, setRole] = useState<UserRole>("both")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
          data: { role },
        },
      })

      console.log("Auth signup response:", { user: authData.user, session: !!authData.session })

      if (authError) throw authError

      if (!authData.user) {
        setError("Account created but user data missing. Please contact support.")
        setLoading(false)
        return
      }

      // Wait a moment for trigger to create profile
      await new Promise(r => setTimeout(r, 500))

      // Verify profile was created
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", authData.user.id)
        .single()

      console.log("Profile check:", profile)

      if (!profile) {
        // Trigger failed, create manually
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({ id: authData.user.id, role })

        if (profileError) {
          console.error("Profile creation failed:", profileError)
          setError(`Profile creation failed: ${profileError.message}`)
          setLoading(false)
          return
        }
      }

      router.push("/onboarding")
    } catch (err: unknown) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f1e7]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#f6f1e7]/90 border-b border-[#e5ddd0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-[#2a7d5f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">H</div>
            <span className="font-semibold text-[#1a1a1a] text-base">HelpHub AI</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Home</Link>
            <Link href="/explore" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Explore</Link>
            <Link href="/leaderboard" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Leaderboard</Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Panel - Dark green info */}
          <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden min-h-[400px]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">
              Join the Community
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold leading-[1.1] mb-6">
              Build your support
              <br />
              identity.
            </h1>
            <p className="text-[#a3c9b5] text-sm leading-relaxed mb-8 max-w-md">
              Create your HelpHub account and define your role in the community. Whether you need help, want to give help, or both — there&apos;s a place for you.
            </p>
            <ul className="space-y-3 text-[#a3c9b5] text-sm">
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">•</span>
                Choose your role: seeker, helper, or both
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">•</span>
                Set up your profile in the onboarding flow
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">•</span>
                Start connecting with the community instantly
              </li>
            </ul>
          </div>

          {/* Right Panel - Sign up form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-[#e5ddd0] flex flex-col justify-center">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">
              Create Account
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight mb-8">
              Set up your
              <br />
              community profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-sm text-[#c74a2c] bg-[#c74a2c]/10 px-4 py-2 rounded-xl">{error}</p>
              )}

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Password</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Repeat password</label>
                  <Input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="••••••••" className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" required />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">I want to...</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["seeker", "helper", "both"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`px-3 py-3 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                        role === r
                          ? "bg-[#2a7d5f] text-white border-[#2a7d5f]"
                          : "bg-white/60 text-[#555] border-[#d5cec0] hover:bg-[#ece5d8]"
                      }`}
                    >
                      {r === "seeker" ? "Get Help" : r === "helper" ? "Give Help" : "Both"}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full h-12 text-sm font-semibold shadow-sm cursor-pointer mt-2">
                {loading ? "Creating account..." : "Create account"}
              </Button>

              <p className="text-center text-sm text-[#777]">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#2a7d5f] font-medium hover:underline">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
