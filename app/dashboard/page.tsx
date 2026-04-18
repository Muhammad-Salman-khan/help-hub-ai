"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Plus,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from "lucide-react"
import { createClient } from "@/lib/client"

interface Request {
  id: string
  title: string
  description: string
  category: string
  urgency: "low" | "medium" | "high"
  status: "open" | "in_progress" | "solved"
  created_at: string
  author: { name: string }
}

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    solved: 0,
    helping: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    const supabase = createClient()
    const { data: recentRequests } = await supabase
      .from("requests")
      .select("*, author:profiles(name)")
      .order("created_at", { ascending: false })
      .limit(5)

    if (recentRequests) setRequests(recentRequests)

    // Mock stats for now
    setStats({
      total: 42,
      active: 15,
      solved: 27,
      helping: 3,
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive"
      case "medium": return "warning"
      default: return "secondary"
    }
  }

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to Helplytics</p>
          </div>
          <Button asChild>
            <Link href="/requests/new">
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Solved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.solved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Helping</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.helping}</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-8 border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-medium">Trending Topics</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Career Advice</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Recommended Actions</p>
                <p className="text-sm text-muted-foreground">
                  3 people need help with JavaScript - your top skill!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Requests</TabsTrigger>
            <TabsTrigger value="my">My Requests</TabsTrigger>
            <TabsTrigger value="helping">Helping With</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No requests yet. Be the first!</p>
                  <Button asChild className="mt-4">
                    <Link href="/requests/new">Create Request</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              requests.map((req) => (
                <Card key={req.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{req.title}</CardTitle>
                        <CardDescription>
                          by {req.author?.name || "Anonymous"} • {new Date(req.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={getUrgencyColor(req.urgency)}>{req.urgency}</Badge>
                        <Badge variant="outline">{req.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {req.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> 0 responses
                        </span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/requests/${req.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="my">
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">You haven't created any requests yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="helping">
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">You're not helping with any requests yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
