"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Settings,
  Trophy,
  CheckCircle,
  Users,
  MapPin,
  Briefcase,
  Heart,
} from "lucide-react"
import { createClient } from "@/lib/client"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({
    helped: 12,
    received: 5,
    rating: 4.8,
    trustScore: 85,
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      setProfile(data)
    }
  }

  if (!profile) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-xl">Helplytics</Link>
          <nav className="flex items-center gap-4">
            <Link href="/explore">Explore</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="text-2xl">
                  {profile.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-bold">{profile.name}</h2>
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="h-3 w-3" />
                {profile.location || "Remote"}
              </div>

              <p className="text-sm text-muted-foreground mt-3">
                {profile.bio || "No bio yet"}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Badge variant="secondary">{profile.role || "Both"}</Badge>
                <Badge variant="outline">Trust Score: {stats.trustScore}%</Badge>
              </div>

              <Button variant="outline" className="w-full mt-6" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{stats.helped}</div>
                  <div className="text-xs text-muted-foreground">Helped</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{stats.received}</div>
                  <div className="text-xs text-muted-foreground">Received</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{stats.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="skills">
              <TabsList>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" /> Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(profile.skills || []).map((skill: string) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" /> Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(profile.interests || []).map((interest: string) => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contributions">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Contributions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Helped with React Hooks", date: "2 days ago", type: "help" },
                        { title: "Created TypeScript request", date: "1 week ago", type: "request" },
                        { title: "Solved CSS layout issue", date: "2 weeks ago", type: "help" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                          <Badge>{item.type === "help" ? "Helped" : "Request"}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="badges">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" /> Earned Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Helper", desc: "Helped 10+ people", icon: Users },
                        { name: "Problem Solver", desc: "5 solved requests", icon: CheckCircle },
                      ].map((badge) => (
                        <div key={badge.name} className="p-4 border rounded-lg text-center">
                          <badge.icon className="mx-auto h-8 w-8 text-primary mb-2" />
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">{badge.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
