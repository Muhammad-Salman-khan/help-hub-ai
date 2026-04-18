"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Sparkles, ArrowLeft, Wand2, Tag, Loader2 } from "lucide-react"
import { createClient } from "@/lib/client"

const CATEGORIES = [
  "Programming",
  "Design",
  "Marketing",
  "Academic",
  "Career",
  "Writing",
  "Other",
]

const KEYWORDS_TO_CATEGORY: Record<string, string> = {
  code: "Programming",
  programming: "Programming",
  javascript: "Programming",
  python: "Programming",
  react: "Programming",
  bug: "Programming",
  error: "Programming",
  design: "Design",
  ui: "Design",
  ux: "Design",
  figma: "Design",
  marketing: "Marketing",
  seo: "Marketing",
  social: "Marketing",
  math: "Academic",
  physics: "Academic",
  science: "Academic",
  homework: "Academic",
  career: "Career",
  job: "Career",
  interview: "Career",
  resume: "Career",
  write: "Writing",
  essay: "Writing",
  content: "Writing",
}

const SUGGESTED_TAGS: Record<string, string[]> = {
  Programming: ["JavaScript", "Python", "React", "Node.js", "Debugging", "Best Practices"],
  Design: ["UI/UX", "Figma", "CSS", "Responsive", "Accessibility"],
  Marketing: ["SEO", "Social Media", "Content Strategy", "Analytics"],
  Academic: ["Math", "Science", "Research", "Study Tips"],
  Career: ["Interview Prep", "Resume Review", "Networking", "Career Change"],
  Writing: ["Grammar", "Creative Writing", "Technical Writing", "Editing"],
  Other: ["General", "Advice", "Discussion"],
}

export default function CreateRequestPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [urgency, setUrgency] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<{
    category?: string
    urgency?: string
    tags?: string[]
    improved?: string
  }>({})
  const router = useRouter()

  // AI Auto-categorization
  const analyzeContent = async () => {
    if (!title && !description) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    const text = (title + " " + description).toLowerCase()
    let detectedCategory = "Other"
    let detectedUrgency = "medium"

    // Detect category from keywords
    for (const [keyword, cat] of Object.entries(KEYWORDS_TO_CATEGORY)) {
      if (text.includes(keyword)) {
        detectedCategory = cat
        break
      }
    }

    // Detect urgency
    if (text.includes("urgent") || text.includes("asap") || text.includes("deadline")) {
      detectedUrgency = "high"
    } else if (text.includes("whenever") || text.includes("no rush")) {
      detectedUrgency = "low"
    }

    // Suggest tags
    const suggestedTags = SUGGESTED_TAGS[detectedCategory] || []

    setAiSuggestions({
      category: detectedCategory,
      urgency: detectedUrgency,
      tags: suggestedTags.slice(0, 3),
    })

    // Auto-fill if not already set
    if (!category) setCategory(detectedCategory)
    if (!urgency) setUrgency(detectedUrgency)

    setIsAnalyzing(false)
  }

  // AI Rewrite suggestion
  const suggestRewrite = async () => {
    if (!description) return

    setIsAnalyzing(true)

    // Simple rewrite suggestion
    const improved = description
      .split(".")
      .filter((s) => s.trim())
      .map((s) => s.trim().charAt(0).toUpperCase() + s.trim().slice(1))
      .join(". ")

    setAiSuggestions((prev) => ({ ...prev, improved }))
    setIsAnalyzing(false)
  }

  const applySuggestion = (type: string, value: string) => {
    switch (type) {
      case "category":
        setCategory(value)
        break
      case "urgency":
        setUrgency(value)
        break
      case "improved":
        setDescription(value)
        break
    }
  }

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { error } = await supabase.from("requests").insert({
        title,
        description,
        category,
        urgency,
        tags,
        status: "open",
        author_id: user.id,
      })

      if (!error) {
        router.push("/dashboard")
      }
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Help Request</CardTitle>
            <CardDescription>
              Describe what you need help with. Our AI will help categorize it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Need help with React hooks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={suggestRewrite}
                    disabled={!description || isAnalyzing}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    AI Rewrite
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe your problem in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />

                {aiSuggestions.improved && aiSuggestions.improved !== description && (
                  <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">AI Suggested Rewrite:</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{aiSuggestions.improved}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => applySuggestion("improved", aiSuggestions.improved!)}
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Category & Urgency */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="category">Category</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={analyzeContent}
                      disabled={(!title && !description) || isAnalyzing}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Auto-detect
                    </Button>
                  </div>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select value={urgency} onValueChange={setUrgency} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Whenever</SelectItem>
                      <SelectItem value="medium">Medium - Soon</SelectItem>
                      <SelectItem value="high">High - Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* AI Suggestions Panel */}
              {(aiSuggestions.category || aiSuggestions.urgency || aiSuggestions.tags) && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">AI Suggestions</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {aiSuggestions.category && aiSuggestions.category !== category && (
                      <div className="flex items-center justify-between">
                        <span>Category: <Badge variant="secondary">{aiSuggestions.category}</Badge></span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => applySuggestion("category", aiSuggestions.category!)}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                    {aiSuggestions.urgency && aiSuggestions.urgency !== urgency && (
                      <div className="flex items-center justify-between">
                        <span>Urgency: <Badge>{aiSuggestions.urgency}</Badge></span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => applySuggestion("urgency", aiSuggestions.urgency!)}
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Tags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(aiSuggestions.tags || SUGGESTED_TAGS[category] || []).map((tag) => (
                    <Badge
                      key={tag}
                      variant={tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add custom tag (press Enter)"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const value = (e.target as HTMLInputElement).value.trim()
                      if (value && !tags.includes(value)) {
                        setTags([...tags, value])
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }
                  }}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Request"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
