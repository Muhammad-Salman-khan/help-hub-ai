"use client"

import Link from "next/link"

const RANKINGS = [
  { rank: 1, name: "Ayesha Khan", initials: "AK", color: "bg-[#2a7d5f]", skills: "Figma, UI/UX, HTML/CSS", trust: "100%", contributions: 35 },
  { rank: 2, name: "Hassan Ali", initials: "HA", color: "bg-[#555]", skills: "JavaScript, React, Git/GitHub", trust: "88%", contributions: 24 },
  { rank: 3, name: "Sara Noor", initials: "SN", color: "bg-[#d4843e]", skills: "Python, Data Analysis", trust: "74%", contributions: 11 },
]

const BADGES_DATA = [
  { name: "Hassan Ali", badges: "Code Rescuer • Bug Hunter", progress: 65, colors: ["bg-[#d4843e]", "bg-[#2a7d5f]"] },
  { name: "Sara Noor", badges: "Community Voice", progress: 50, colors: ["bg-[#d4843e]", "bg-[#2a7d5f]"] },
]

export default function LeaderboardPage() {
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
            <Link href="/dashboard" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Dashboard</Link>
            <Link href="/explore" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Explore</Link>
            <Link href="/leaderboard" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Leaderboard</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">Leaderboard</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl italic">
            Recognize the people who keep the community moving.
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            Trust score, contribution count, and badges create visible momentum for reliable helpers.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rankings */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Top Helpers</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Rankings</h2>

            <div className="space-y-4">
              {RANKINGS.map((user) => (
                <div key={user.rank} className="bg-[#f6f1e7]/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#e5ddd0] flex items-center gap-4">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 ${user.color} rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0`}>
                    {user.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1a1a1a]">#{user.rank} {user.name}</p>
                    <p className="text-xs text-[#777] truncate">{user.skills}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-[#1a1a1a]">{user.trust}</p>
                    <p className="text-xs text-[#777]">{user.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badge System */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Badge System</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Trust and achievement</h2>

            <div className="space-y-5">
              {/* Top progress bar */}
              <div className="w-full h-3 rounded-full bg-[#e5ddd0] overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#d4843e] to-[#2a7d5f]" />
              </div>

              {BADGES_DATA.map((user, i) => (
                <div key={i} className="bg-[#f6f1e7]/60 rounded-xl sm:rounded-2xl p-5 border border-[#e5ddd0]">
                  <p className="font-bold text-sm text-[#1a1a1a] mb-1">{user.name}</p>
                  <p className="text-xs text-[#777] mb-3">{user.badges}</p>
                  <div className="w-full h-2.5 rounded-full bg-[#e5ddd0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#d4843e] to-[#2a7d5f]"
                      style={{ width: `${user.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
