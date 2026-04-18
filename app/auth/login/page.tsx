"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("community@helphub.ai")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
      } else {
        router.push("/dashboard")
      }
    } catch {
      setError("Something went wrong. Please try again.")
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
            <div className="h-8 w-8 bg-[#2a7d5f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              H
            </div>
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
              Community Access
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold leading-[1.1] mb-6">
              Enter the support
              <br />
              network.
            </h1>
            <p className="text-[#a3c9b5] text-sm leading-relaxed mb-8 max-w-md">
              Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
            </p>
            <ul className="space-y-3 text-[#a3c9b5] text-sm">
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">•</span>
                Role-based entry for Need Help, Can Help, or Both
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">•</span>
                Direct path into dashboard, requests, AI Center, and community feed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white mt-0.5">•</span>
                Persistent demo session powered by LocalStorage
              </li>
            </ul>
          </div>

          {/* Right Panel - Login form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-[#e5ddd0] flex flex-col justify-center">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">
              Login / Signup
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight mb-8">
              Authenticate your
              <br />
              community profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <p className="text-sm text-[#c74a2c] bg-[#c74a2c]/10 px-4 py-2 rounded-xl">{error}</p>
              )}

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="community@helphub.ai"
                  className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full h-12 text-sm font-semibold shadow-sm cursor-pointer"
              >
                {loading ? "Signing in..." : "Continue to dashboard"}
              </Button>

              <p className="text-center text-sm text-[#777]">
                Don&apos;t have an account?{" "}
                <Link href="/auth/sign-up" className="text-[#2a7d5f] font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
