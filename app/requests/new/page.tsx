"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/client"
import type { RequestUrgency } from "@/lib/database.types"

// Simple AI-like keyword detection for category
function detectCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  if (text.match(/react|javascript|html|css|node|python|code|bug|api|frontend|backend|web|dev/))
    return "Web Development"
  if (text.match(/figma|design|ui|ux|poster|logo|color|typography|layout/))
    return "Design"
  if (text.match(/interview|career|resume|job|internship|mentor|salary/))
    return "Career"
  if (text.match(/math|physics|chemistry|biology|exam|study|homework|academic/))
    return "Academic"
  return "Community"
}

// Simple AI-like urgency detection
function detectUrgency(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  if (text.match(/urgent|asap|deadline|tomorrow|tonight|emergency|help now|critical/))
    return "high"
  if (text.match(/soon|this week|before|demo day|next|need/))
    return "medium"
  return "low"
}

// Simple AI-like tag extraction
function suggestTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase()
  const tagMap: Record<string, string> = {
    react: "React", javascript: "JavaScript", typescript: "TypeScript",
    python: "Python", html: "HTML", css: "CSS", node: "Node.js",
    figma: "Figma", design: "Design", portfolio: "Portfolio",
    responsive: "Responsive", api: "API", git: "Git/GitHub",
    interview: "Interview Prep", career: "Career", debug: "Debugging",
    review: "Review", mentor: "Mentoring", frontend: "Frontend",
    backend: "Backend",
  }
  const found: string[] = []
  for (const [keyword, tag] of Object.entries(tagMap)) {
    if (text.includes(keyword) && !found.includes(tag)) found.push(tag)
  }
  return found.length > 0 ? found.slice(0, 5) : []
}

// Simple description rewrite suggestion
function suggestRewrite(description: string): string {
  if (!description || description.length < 20)
    return "Start describing the challenge to generate a stronger version."
  if (description.length < 60)
    return "Add more context: mention your progress, deadline, and what kind of help is most useful."
  return "Good detail! Consider mentioning your tech stack and what you've already tried."
}

export default function CreateRequestPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [category, setCategory] = useState("Web Development")
  const [urgency, setUrgency] = useState<RequestUrgency>("medium")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // AI suggestions (derived from input)
  const [aiCategory, setAiCategory] = useState("Community")
  const [aiUrgency, setAiUrgency] = useState("Low")
  const [aiTags, setAiTags] = useState<string[]>([])
  const [aiRewrite, setAiRewrite] = useState("Start describing the challenge to generate a stronger version.")

  // Update AI suggestions whenever inputs change
  useEffect(() => {
    setAiCategory(detectCategory(title, description))
    setAiUrgency(detectUrgency(title, description).charAt(0).toUpperCase() + detectUrgency(title, description).slice(1))
    setAiTags(suggestTags(title, description))
    setAiRewrite(suggestRewrite(description))
  }, [title, description])

  const applyAiSuggestions = () => {
    setCategory(aiCategory)
    setUrgency(detectUrgency(title, description) as RequestUrgency)
    if (aiTags.length > 0) {
      setTags(aiTags.join(", "))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    // Validate required fields
    if (!title.trim()) {
      setError("Title is required.")
      setLoading(false)
      return
    }
    if (!description.trim()) {
      setError("Description is required. Explain what you need help with.")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in to create a request. Redirecting...")
        setTimeout(() => router.push("/auth/login"), 1500)
        return
      }

      // Ensure profile exists before inserting request
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single()

      if (!profile) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({ id: user.id, role: "both" })

        if (profileError) {
          console.error("Profile creation error:", JSON.stringify(profileError, null, 2))
          setError(`Profile creation failed: ${profileError.message || profileError.code || JSON.stringify(profileError)}`)
          setLoading(false)
          return
        }
      }

      const { error: insertError } = await supabase.from("requests").insert({
        title: title.trim(),
        description: description.trim(),
        category,
        urgency,
        tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        status: "open",
        author_id: user.id,
      })

      if (insertError) {
        console.error("Supabase insert error:", insertError)
        setError(`Failed to create request: ${insertError.message}`)
      } else {
        setSuccess(true)
        setTimeout(() => router.push("/explore"), 1200)
      }
    } catch (err) {
      console.error("Unexpected error:", err)
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
            <div className="h-8 w-8 bg-[#2a7d5f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">H</div>
            <span className="font-semibold text-[#1a1a1a] text-base">HelpHub AI</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/dashboard" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Dashboard</Link>
            <Link href="/explore" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Explore</Link>
            <Link href="/requests/new" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Create Request</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">Create Request</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl italic">
            Turn a rough problem into a clear help request.
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error / Success messages */}
              {error && (
                <div className="bg-[#c74a2c]/10 border border-[#c74a2c]/20 text-[#c74a2c] text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-[#2a7d5f]/10 border border-[#2a7d5f]/20 text-[#2a7d5f] text-sm px-4 py-3 rounded-xl">
                  ✅ Request published successfully! Redirecting to Explore...
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Title <span className="text-[#c74a2c]">*</span></label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Need review on my JavaScript quiz app before submission"
                  className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Description <span className="text-[#c74a2c]">*</span></label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                  className="rounded-xl border-[#d5cec0] bg-white/80 min-h-[140px] text-sm resize-y"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Tags</label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="JavaScript, Debugging, Review"
                    className="rounded-xl border-[#d5cec0] bg-white/80 h-11 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#d5cec0] bg-white/80 h-11 px-4 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2a7d5f]/20"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Design">Design</option>
                    <option value="Career">Career</option>
                    <option value="Academic">Academic</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as RequestUrgency)}
                  className="w-full sm:w-1/2 rounded-xl border border-[#d5cec0] bg-white/80 h-11 px-4 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2a7d5f]/20"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={applyAiSuggestions}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold border-[#c9c1b2] text-[#1a1a1a] bg-transparent hover:bg-[#ece5d8] cursor-pointer"
                >
                  Apply AI suggestions
                </Button>
                <Button
                  type="submit"
                  disabled={loading || success}
                  className="bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm cursor-pointer"
                >
                  {loading ? "Publishing..." : success ? "Published ✓" : "Publish request"}
                </Button>
              </div>
            </form>
          </div>

          {/* AI Assistant - now reactive to input */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0] h-fit lg:sticky lg:top-24">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#c74a2c] mb-3">AI Assistant</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">
              Smart request
              <br />
              guidance
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#e5ddd0]">
                <p className="text-sm text-[#555]">Suggested category</p>
                <p className="font-bold text-sm text-[#1a1a1a]">{aiCategory}</p>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#e5ddd0]">
                <p className="text-sm text-[#555]">Detected urgency</p>
                <p className="font-bold text-sm text-[#1a1a1a]">{aiUrgency}</p>
              </div>
              <div className="flex items-start justify-between py-3 border-b border-[#e5ddd0] gap-4">
                <p className="text-sm text-[#555] shrink-0">Suggested tags</p>
                {aiTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1 justify-end">
                    {aiTags.map((tag) => (
                      <span key={tag} className="text-xs bg-[#e5f5ee] text-[#2a7d5f] rounded-full px-2 py-0.5 font-medium">{tag}</span>
                    ))}
                  </div>
                ) : (
                  <p className="font-bold text-sm text-[#1a1a1a] text-right">Add more detail for smarter tags</p>
                )}
              </div>
              <div className="flex items-start justify-between py-3 gap-4">
                <p className="text-sm text-[#555] shrink-0">Rewrite suggestion</p>
                <p className="font-bold text-sm text-[#1a1a1a] text-right">{aiRewrite}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
