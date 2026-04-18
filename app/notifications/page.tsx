"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Bell,
  MessageSquare,
  CheckCircle,
  User,
  HelpCircle,
  TrendingUp,
  Settings,
  Trash2,
} from "lucide-react"

const NOTIFICATIONS = [
  {
    id: "1",
    type: "request",
    title: "New help request",
    description: "Someone needs help with React Hooks in your area",
    time: "5 min ago",
    read: false,
    link: "/explore",
  },
  {
    id: "2",
    type: "message",
    title: "New message",
    description: "Alice sent you a message about your request",
    time: "1 hour ago",
    read: false,
    link: "/messages",
  },
  {
    id: "3",
    type: "solved",
    title: "Request solved",
    description: "Your request 'Help with TypeScript' was marked as solved",
    time: "3 hours ago",
    read: true,
    link: "/dashboard",
  },
  {
    id: "4",
    type: "helper",
    title: "Someone can help",
    description: "Mike offered to help with your request",
    time: "5 hours ago",
    read: true,
    link: "/dashboard",
  },
  {
    id: "5",
    type: "trending",
    title: "Trending in your skills",
    description: "Python requests are up 25% this week",
    time: "1 day ago",
    read: true,
    link: "/ai-center",
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "request": return <HelpCircle className="h-5 w-5 text-blue-500" />
    case "message": return <MessageSquare className="h-5 w-5 text-green-500" />
    case "solved": return <CheckCircle className="h-5 w-5 text-green-500" />
    case "helper": return <User className="h-5 w-5 text-purple-500" />
    case "trending": return <TrendingUp className="h-5 w-5 text-orange-500" />
    default: return <Bell className="h-5 w-5" />
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

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

      <div className="container py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6" />
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount} unread
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllRead}>
              Mark all read
            </Button>
            <Button variant="ghost" size="icon" onClick={clearAll}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All{" "}
              <Badge variant="secondary" className="ml-2">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread{" "}
              <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No notifications</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Link key={notification.id} href={notification.link}>
                  <Card className={`hover:bg-muted transition-colors ${!notification.read ? "border-primary" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.title}</p>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>

                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-2">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <p className="text-muted-foreground">All caught up!</p>
                </CardContent>
              </Card>
            ) : (
              notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <Link key={notification.id} href={notification.link}>
                    <Card className="border-primary hover:bg-muted transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1">{getIcon(notification.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{notification.title}</p>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                          </div>
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
