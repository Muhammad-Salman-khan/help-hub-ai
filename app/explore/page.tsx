"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@/lib/client"

const SAMPLE_REQUESTS = [
  {
    id: "1",
    tags: [{ label: "Web Development", type: "cat" }, { label: "High", type: "urgency-high" }, { label: "Solved", type: "status-solved" }],
    title: "Need help",
    description: "helpn needed",
    skillTags: [],
    author: "Ayesha Khan",
    location: "Karachi",
    helpers: 1,
  },
  {
    id: "2",
    tags: [{ label: "Web Development", type: "cat" }, { label: "High", type: "urgency-high" }, { label: "Solved", type: "status-solved" }],
    title: "Need help making my portfolio responsive before demo day",
    description: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
    skillTags: ["HTML/CSS", "Responsive", "Portfolio"],
    author: "Sara Noor",
    location: "Karachi",
    helpers: 1,
  },
  {
    id: "3",
    tags: [{ label: "Design", type: "cat" }, { label: "Medium", type: "urgency-med" }, { label: "Open", type: "status-open" }],
    title: "Looking for Figma feedback on a volunteer event poster",
    description: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
    skillTags: ["Figma", "Poster", "Design Review"],
    author: "Ayesha Khan",
    location: "Lahore",
    helpers: 1,
  },
  {
    id: "4",
    tags: [{ label: "Career", type: "cat" }, { label: "Low", type: "urgency-low" }, { label: "Solved", type: "status-solved" }],
    title: "Need mock interview support for internship applications",
    description: "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.",
    skillTags: ["Interview Prep", "Career", "Frontend"],
    author: "Sara Noor",
    location: "Remote",
    helpers: 2,
  },
]

function getTagColor(type: string) {
  switch (type) {
    case "urgency-high": return "bg-[#c74a2c] text-white"
    case "urgency-med": return "bg-[#5e8a7c] text-white"
    case "urgency-low": return "bg-[#5e8a7c] text-white"
    case "status-solved": return "bg-[#2a7d5f] text-white"
    case "status-open": return "bg-[#4a90a4] text-white"
    default: return "bg-[#ece5d8] text-[#555]"
  }
}

export default function ExplorePage() {
  const [category, setCategory] = useState("")
  const [urgency, setUrgency] = useState("")
  const [skillsInput, setSkillsInput] = useState("React, Figma, Git/GitHub")
  const [locationInput, setLocationInput] = useState("Karachi, Lahore, Remote")

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
            <Link href="/explore" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Explore</Link>
            <Link href="/leaderboard" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Leaderboard</Link>
            <Link href="/notifications" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Notifications</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">Explore / Feed</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl italic">
            Browse help requests with filterable community context.
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            Filter by category, urgency, skills, and location to surface the best matches.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-6">
          {/* Filters Sidebar */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0] h-fit lg:sticky lg:top-24">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Filters</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-8">Refine the feed</h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#d5cec0] bg-white/80 h-11 px-4 text-sm text-[#555] focus:outline-none focus:ring-2 focus:ring-[#2a7d5f]/20"
                >
                  <option value="">All categories</option>
                  <option value="web">Web Development</option>
                  <option value="design">Design</option>
                  <option value="career">Career</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full rounded-xl border border-[#d5cec0] bg-white/80 h-11 px-4 text-sm text-[#555] focus:outline-none focus:ring-2 focus:ring-[#2a7d5f]/20"
                >
                  <option value="">All urgency levels</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">Skills</label>
                <Input
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">Location</label>
                <Input
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Request Cards */}
          <div className="space-y-4">
            {SAMPLE_REQUESTS.map((req) => (
              <div key={req.id} className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#e5ddd0] hover:shadow-sm transition-shadow">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                  {req.tags.map((tag, j) => (
                    <Badge key={j} className={`${getTagColor(tag.type)} text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 font-medium border-0`}>
                      {tag.label}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#1a1a1a] mb-1.5">{req.title}</h3>
                <p className="text-xs sm:text-sm text-[#777] leading-relaxed mb-3">{req.description}</p>

                {req.skillTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {req.skillTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3 py-0.5 border-[#c9c1b2] text-[#555]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-end justify-between mt-auto pt-1">
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-[#1a1a1a]">{req.author}</p>
                    <p className="text-[11px] sm:text-xs text-[#777] mt-0.5">{req.location} • {req.helpers} helper{req.helpers > 1 ? "s" : ""} interested</p>
                  </div>
                  <Button variant="outline" className="rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] cursor-pointer">
                    Open details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
