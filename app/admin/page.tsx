"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { createClient } from "@/lib/client"
import type { Profile, Request } from "@/lib/database.types"
import {
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Eye,
  Loader2,
} from "lucide-react"

interface AdminStats {
  totalUsers: number
  totalRequests: number
  solvedRequests: number
  openRequests: number
  inProgressRequests: number
  avgRequestsPerUser: number
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRequests: 0,
    solvedRequests: 0,
    openRequests: 0,
    inProgressRequests: 0,
    avgRequestsPerUser: 0,
  })
  const [users, setUsers] = useState<Profile[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [flaggedRequests, setFlaggedRequests] = useState<Request[]>([])

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    setLoading(true)
    const supabase = createClient()

    // Fetch all users
    const { data: allUsers } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })

    // Fetch all requests
    const { data: allRequests } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (allUsers && allRequests) {
      setUsers(allUsers)
      setRequests(allRequests)

      // Calculate stats
      const totalUsers = allUsers.length
      const totalRequests = allRequests.length
      const solvedRequests = allRequests.filter(r => r.status === "solved").length
      const openRequests = allRequests.filter(r => r.status === "open").length
      const inProgressRequests = allRequests.filter(r => r.status === "in_progress").length
      const avgRequestsPerUser = totalUsers > 0 ? Math.round((totalRequests / totalUsers) * 10) / 10 : 0

      setStats({
        totalUsers,
        totalRequests,
        solvedRequests,
        openRequests,
        inProgressRequests,
        avgRequestsPerUser,
      })

      // For now, treat "high" urgency or specific keywords as "flagged"
      // In a real app, you'd have a reports table
      const flagged = allRequests.filter(r =>
        r.urgency === "high" ||
        r.title.toLowerCase().includes("spam") ||
        r.description.toLowerCase().includes("spam")
      )
      setFlaggedRequests(flagged)
    }

    setLoading(false)
  }

  const handleDeleteRequest = async (id: string) => {
    if (!confirm("Delete this request?")) return
    const supabase = createClient()
    await supabase.from("requests").delete().eq("id", id)
    fetchAdminData()
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "seeker": return "bg-orange-100 text-orange-700 border-orange-200"
      case "helper": return "bg-blue-100 text-blue-700 border-blue-200"
      case "both": return "bg-green-100 text-green-700 border-green-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-xl">Helplytics Admin</Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">Dashboard</Link>
            <Badge variant="destructive">Admin</Badge>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Real-time platform analytics and moderation</p>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Open</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.openRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgressRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.solvedRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Req/User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRequestsPerUser}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">Requests ({requests.length})</TabsTrigger>
            <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            <TabsTrigger value="flagged">Flagged ({flaggedRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  All Requests
                </CardTitle>
                <CardDescription>Manage all requests on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No requests yet</p>
                ) : (
                  <div className="space-y-2">
                    {requests.map((req) => (
                      <div key={req.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{req.title}</p>
                          <p className="text-sm text-muted-foreground">{req.category} • {new Date(req.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge variant={
                            req.status === "open" ? "default" :
                            req.status === "solved" ? "secondary" : "outline"
                          }>
                            {req.status}
                          </Badge>
                          <Badge variant={req.urgency === "high" ? "destructive" : "outline"}>
                            {req.urgency}
                          </Badge>
                          <Link href={`/requests/${req.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteRequest(req.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  All Users
                </CardTitle>
                <CardDescription>Manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No users yet</p>
                ) : (
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name || "Unnamed User"}</p>
                          <p className="text-sm text-muted-foreground">
                            Trust: {user.trust_score}% • Joined {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.completed_onboarding ? "secondary" : "destructive"}>
                            {user.completed_onboarding ? "Onboarded" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flagged">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" /> Flagged Content
                </CardTitle>
                <CardDescription>High urgency or potentially problematic content</CardDescription>
              </CardHeader>
              <CardContent>
                {flaggedRequests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No flagged content</p>
                ) : (
                  <div className="space-y-2">
                    {flaggedRequests.map((req) => (
                      <div key={req.id} className="flex items-center justify-between p-3 border border-destructive/50 rounded-lg bg-destructive/5">
                        <div>
                          <p className="font-medium">{req.title}</p>
                          <p className="text-sm text-muted-foreground">High urgency • {req.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/requests/${req.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" /> View
                            </Button>
                          </Link>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteRequest(req.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
