"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const RECOMMENDATIONS = [
  {
    title: "Need help",
    summary: "AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.",
    tags: [{ label: "Web Development", color: "bg-[#2a7d5f]" }, { label: "High", color: "bg-[#c74a2c]" }],
  },
  {
    title: "Need help making my portfolio responsive before demo day",
    summary: "Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.",
    tags: [{ label: "Web Development", color: "bg-[#2a7d5f]" }, { label: "High", color: "bg-[#c74a2c]" }],
  },
  {
    title: "Looking for Figma feedback on a volunteer event poster",
    summary: "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.",
    tags: [{ label: "Design", color: "bg-[#2a7d5f]" }, { label: "Medium", color: "bg-[#5e8a7c]" }],
  },
  {
    title: "Need mock interview support for internship applications",
    summary: "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.",
    tags: [{ label: "Career", color: "bg-[#2a7d5f]" }, { label: "Low", color: "bg-[#5e8a7c]" }],
  },
]

export default function AICenterPage() {
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
            <Link href="/requests/new" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Create Request</Link>
            <Link href="/ai-center" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">AI Center</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white relative overflow-hidden">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">AI Center</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl">
            See what the platform intelligence is noticing.
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#2a7d5f] mb-2">Trend Pulse</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">Web Development</p>
            <p className="text-xs sm:text-sm text-[#777] leading-relaxed">Most common support area based on active community requests.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#c74a2c] mb-2">Urgency Watch</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">2</p>
            <p className="text-xs sm:text-sm text-[#777] leading-relaxed">Requests currently flagged high priority by the urgency detector.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#2a7d5f] mb-2">Mentor Pool</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">2</p>
            <p className="text-xs sm:text-sm text-[#777] leading-relaxed">Trusted helpers with strong response history and contribution signals.</p>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#e5ddd0]">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">AI Recommendations</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-8">Requests needing attention</h2>

          <div className="space-y-4">
            {RECOMMENDATIONS.map((rec, i) => (
              <div key={i} className="bg-[#f6f1e7]/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#e5ddd0] hover:shadow-sm transition-shadow">
                <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-2">{rec.title}</h3>
                <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-3">{rec.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {rec.tags.map((tag, j) => (
                    <Badge key={j} className={`${tag.color} text-white text-[11px] sm:text-xs rounded-full px-3 py-0.5 font-medium border-0`}>
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
