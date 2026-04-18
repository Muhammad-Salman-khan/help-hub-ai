"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  MessageSquare,
  User,
  Sparkles,
  Clock,
  MapPin,
  Share2,
  Flag,
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
  tags: string[]
  author: {
    id: string
    name: string
    location?: string
    bio?: string
  }
}

interface Helper {
  id: string
  name: string
  offered_at: string
}

export default function RequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [request, setRequest] = useState<Request | null>(null)
  const [helpers, setHelpers] = useState<Helper[]>([])
  const [isHelping, setIsHelping] = useState(false)
  const [aiSummary, setAiSummary] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    fetchRequest()
    fetchCurrentUser()
  }, [params.id])

  const fetchCurrentUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentUser(user)
  }

  const fetchRequest = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("requests")
      .select("*, author:profiles(id, name, location, bio)")
      .eq("id", params.id)
      .single()

    if (data) {
      setRequest(data)
      // Generate AI summary
      const summary = data.description
        .split(" ")
        .slice(0, 20)
        .join(" ") + "..."
      setAiSummary(summary)
    }

    // Fetch helpers
    const { data: helpersData } = await supabase
      .from("request_helpers")
      .select("*, helper:profiles(id, name)")
      .eq("request_id", params.id)

    if (helpersData) {
      setHelpers(helpersData.map((h: any) => ({
        id: h.helper.id,
        name: h.helper.name,
        offered_at: h.created_at,
      })))
    }
  }

  const handleOfferHelp = async () => {
    setIsHelping(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user && request) {
      await supabase.from("request_helpers").insert({
        request_id: request.id,
        helper_id: user.id,
      })

      // Update request status
      await supabase
        .from("requests")
        .update({ status: "in_progress" })
        .eq("id", request.id)

      fetchRequest()
    }
    setIsHelping(false)
  }

  const handleMarkSolved = async () => {
    const supabase = createClient()
    await supabase
      .from("requests")
      .update({ status: "solved" })
      .eq("id", params.id)
    fetchRequest()
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive"
      case "medium": return "warning"
      default: return "secondary"
    }
  }

  if (!request) return <div className="p-8">Loading...</div>

  const isAuthor = currentUser?.id === request.author?.id

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/explore" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-3xl">
        <div className="space-y-6">
          {/* Title Section */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold">{request.title}</h1>
              <div className="flex gap-2">
                <Badge variant={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                <Badge variant={request.status === "solved" ? "default" : "outline"}>
                  {request.status}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(request.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {request.author?.location || "Remote"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Author Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{request.author?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{request.author?.name || "Anonymous"}</p>
              <p className="text-sm text-muted-foreground">{request.author?.bio || "Community member"}</p>
            </div>
          </div>

          <Separator />

          {/* AI Summary */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">AI Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{aiSummary}</p>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{request.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {request.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {!isAuthor && request.status !== "solved" && (
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={handleOfferHelp} disabled={isHelping}>
                <User className="mr-2 h-4 w-4" />
                I Can Help
              </Button>
              <Button size="lg" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          )}

          {isAuthor && request.status !== "solved" && (
            <Button size="lg" className="w-full" variant="default" onClick={handleMarkSolved}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Solved
            </Button>
          )}

          {/* Helpers List */}
          {helpers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Helpers ({helpers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {helpers.map((helper) => (
                    <div key={helper.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{helper.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{helper.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Offered to help
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/messages?user=${helper.id}`}>Message</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
