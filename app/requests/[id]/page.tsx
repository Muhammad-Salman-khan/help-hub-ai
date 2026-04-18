"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function RequestDetailPage() {
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
            <Link href="/messages" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Messages</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">Request Detail</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-[#2a7d5f] text-white text-xs rounded-full px-3 py-0.5 font-medium border-0">Career</Badge>
            <Badge className="bg-[#5e8a7c] text-white text-xs rounded-full px-3 py-0.5 font-medium border-0">Low</Badge>
            <Badge className="bg-[#2a7d5f] text-white text-xs rounded-full px-3 py-0.5 font-medium border-0">Solved</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl">
            Need mock interview support for internship applications
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* AI Summary */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">AI Summary</p>
              <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-4">
                Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs rounded-full px-3 py-0.5 border-[#2a7d5f] text-[#2a7d5f] font-medium">Interview Prep</Badge>
                <Badge variant="outline" className="text-xs rounded-full px-3 py-0.5 border-[#2a7d5f] text-[#2a7d5f] font-medium">Career</Badge>
                <Badge variant="outline" className="text-xs rounded-full px-3 py-0.5 border-[#2a7d5f] text-[#2a7d5f] font-medium">Frontend</Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#c74a2c] mb-4">Actions</p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer">
                  I can help
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-2.5 text-sm font-semibold border-[#c9c1b2] text-[#1a1a1a] hover:bg-[#ece5d8] cursor-pointer">
                  Mark as solved
                </Button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Requester */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Requester</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#d4843e] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">SN</div>
                <div>
                  <p className="font-bold text-sm text-[#1a1a1a]">Sara Noor</p>
                  <p className="text-xs text-[#777]">Remote • Python, Data Analysis</p>
                </div>
              </div>
            </div>

            {/* Helpers */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Helpers</p>
              <h3 className="font-bold text-base sm:text-lg text-[#1a1a1a] mb-4">People ready to support</h3>

              <div className="space-y-3">
                <div className="bg-[#f6f1e7]/60 rounded-xl p-4 border border-[#e5ddd0] flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#2a7d5f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">AK</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1a1a1a]">Ayesha Khan</p>
                    <p className="text-xs text-[#777]">Figma, UI/UX, HTML/CSS</p>
                  </div>
                  <Badge variant="outline" className="text-xs rounded-full px-3 py-1 border-[#2a7d5f] text-[#2a7d5f] font-medium shrink-0">
                    Trust 100%
                  </Badge>
                </div>

                <div className="bg-[#f6f1e7]/60 rounded-xl p-4 border border-[#e5ddd0] flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#555] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">HA</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1a1a1a]">Hassan Ali</p>
                    <p className="text-xs text-[#777]">JavaScript, React, Git/GitHub</p>
                  </div>
                  <Badge variant="outline" className="text-xs rounded-full px-3 py-1 border-[#d4843e] text-[#d4843e] font-medium shrink-0">
                    Trust 88%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
