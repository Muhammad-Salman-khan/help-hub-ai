"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import {
  Shield,
  Users,
  Flag,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Eye,
} from "lucide-react"

const MOCK_REQUESTS = [
  { id: "1", title: "React Hooks Help", author: "John Doe", status: "open", reports: 0 },
  { id: "2", title: "CSS Layout Issue", author: "Jane Smith", status: "solved", reports: 0 },
  { id: "3", title: "Spam Test", author: "Spam Bot", status: "flagged", reports: 3 },
]

const MOCK_USERS = [
  { id: "1", name: "Alice Chen", role: "helper", trustScore: 95 },
  { id: "2", name: "Bob Smith", role: "seeker", trustScore: 78 },
]

const ANALYTICS = {
  totalUsers: 250,
  totalRequests: 420,
  solvedRequests: 380,
  avgResponseTime: "2.3h",
}

export default function AdminPage() {
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
            <p className="text-muted-foreground">Manage platform and moderate content</p>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ANALYTICS.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ANALYTICS.totalRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ANALYTICS.solvedRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ANALYTICS.avgResponseTime}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" /> Manage Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {MOCK_REQUESTS.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{req.title}</p>
                        <p className="text-sm text-muted-foreground">by {req.author}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={req.status === "flagged" ? "destructive" : "secondary"}>
                          {req.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" /> Manage Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {MOCK_USERS.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">Trust Score: {user.trustScore}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{user.role}</Badge>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" /> Flagged Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {MOCK_REQUESTS.filter((r) => r.reports > 0).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 border border-destructive rounded-lg">
                      <div>
                        <p className="font-medium">{req.title}</p>
                        <p className="text-sm text-muted-foreground">{req.reports} reports</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
