"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ProfilePage() {
  const [name, setName] = useState("Ayesha Khan")
  const [location, setLocation] = useState("Karachi")
  const [skills, setSkills] = useState("Figma, UI/UX, HTML/CSS, Career Guidance")
  const [interests, setInterests] = useState("Hackathons, UI/UX, Community Building")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Save to localStorage or Supabase
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
            <Link href="/dashboard" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Dashboard</Link>
            <Link href="/onboarding" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Onboarding</Link>
            <Link href="/profile" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Profile</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-3">Profile</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] mb-2">Ayesha Khan</h1>
          <p className="text-[#a3c9b5] text-sm">Both • Karachi</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Public Profile */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Public Profile</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-8">Skills and reputation</h2>

            <div className="space-y-5">
              {/* Trust Score */}
              <div className="flex items-center justify-between py-3 border-b border-[#e5ddd0]">
                <p className="text-sm text-[#555]">Trust score</p>
                <p className="font-bold text-sm text-[#1a1a1a]">100%</p>
              </div>
              {/* Contributions */}
              <div className="flex items-center justify-between py-3 border-b border-[#e5ddd0]">
                <p className="text-sm text-[#555]">Contributions</p>
                <p className="font-bold text-sm text-[#1a1a1a]">35</p>
              </div>

              {/* Skills */}
              <div>
                <p className="font-bold text-sm text-[#1a1a1a] mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {["Figma", "UI/UX", "HTML/CSS", "Career Guidance"].map((skill) => (
                    <Badge key={skill} variant="outline" className="rounded-full px-3 py-1 text-xs border-[#2a7d5f] text-[#2a7d5f] font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div>
                <p className="font-bold text-sm text-[#1a1a1a] mb-3">Badges</p>
                <div className="flex flex-wrap gap-2">
                  {["Design Ally", "Fast Responder", "Top Mentor"].map((badge) => (
                    <Badge key={badge} variant="outline" className="rounded-full px-3 py-1 text-xs border-[#2a7d5f] text-[#2a7d5f] font-medium">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#c74a2c] mb-3">Edit Profile</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-8">
              Update your
              <br />
              identity
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Location</label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Skills</label>
                <Input value={skills} onChange={(e) => setSkills(e.target.value)} className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Interests</label>
                <Input value={interests} onChange={(e) => setInterests(e.target.value)} className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" />
              </div>
              <Button type="submit" className="w-full bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full h-12 text-sm font-semibold shadow-sm cursor-pointer">
                Save profile
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
