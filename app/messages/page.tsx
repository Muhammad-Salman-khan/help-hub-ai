"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const MESSAGES = [
  {
    from: "Ayesha Khan",
    to: "Sara Noor",
    message: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
    time: "09:45 AM",
  },
  {
    from: "Hassan Ali",
    to: "Ayesha Khan",
    message: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
    time: "11:10 AM",
  },
]

const USERS = ["Ayesha Khan", "Sara Noor", "Hassan Ali"]

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState("Ayesha Khan")
  const [messageText, setMessageText] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return
    setMessageText("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f1e7]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#f6f1e7]/90 border-b border-[#e5ddd0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-[#2a7d5f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">H</div>
            <span className="font-semibold text-[#1a1a1a] text-base">HelpHub AI</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/dashboard" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Dashboard</Link>
            <Link href="/explore" className="px-3.5 py-1.5 rounded-full text-[#555] text-sm font-medium hover:bg-[#ece5d8] transition-colors">Explore</Link>
            <Link href="/messages" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Messages</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">Interaction / Messaging</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl italic">
            Keep support moving through direct communication.
          </h1>
          <p className="text-[#a3c9b5] text-sm sm:text-base leading-relaxed max-w-2xl">
            Basic messaging gives helpers and requesters a clear follow-up path once a match happens.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Conversation Stream */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Conversation Stream</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Recent messages</h2>

            <div className="space-y-4">
              {MESSAGES.map((msg, i) => (
                <div key={i} className="bg-[#f6f1e7]/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#e5ddd0]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-sm text-[#1a1a1a] mb-2">
                        {msg.from} → {msg.to}
                      </p>
                      <p className="text-xs sm:text-sm text-[#777] leading-relaxed">{msg.message}</p>
                    </div>
                    <div className="bg-[#e5f5ee] text-[#2a7d5f] text-[11px] sm:text-xs font-semibold rounded-xl px-3 py-1.5 shrink-0 text-center leading-tight">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Send Message */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#c74a2c] mb-3">Send Message</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">
              Start a
              <br />
              conversation
            </h2>

            <form onSubmit={handleSend} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">To</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full rounded-xl border border-[#d5cec0] bg-white/80 h-11 px-4 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#2a7d5f]/20"
                >
                  {USERS.map((user) => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1a1a1a] mb-1.5 block">Message</label>
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Share support details, ask for files, or suggest next steps."
                  className="rounded-xl border-[#d5cec0] bg-white/80 min-h-[120px] text-sm resize-y"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2a7d5f] hover:bg-[#1f6a4e] text-white rounded-full h-12 text-sm font-semibold shadow-sm cursor-pointer"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
