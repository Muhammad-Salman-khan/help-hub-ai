"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f1e7]">
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#f6f1e7]/90 border-b border-[#e5ddd0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-[#2a7d5f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              H
            </div>
            <span className="font-semibold text-[#1a1a1a] text-base">HelpHub AI</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/leaderboard"
              className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/ai-center"
              className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors"
            >
              AI Center
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d5cec0] text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#2a7d5f] animate-pulse" />
              Live community signals
            </button>
            <Link href="/auth/login" className="hidden sm:block">
              <Button className="bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full px-5 py-2 text-sm font-semibold shadow-sm cursor-pointer">
                Join the platform
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[#ece5d8] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#1a1a1a]" />
              ) : (
                <Menu className="h-5 w-5 text-[#1a1a1a]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e5ddd0] bg-[#f6f1e7]/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] text-white text-sm font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="px-4 py-2.5 rounded-xl text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/leaderboard"
                className="px-4 py-2.5 rounded-xl text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/ai-center"
                className="px-4 py-2.5 rounded-xl text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Center
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-[#e5ddd0]">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#d5cec0] text-[#555] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#2a7d5f] animate-pulse" />
                  Live community signals
                </button>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-xl px-5 py-2.5 text-sm font-semibold cursor-pointer">
                    Join the platform
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Hero Section ─── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-6 items-stretch">
          {/* Left Panel */}
          <div className="bg-[#ebe5d9] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-4 sm:mb-5">
                SMIT Grand Coding Night 2026
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.1] text-[#1a1a1a] mb-4 sm:mb-6">
                Find help faster.
                <br />
                Become help that
                <br />
                matters.
              </h1>

              <p className="text-[#666] text-sm sm:text-base leading-relaxed max-w-lg mb-6 sm:mb-8">
                HelpHub AI is a community-powered support network for students, mentors,
                creators, and builders. Ask for help, offer help, track impact, and let AI surface
                smarter matches across the platform.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-10">
                <Button className="bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full px-5 sm:px-6 py-2.5 text-sm font-semibold shadow-sm cursor-pointer">
                  Open product demo
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-5 sm:px-6 py-2.5 text-sm font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#dfd8ca] cursor-pointer"
                >
                  Post a request
                </Button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/50">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#2a7d5f] mb-1">
                  Members
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">384+</p>
                <p className="text-[11px] sm:text-xs text-[#777] leading-snug">
                  Students, mentors, and helpers in the loop.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/50">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#2a7d5f] mb-1">
                  Requests
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">72+</p>
                <p className="text-[11px] sm:text-xs text-[#777] leading-snug">
                  Support posts shared across learning journeys.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/50">
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#2a7d5f] mb-1">
                  Solved
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-1">69+</p>
                <p className="text-[11px] sm:text-xs text-[#777] leading-snug">
                  Problems resolved through fast community action.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Decorative gold circle */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#d4ad3e] to-[#b8943a] opacity-85" />

            <div className="relative z-10">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4 sm:mb-5">
                Live Product Feel
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.15] mb-4 sm:mb-5">
                More than a form.
                <br />
                More like an
                <br />
                ecosystem.
              </h2>
              <p className="text-[#a3c9b5] text-xs sm:text-sm leading-relaxed max-w-md mb-5 sm:mb-6">
                A polished multi-page experience inspired by product platforms, with AI summaries,
                trust scores, contribution signals, notifications, and leaderboard momentum built
                directly in HTML, CSS, JavaScript, and LocalStorage.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                <h3 className="font-semibold text-sm mb-1">AI request intelligence</h3>
                <p className="text-xs text-[#a3c9b5] leading-snug">
                  Auto-categorization, urgency detection, tags, rewrite suggestions, and trend
                  snapshots.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                <h3 className="font-semibold text-sm mb-1">Community trust graph</h3>
                <p className="text-xs text-[#a3c9b5] leading-snug">
                  Badges, helper rankings, trust score boosts, and visible contribution history.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                <h3 className="font-semibold text-sm mb-1.5">100%</h3>
                <p className="text-xs text-[#a3c9b5] leading-snug">
                  Top trust score currently active across the sample mentor network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Flow Section ─── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#1a1a1a] mb-2">
              Core Flow
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight italic">
              From struggling alone to solving together
            </h2>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-5 py-2 text-sm font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] w-fit shrink-0 cursor-pointer"
          >
            Try onboarding AI
          </Button>
        </div>

        {/* Flow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border border-[#e0d9cb] bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="p-5 sm:p-7">
              <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-2 sm:mb-3">Ask for help clearly</h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Create structured requests with category, urgency, AI suggestions, and tags that
                attract the right people.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#e0d9cb] bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="p-5 sm:p-7">
              <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-2 sm:mb-3">
                Discover the right people
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Use the explore feed, helper lists, notifications, and messaging to move quickly
                once a match happens.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-[#e0d9cb] bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
            <CardContent className="p-5 sm:p-7">
              <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-2 sm:mb-3">
                Track real contribution
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
                Trust scores, badges, solved requests, and rankings help the community recognize
                meaningful support.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── Featured Requests Section ─── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#c74a2c] mb-2">
              Featured Requests
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight">
              Community problems currently in motion
            </h2>
          </div>
          <Link href="/explore">
            <Button
              variant="outline"
              className="rounded-full px-5 py-2 text-sm font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] w-fit shrink-0 cursor-pointer"
            >
              View full feed
            </Button>
          </Link>
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <Card className="border border-[#e0d9cb] bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow flex flex-col">
            <CardContent className="p-5 sm:p-6 flex flex-col flex-1">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <Badge className="bg-[#ece5d8] text-[#555] hover:bg-[#e0d9cb] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  Web Development
                </Badge>
                <Badge className="bg-[#c74a2c] text-white hover:bg-[#b54228] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  High
                </Badge>
                <Badge className="bg-[#2a7d5f] text-white hover:bg-[#1f6a4e] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  Solved
                </Badge>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-1.5">Need help</h3>
              <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-4 sm:mb-5">helpen needed</p>

              <div className="flex items-end justify-between mt-auto pt-2">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-[#1a1a1a]">Ayesha Khan</p>
                  <p className="text-[11px] sm:text-xs text-[#777] mt-0.5">Karachi • 1 helper interested</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] cursor-pointer"
                >
                  Open details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border border-[#e0d9cb] bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow flex flex-col">
            <CardContent className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <Badge className="bg-[#ece5d8] text-[#555] hover:bg-[#e0d9cb] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  Web Development
                </Badge>
                <Badge className="bg-[#c74a2c] text-white hover:bg-[#b54228] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  High
                </Badge>
                <Badge className="bg-[#2a7d5f] text-white hover:bg-[#1f6a4e] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  Solved
                </Badge>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-1.5">
                Need help making my portfolio responsive before demo day
              </h3>
              <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-3 sm:mb-4">
                My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow
                evening.
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                <Badge
                  variant="outline"
                  className="text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 border-[#c9c1b2] text-[#555]"
                >
                  HTML/CSS
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 border-[#c9c1b2] text-[#555]"
                >
                  Responsive
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 border-[#c9c1b2] text-[#555]"
                >
                  Portfolio
                </Badge>
              </div>

              <div className="flex items-end justify-between mt-auto pt-2">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-[#1a1a1a]">Sara Noor</p>
                  <p className="text-[11px] sm:text-xs text-[#777] mt-0.5">Karachi • 1 helper interested</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] cursor-pointer"
                >
                  Open details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border border-[#e0d9cb] bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-md transition-shadow flex flex-col sm:col-span-2 lg:col-span-1">
            <CardContent className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <Badge className="bg-[#ece5d8] text-[#555] hover:bg-[#e0d9cb] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  Design
                </Badge>
                <Badge className="bg-[#5e8a7c] text-white hover:bg-[#527a6e] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  Medium
                </Badge>
                <Badge className="bg-[#4a90a4] text-white hover:bg-[#3e7e91] text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0">
                  Open
                </Badge>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-1.5">
                Looking for Figma feedback on a volunteer event poster
              </h3>
              <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-3 sm:mb-4">
                I have a draft poster for a campus community event and want sharper hierarchy,
                spacing, and CTA copy.
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                <Badge
                  variant="outline"
                  className="text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 border-[#c9c1b2] text-[#555]"
                >
                  Figma
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 border-[#c9c1b2] text-[#555]"
                >
                  Poster
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 border-[#c9c1b2] text-[#555]"
                >
                  Design Review
                </Badge>
              </div>

              <div className="flex items-end justify-between mt-auto pt-2">
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-[#1a1a1a]">Ayesha Khan</p>
                  <p className="text-[11px] sm:text-xs text-[#777] mt-0.5">Lahore • 1 helper interested</p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] cursor-pointer"
                >
                  Open details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#e5ddd0] py-5 sm:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] sm:text-xs text-[#777] text-center md:text-left">
            HelpHub AI is built as a premium-feel, multi-page community support product using
            HTML, CSS, JavaScript, and LocalStorage.
          </p>
        </div>
      </footer>
    </div>
  )
}
