"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { createClient } from "@/lib/client"
import type { UserRole } from "@/lib/database.types"

interface DashboardRequest {
  id: string
  title: string
  description: string
  category: string
  urgency: "low" | "medium" | "high"
  status: "open" | "in_progress" | "solved"
  created_at: string
  author: { name: string | null }
}

export default function DashboardPage() {
  const [requests, setRequests] = useState<DashboardRequest[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    solved: 0,
    helping: 0,
  })
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoading(false)
      return
    }

    // Fetch user profile with role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profile) {
      setRole(profile.role)
    }

    // Fetch user's requests (for seekers and both)
    const { data: userRequests } = await supabase
      .from("requests")
      .select("*, author:profiles(name)")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false })

    if (userRequests) {
      setRequests(userRequests.slice(0, 5))

      // Calculate stats from real data
      const total = userRequests.length
      const active = userRequests.filter(r => r.status === "open" || r.status === "in_progress").length
      const solved = userRequests.filter(r => r.status === "solved").length

      // Fetch helping count (requests user is helping with)
      const { count: helpingCount } = await supabase
        .from("request_helpers")
        .select("*", { count: "exact", head: true })
        .eq("helper_id", user.id)

      setStats({
        total,
        active,
        solved,
        helping: helpingCount || 0,
      })
    } else {
      setStats({ total: 0, active: 0, solved: 0, helping: 0 })
    }
    setLoading(false)
  }

  const canSeek = role === "seeker" || role === "both"
  const canHelp = role === "helper" || role === "both"

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
            <Link href="/dashboard" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Dashboard</Link>
            <Link href="/explore" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Explore</Link>
            {canSeek && (
              <Link href="/requests/new" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Create Request</Link>
            )}
            <Link href="/ai-center" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">AI Center</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6]">Dashboard</p>
            {role && (
              <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                role === 'seeker' ? 'bg-orange-400/20 text-orange-200' :
                role === 'helper' ? 'bg-blue-400/20 text-blue-200' :
                'bg-[#8cc5a6]/20 text-[#8cc5a6]'
              }`}>
                {role}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl italic">
            {role === 'helper' ? 'Help others grow. Track your impact.' :
             role === 'seeker' ? 'Get help when you need it.' :
             'Your community activity at a glance.'}
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            {canSeek && canHelp
              ? "Track your requests, contributions, and matches across the HelpHub platform."
              : canSeek
              ? "Post requests and track progress on challenges you're working through."
              : "Browse requests and track your contributions to the community."}
          </p>
        </div>
      </section>

      {/* Stats Cards - Role-based display */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className={`grid gap-4 ${canSeek && canHelp ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {canSeek && (
            <>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[#e5ddd0]">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#2a7d5f] mb-1">Total</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">{stats.total}</p>
                <p className="text-xs text-[#777]">Requests created</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[#e5ddd0]">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#d4843e] mb-1">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">{stats.active}</p>
                <p className="text-xs text-[#777]">Currently open</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[#e5ddd0]">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#2a7d5f] mb-1">Solved</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">{stats.solved}</p>
                <p className="text-xs text-[#777]">Problems resolved</p>
              </div>
            </>
          )}
          {canHelp && (
            <div className={`bg-white/60 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[#e5ddd0] ${!canSeek ? 'sm:col-span-1' : ''}`}>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#4a90a4] mb-1">Helping</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">{stats.helping}</p>
              <p className="text-xs text-[#777]">{canSeek ? 'Currently assisting' : 'People helped'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Requests + Quick Actions */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-6">
          {/* Recent Requests */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Activity</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">
              {canSeek ? 'Your requests' : 'Requests you\'re helping with'}
            </h2>

            {requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-[#777] mb-4">
                  {canSeek ? "No requests yet. Be the first to post!" : "You're not helping with any requests yet. Browse and offer help!"}
                </p>
                {canSeek ? (
                  <Link href="/requests/new">
                    <Button className="bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer">
                      Create Request
                    </Button>
                  </Link>
                ) : (
                  <Link href="/explore">
                    <Button className="bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer">
                      Browse Requests
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div key={req.id} className="bg-[#f6f1e7]/60 rounded-xl sm:rounded-2xl p-5 border border-[#e5ddd0] hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-sm text-[#1a1a1a]">{req.title}</h3>
                      <div className="flex gap-1.5 shrink-0">
                        <Badge className={`text-[11px] rounded-full px-2.5 py-0.5 font-medium border-0 ${
                          req.urgency === "high" ? "bg-[#c74a2c] text-white" : req.urgency === "medium" ? "bg-[#5e8a7c] text-white" : "bg-[#ece5d8] text-[#555]"
                        }`}>
                          {req.urgency}
                        </Badge>
                        <Badge className="bg-[#ece5d8] text-[#555] text-[11px] rounded-full px-2.5 py-0.5 font-medium border-0">
                          {req.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-[#777] line-clamp-2 mb-3">{req.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-[#777]">by {req.author?.name || "Anonymous"}</p>
                      <Link href={`/requests/${req.id}`}>
                        <Button variant="outline" className="rounded-full px-3 py-1 text-[11px] font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] cursor-pointer">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#e5ddd0]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#c74a2c] mb-3">Quick Actions</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-5">Jump in</h3>
              <div className="space-y-3">
                {canSeek && (
                  <Link href="/requests/new" className="block">
                    <Button className="w-full bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full h-11 text-sm font-semibold cursor-pointer">
                      Create request
                    </Button>
                  </Link>
                )}
                <Link href="/explore" className="block">
                  <Button variant="outline" className="w-full rounded-full h-11 text-sm font-semibold border-[#c9c1b2] text-[#1a1a1a] hover:bg-[#ece5d8] cursor-pointer">
                    Browse requests
                  </Button>
                </Link>
                <Link href="/messages" className="block">
                  <Button variant="outline" className="w-full rounded-full h-11 text-sm font-semibold border-[#c9c1b2] text-[#1a1a1a] hover:bg-[#ece5d8] cursor-pointer">
                    Messages
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#e5ddd0]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Navigation</p>
              <div className="space-y-2">
                <Link href="/ai-center" className="flex items-center justify-between py-2 text-sm text-[#555] hover:text-[#1a1a1a] transition-colors">
                  <span>AI Center</span>
                  <span className="text-xs">→</span>
                </Link>
                <Link href="/leaderboard" className="flex items-center justify-between py-2 text-sm text-[#555] hover:text-[#1a1a1a] transition-colors">
                  <span>Leaderboard</span>
                  <span className="text-xs">→</span>
                </Link>
                <Link href="/profile" className="flex items-center justify-between py-2 text-sm text-[#555] hover:text-[#1a1a1a] transition-colors">
                  <span>Profile</span>
                  <span className="text-xs">→</span>
                </Link>
                <Link href="/notifications" className="flex items-center justify-between py-2 text-sm text-[#555] hover:text-[#1a1a1a] transition-colors">
                  <span>Notifications</span>
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
