"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createClient } from "@/lib/client"

const COMMON_SKILLS = [
  "JavaScript", "Python", "React", "Next.js", "Node.js",
  "Design", "Figma", "UI/UX", "HTML/CSS", "Marketing",
  "Writing", "Data Science", "Career Guidance",
]

const COMMON_INTERESTS = [
  "Web Development", "Mobile Apps", "AI/ML", "Hackathons",
  "Teaching", "Mentoring", "Community Building",
  "Problem Solving", "Career Growth", "Academic Support",
]

export default function OnboardingPage() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill])
      setCustomSkill("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        name,
        location,
        bio,
        skills: selectedSkills,
        interests: selectedInterests,
        role: user.user_metadata?.role || "both",
        completed_onboarding: true,
      })
    }

    router.push("/dashboard")
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
            <Link href="/onboarding" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Onboarding</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">Onboarding</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl italic">
            Complete your profile to get matched.
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            Tell us about yourself so we can connect you with the right people in the community.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-6">
          {/* Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Profile Setup</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Tell us about you</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ayesha Khan" className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Location</label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Karachi" className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Bio</label>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." className="rounded-xl border-[#d5cec0] bg-white/80 min-h-[80px] text-sm resize-y" />
              </div>

              {/* Skills */}
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-3 block">Skills I can help with</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {COMMON_SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-[#2a7d5f] text-white border-[#2a7d5f]"
                          : "bg-transparent text-[#555] border-[#c9c1b2] hover:bg-[#ece5d8]"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    placeholder="Add custom skill..."
                    className="rounded-xl border-[#d5cec0] bg-white/80 h-10 text-sm flex-1"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
                  />
                  <Button type="button" variant="outline" onClick={addCustomSkill} className="rounded-xl border-[#c9c1b2] text-[#555] hover:bg-[#ece5d8] h-10 px-4 text-sm cursor-pointer">
                    Add
                  </Button>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-3 block">Areas I need help with</label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_INTERESTS.map((interest) => (
                    <Badge
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                        selectedInterests.includes(interest)
                          ? "bg-[#2a7d5f] text-white border-[#2a7d5f]"
                          : "bg-transparent text-[#555] border-[#c9c1b2] hover:bg-[#ece5d8]"
                      }`}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full h-12 text-sm font-semibold shadow-sm cursor-pointer">
                {loading ? "Saving..." : "Complete profile"}
              </Button>
            </form>
          </div>

          {/* AI Suggestions Sidebar */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0] h-fit lg:sticky lg:top-24">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#c74a2c] mb-3">AI Suggestions</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">
              Smart profile
              <br />
              guidance
            </h3>

            <div className="space-y-5">
              {selectedSkills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a] mb-2">You can help with</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.slice(0, 5).map((skill) => (
                      <Badge key={skill} variant="outline" className="rounded-full px-3 py-1 text-xs border-[#2a7d5f] text-[#2a7d5f] font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedInterests.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a] mb-2">Areas you&apos;re interested in</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterests.slice(0, 5).map((interest) => (
                      <Badge key={interest} variant="outline" className="rounded-full px-3 py-1 text-xs border-[#d4843e] text-[#d4843e] font-medium">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedSkills.length === 0 && selectedInterests.length === 0 && (
                <p className="text-sm text-[#777] leading-relaxed">
                  Select skills and interests above to see AI-powered profile suggestions and potential matches.
                </p>
              )}

              <div className="pt-4 border-t border-[#e5ddd0]">
                <p className="text-sm text-[#777] leading-relaxed">
                  Based on your selections, we&apos;ll match you with community members who complement your profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
