"use client"

import Link from "next/link"

const NOTIFICATIONS = [
  { message: '"Need help" was marked as solved', type: "Status", time: "Just now", read: false },
  { message: 'Ayesha Khan offered help on "Need help"', type: "Match", time: "Just now", read: false },
  { message: 'Your request "Need help" is now live in the community feed', type: "Request", time: "Just now", read: false },
  { message: '"Need help making my portfolio responsive before demo day" was marked as solved', type: "Status", time: "Just now", read: false },
  { message: '"Need help making my portfolio responsive before demo day" was marked as solved', type: "Status", time: "Just now", read: false },
  { message: '"Need help making my portfolio responsive before demo day" was marked as solved', type: "Status", time: "Just now", read: false },
  { message: "New helper matched to your responsive portfolio request", type: "Match", time: "12 min ago", read: false },
  { message: "Your trust score increased after a solved request", type: "Reputation", time: "1 hr ago", read: false },
  { message: "AI Center detected rising demand for interview prep", type: "Insight", time: "Today", read: true },
]

export default function NotificationsPage() {
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
            <Link href="/notifications" className="px-3.5 py-1.5 rounded-full bg-[#1a1a1a] text-white text-sm font-medium">Notifications</Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="bg-[#1b5e47] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#8cc5a6] mb-4">Notifications</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 max-w-3xl italic">
            Stay updated on requests, helpers, and trust signals.
          </h1>
        </div>
      </section>

      {/* Notification Feed */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#e5ddd0]">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#2a7d5f] mb-3">Live Updates</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6">Notification feed</h2>

          <div className="divide-y divide-[#e5ddd0]">
            {NOTIFICATIONS.map((notif, i) => (
              <div key={i} className="flex items-start sm:items-center justify-between gap-4 py-4 sm:py-5">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[#1a1a1a] leading-snug">{notif.message}</p>
                  <p className="text-xs text-[#777] mt-1">{notif.type} • {notif.time}</p>
                </div>
                <span className={`text-xs font-semibold rounded-full px-3 py-1 shrink-0 ${
                  notif.read
                    ? "bg-[#e5ddd0] text-[#777]"
                    : "bg-white border border-[#d5cec0] text-[#1a1a1a]"
                }`}>
                  {notif.read ? "Read" : "Unread"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
