// app/resources/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BookOpen, Video, FileText, ExternalLink, ArrowRight } from 'lucide-react'

export default function ResourcesPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // This is a placeholder - in a real app, you'd check if the user is logged in
  useEffect(() => {
    // Check if user is logged in - this is just a placeholder
    // In a real app, you'd check your auth state
    const checkLoginStatus = () => {
      // For now, we'll assume the user is not logged in
      setIsLoggedIn(false)
    }
    
    checkLoginStatus()
  }, [])
  
  // If logged in, redirect to dashboard resources
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/resources")
    }
  }, [isLoggedIn, router])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28 hero-gradient">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-60 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                GATE <span className="text-primary">Study Resources</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Access curated study materials, video lectures, and practice resources for GATE preparation
              </p>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                  Sign Up for Full Access
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-20 bg-black/90">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Resource <span className="text-primary">Categories</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Explore our comprehensive collection of GATE preparation materials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-700 group">
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white">Video Lectures</CardTitle>
                  <CardDescription className="text-gray-400">
                    Learn from top GATE educators through comprehensive video courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="text-gray-300">• Gate Wallah</li>
                    <li className="text-gray-300">• Unacademy Computer Science</li>
                    <li className="text-gray-300">• Gate Smashers</li>
                    <li className="text-gray-300">• Knowledge Gate</li>
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                      Access Videos <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-700 group">
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white">Books & References</CardTitle>
                  <CardDescription className="text-gray-400">
                    Essential textbooks and reference materials for GATE preparation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="text-gray-300">• Operating System Concepts</li>
                    <li className="text-gray-300">• Introduction to Algorithms</li>
                    <li className="text-gray-300">• Computer Networks</li>
                    <li className="text-gray-300">• Database System Concepts</li>
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                      Access Books <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-700 group">
                <CardHeader className="pb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white">Notes & Study Materials</CardTitle>
                  <CardDescription className="text-gray-400">
                    Comprehensive notes and quick revision materials for GATE topics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="text-gray-300">• Operating Systems Notes</li>
                    <li className="text-gray-300">• Data Structures & Algorithms</li>
                    <li className="text-gray-300">• Computer Networks Cheat Sheet</li>
                    <li className="text-gray-300">• Theory of Computation Summary</li>
                  </ul>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                      Access Notes <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-20"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to access all resources?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Sign up for GateSmart to get full access to all our premium GATE preparation resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg w-full sm:w-auto">
                    Sign Up Now
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg w-full sm:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}