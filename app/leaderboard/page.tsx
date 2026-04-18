"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Trophy, Medal, Award, Star, TrendingUp, Clock } from "lucide-react"

const TOP_HELPERS = [
  { id: "1", name: "Sarah Johnson", helped: 47, rating: 4.9, badges: ["Expert", "Mentor"], avatar: "S" },
  { id: "2", name: "Mike Chen", helped: 42, rating: 4.8, badges: ["Rising Star"], avatar: "M" },
  { id: "3", name: "Emma Wilson", helped: 38, rating: 4.9, badges: ["Expert"], avatar: "E" },
  { id: "4", name: "David Kim", helped: 35, rating: 4.7, badges: [], avatar: "D" },
  { id: "5", name: "Lisa Park", helped: 32, rating: 4.8, badges: ["Mentor"], avatar: "L" },
  { id: "6", name: "Alex Thompson", helped: 28, rating: 4.6, badges: [], avatar: "A" },
  { id: "7", name: "Rachel Green", helped: 25, rating: 4.7, badges: ["Rising Star"], avatar: "R" },
  { id: "8", name: "James Brown", helped: 22, rating: 4.5, badges: [], avatar: "J" },
  { id: "9", name: "Nina Patel", helped: 20, rating: 4.8, badges: [], avatar: "N" },
  { id: "10", name: "Tom Wilson", helped: 18, rating: 4.6, badges: [], avatar: "T" },
]

const BADGES = [
  { id: "expert", name: "Expert", description: "Helped 30+ people", icon: Trophy, color: "text-yellow-500" },
  { id: "mentor", name: "Mentor", description: "5+ long-term mentees", icon: Award, color: "text-blue-500" },
  { id: "rising", name: "Rising Star", description: "New with high rating", icon: Star, color: "text-green-500" },
  { id: "speed", name: "Speed Demon", description: "Avg response <1 hour", icon: Clock, color: "text-purple-500" },
]

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("monthly")

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />
    return <span className="text-lg font-bold w-6 text-center">{rank}</span>
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
        <div className="text-center mb-8">
          <Trophy className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">Top community helpers this month</p>
        </div>

        <Tabs defaultValue="monthly" className="space-y-6">
          <TabsList className="mx-auto">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 items-end mb-8">
              {[
                { ...TOP_HELPERS[1], rank: 2, height: "h-32" },
                { ...TOP_HELPERS[0], rank: 1, height: "h-40" },
                { ...TOP_HELPERS[2], rank: 3, height: "h-28" },
              ].map((user) => (
                <Card key={user.id} className={`${user.height} flex flex-col justify-end`}>
                  <CardContent className="p-4 text-center">
                    <div className="mb-2">{getRankIcon(user.rank)}</div>
                    <Avatar className="mx-auto h-12 w-12 mb-2">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-2xl font-bold">{user.helped}</p>
                    <p className="text-xs text-muted-foreground">helped</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full List */}
            <Card>
              <CardHeader>
                <CardTitle>All Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {TOP_HELPERS.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-8 text-center">
                        {index < 3 ? (
                          index === 0 ? (
                            <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                          ) : index === 1 ? (
                            <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <Medal className="h-5 w-5 text-amber-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>

                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <div className="flex gap-1">
                          {user.badges.map((badge) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">{user.helped}</p>
                        <p className="text-xs text-muted-foreground">helped</p>
                      </div>

                      <div className="text-right w-16">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{user.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardContent className="py-8 text-center">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p>Weekly rankings reset every Monday</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alltime">
            <Card>
              <CardContent className="py-8 text-center">
                <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p>All-time leaderboard coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Badges Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Available Badges</CardTitle>
            <CardDescription>Earn badges by helping others in the community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BADGES.map((badge) => (
                <div key={badge.id} className="p-4 border rounded-lg text-center">
                  <badge.icon className={`mx-auto h-8 w-8 ${badge.color} mb-2`} />
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
