"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Sparkles,
  TrendingUp,
  Lightbulb,
  Target,
  Zap,
  BarChart3,
  Users,
  CheckCircle,
} from "lucide-react"

const AI_INSIGHTS = [
  {
    id: "1",
    type: "trend",
    title: "React Hooks trending",
    description: "25% increase in React-related help requests this week",
    impact: "high",
  },
  {
    id: "2",
    type: "opportunity",
    title: "Career mentorship gap",
    description: "High demand for interview prep, few helpers available",
    impact: "medium",
  },
  {
    id: "3",
    type: "suggestion",
    title: "Update your skills",
    description: "Add TypeScript to your profile - matches 12 open requests",
    impact: "low",
  },
]

const CATEGORY_STATS = [
  { category: "Programming", requests: 156, helpers: 89, trend: "+12%" },
  { category: "Design", requests: 78, helpers: 45, trend: "+5%" },
  { category: "Career", requests: 45, helpers: 23, trend: "+18%" },
  { category: "Academic", requests: 34, helpers: 28, trend: "-3%" },
]

export default function AICenterPage() {
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
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">AI Center</h1>
            <p className="text-muted-foreground">Smart insights and recommendations</p>
          </div>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Matches Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +12% from yesterday
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-xs text-muted-foreground">Requests resolved</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3h</div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Faster than avg
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Your Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">People helped</div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {AI_INSIGHTS.map((insight) => (
                  <div key={insight.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{insight.title}</p>
                        <Badge
                          variant={insight.impact === "high" ? "destructive" : "secondary"}
                        >
                          {insight.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Category Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {CATEGORY_STATS.map((stat) => (
                      <div key={stat.category}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{stat.category}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                              {stat.requests} requests
                            </span>
                            <Badge variant="outline">{stat.trend}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={(stat.helpers / stat.requests) * 100} className="flex-1" />
                          <span className="text-xs text-muted-foreground w-12">
                            {Math.round((stat.helpers / stat.requests) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Hot Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React Hooks",
                      "TypeScript",
                      "Career Change",
                      "System Design",
                      "UI Design",
                      "Python",
                      "Interview Prep",
                      "Freelancing",
                    ].map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-sm py-1 px-3">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suggestions">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    For You
                  </CardTitle>
                  <CardDescription>Based on your skills and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <p className="font-medium">Add TypeScript skill</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      12 open requests match this skill
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <p className="font-medium">Help with React Hooks</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      5 people need help with this topic
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Needs</CardTitle>
                  <CardDescription>Areas with high demand</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950">
                    <p className="font-medium text-red-700 dark:text-red-300">
                      Career mentorship gap
                    </p>
                    <p className="text-sm text-muted-foreground">
                      23 requests, only 8 helpers available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
