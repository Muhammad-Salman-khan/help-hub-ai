"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { ArrowLeft, Send, MoreVertical, Phone, Video } from "lucide-react"
import { createClient } from "@/lib/client"

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

interface Conversation {
  id: string
  user: {
    id: string
    name: string
  }
  lastMessage: string
  unread: number
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      user: { id: "user1", name: "Alice Chen" },
      lastMessage: "Thanks for offering to help!",
      unread: 2,
    },
    {
      id: "2",
      user: { id: "user2", name: "Bob Smith" },
      lastMessage: "Can you explain that again?",
      unread: 0,
    },
  ])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat)
    }
  }, [selectedChat])

  const fetchCurrentUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentUser(user)
  }

  const fetchMessages = async (conversationId: string) => {
    // Mock messages for now
    setMessages([
      {
        id: "1",
        content: "Hi! I saw your request about React hooks.",
        sender_id: "other",
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "2",
        content: "Yes, I'm having trouble understanding useEffect.",
        sender_id: "me",
        created_at: new Date(Date.now() - 3000000).toISOString(),
      },
      {
        id: "3",
        content: "I'd be happy to help! When are you free?",
        sender_id: "other",
        created_at: new Date(Date.now() - 600000).toISOString(),
      },
    ])
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      sender_id: currentUser?.id || "me",
      created_at: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const selectedUser = conversations.find((c) => c.id === selectedChat)?.user

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <div className="container py-4 h-[calc(100vh-3.5rem)]">
        <div className="grid md:grid-cols-3 gap-4 h-full">
          {/* Conversations List */}
          <Card className="md:col-span-1 overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Messages</h2>
            </div>
            <ScrollArea className="h-[calc(100%-3.5rem)]">
              <div className="divide-y">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`w-full p-4 text-left hover:bg-muted transition-colors ${
                      selectedChat === conv.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conv.user.name}</p>
                          {conv.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{selectedUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedUser?.name}</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender_id === currentUser?.id || msg.sender_id === "me"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            msg.sender_id === currentUser?.id || msg.sender_id === "me"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Select a conversation</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
