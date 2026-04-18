import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  MessageSquare,
  Target,
  Clock,
  ChevronRight,
  Bot,
  CheckCircle,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Gradient Header */}
      <header className="relative bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 text-white">
        <div className="container mx-auto px-4 py-6">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl">HelpHub AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm font-medium hover:opacity-80">
                Login
              </Link>
              <Button className="bg-white text-teal-600 hover:bg-white/90 font-semibold" size="sm">
                Get Started
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto pb-24">
            {/* SMIT Badge */}
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-0 hover:bg-white/30">
              <span className="mr-1">Powered by</span>
              <span className="font-bold">SMIT</span>
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Help.<br />
              <span className="text-emerald-100">Give Help.</span><br />
              Build Community.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with skilled individuals ready to help. Our AI-powered platform matches
              your needs with the right helpers.
            </p>
            <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90 font-semibold px-8">
              Join Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Decorative curves */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </header>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">100+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">AI Matching</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Requests</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* More than a form Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            More than a <span className="text-teal-600">form</span>.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get intelligent help matching, smart summaries, and real-time assistance powered by AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Smart Matching</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes your needs and connects you with the perfect helper instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI Summaries</h3>
              <p className="text-sm text-muted-foreground">
                Get intelligent summaries of your requests to help helpers understand faster.
              </p>
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Available</h3>
              <p className="text-sm text-muted-foreground">
                Our platform works around the clock to match you with helpers anytime.
              </p>
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Built for the community, by the community. Everyone helps everyone grow.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Flow Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Flow</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to get the help you need or help others.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-teal-600 mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-2">Post Request</h3>
                  <p className="text-muted-foreground">
                    Describe what you need help with. Our AI categorizes and optimizes your request.
                  </p>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ChevronRight className="h-8 w-8 text-teal-300" />
              </div>
            </div>

            <div className="relative">
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-teal-600 mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
                  <p className="text-muted-foreground">
                    Our AI finds the best helpers based on skills, availability, and past performance.
                  </p>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ChevronRight className="h-8 w-8 text-teal-300" />
              </div>
            </div>

            <Card className="border-0 shadow-lg h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-teal-600 mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Get Help</h3>
                <p className="text-muted-foreground">
                  Connect directly with your matched helper and solve your problem together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Requests Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Requests</h2>
          <Button variant="ghost" className="text-teal-600" asChild>
            <Link href="/explore">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">Open</Badge>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <h3 className="font-semibold mb-2 line-clamp-2">Help with React useEffect dependency array</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                I need help understanding why my useEffect is running infinitely...
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">React</Badge>
                <Badge variant="outline" className="text-xs">JavaScript</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">Open</Badge>
                <span className="text-xs text-muted-foreground">5 hours ago</span>
              </div>
              <h3 className="font-semibold mb-2 line-clamp-2">Database design advice for PostgreSQL</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                Looking for guidance on normalizing a user profile table with multiple...
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
                <Badge variant="outline" className="text-xs">Database</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">Open</Badge>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <h3 className="font-semibold mb-2 line-clamp-2">CSS Grid layout responsive issues</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                My grid layout breaks on mobile devices. Need help with responsive...
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">CSS</Badge>
                <Badge variant="outline" className="text-xs">Responsive</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 text-white p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8 max-w-xl mx-auto text-white/90">
            Join thousands of community members helping each other grow and learn.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-white/90 font-semibold">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              Explore Requests
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="h-6 w-6 bg-gradient-to-br from-teal-500 to-emerald-500 rounded flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span>HelpHub AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by SMIT. Community-driven support.
          </p>
        </div>
      </footer>
    </div>
  )
}
