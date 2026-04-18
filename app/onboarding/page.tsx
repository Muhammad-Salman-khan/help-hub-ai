"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, Briefcase, Heart, Lightbulb } from "lucide-react"
import { createClient } from "@/lib/client"

const COMMON_SKILLS = [
  "JavaScript", "Python", "React", "Next.js", "Node.js",
  "Design", "Marketing", "Writing", "Data Science",
  "Math", "Physics", "Chemistry", "Biology",
  "English", "History", "Geography"
]

const COMMON_INTERESTS = [
  "Web Development", "Mobile Apps", "AI/ML", "Blockchain",
  "Teaching", "Mentoring", "Research", "Content Creation",
  "Problem Solving", "Career Growth", "Academic Support"
]

export default function OnboardingPage() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
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
    setIsLoading(true)

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

  // AI Suggestions based on selections
  const aiSuggestions = {
    canHelpWith: selectedSkills.slice(0, 3),
    mightNeedHelp: COMMON_SKILLS.filter(s => !selectedSkills.includes(s)).slice(0, 3),
  }

  return (
    <div className="min-h-screen bg-muted/50 py-10 px-4">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us about yourself so we can match you with the right community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us a bit about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Skills I can help with
                </Label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom skill..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
                  />
                  <Button type="button" variant="outline" onClick={addCustomSkill}>Add</Button>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Interests / Areas I need help with
                </Label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_INTERESTS.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* AI Suggestions */}
              {(selectedSkills.length > 0 || selectedInterests.length > 0) && (
                <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">AI Suggestions</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {selectedSkills.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 mt-0.5 text-amber-500" />
                        <div>
                          <span className="font-medium">You can help with:{" "}</span>
                          {aiSuggestions.canHelpWith.join(", ")}
                        </div>
                      </div>
                    )}
                    {selectedInterests.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Heart className="h-4 w-4 mt-0.5 text-rose-500" />
                        <div>
                          <span className="font-medium">You might need help with:{" "}</span>
                          {aiSuggestions.mightNeedHelp.join(", ")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Complete Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
