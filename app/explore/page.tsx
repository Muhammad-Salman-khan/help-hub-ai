"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Filter, MessageSquare, ArrowRight, Plus } from "lucide-react"
import { createClient } from "@/lib/client"

const CATEGORIES = ["All", "Programming", "Design", "Marketing", "Academic", "Career", "Other"]
const URGENCY_LEVELS = ["All", "high", "medium", "low"]
const LOCATIONS = ["All", "Remote", "Local", "Nearby"]

interface Request {
  id: string
  title: string
  description: string
  category: string
  urgency: "low" | "medium" | "high"
  status: "open" | "in_progress" | "solved"
  created_at: string
  author: { name: string; location?: string }
  tags: string[]
}

export default function ExplorePage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [urgencyFilter, setUrgencyFilter] = useState("All")
  const [locationFilter, setLocationFilter] = useState("All")

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [searchQuery, categoryFilter, urgencyFilter, locationFilter, requests])

  const fetchRequests = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("requests")
      .select("*, author:profiles(name, location)")
      .eq("status", "open")
      .order("created_at", { ascending: false })

    if (data) {
      setRequests(data)
      setFilteredRequests(data)
    }
  }

  const filterRequests = () => {
    let filtered = requests

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((r) => r.category === categoryFilter)
    }

    if (urgencyFilter !== "All") {
      filtered = filtered.filter((r) => r.urgency === urgencyFilter)
    }

    setFilteredRequests(filtered)
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
            <h1 className="text-3xl font-bold">Explore Requests</h1>
            <p className="text-muted-foreground">Find help requests matching your skills</p>
          </div>
          <Button asChild>
            <Link href="/requests/new">
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {URGENCY_LEVELS.map((u) => (
                      <SelectItem key={u} value={u}>{u === "All" ? "All" : u.charAt(0).toUpperCase() + u.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? "s" : ""}
        </p>

        {/* Request List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No requests found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((req) => (
              <Card key={req.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg hover:text-primary cursor-pointer">
                        <Link href={`/requests/${req.id}`}>{req.title}</Link>
                      </CardTitle>
                      <CardDescription>
                        by {req.author?.name || "Anonymous"}
                        {req.author?.location && ` • ${req.author.location}`}
                        {" "}• {new Date(req.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getUrgencyColor(req.urgency)}>{req.urgency}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {req.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{req.category}</Badge>
                    {req.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      0 helpers interested
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/requests/${req.id}`}>
                        I can help
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
