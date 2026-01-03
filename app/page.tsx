"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ArrowRight, Brain, BookOpen, BarChart2, MessageSquareText, Clock, FileText } from 'lucide-react'

export default function LandingPage() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    if (heroRef.current) observer.observe(heroRef.current)
    if (featuresRef.current) observer.observe(featuresRef.current)
    if (howItWorksRef.current) observer.observe(howItWorksRef.current)
    if (ctaRef.current) observer.observe(ctaRef.current)

    // Feature cards
    document.querySelectorAll(".feature-card").forEach((card) => {
      observer.observe(card)
    })

    // How it works cards
    document.querySelectorAll(".step-card").forEach((card) => {
      observer.observe(card)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with scroll animations */}
        <section className="relative overflow-hidden py-20 md:py-32 hero-gradient">
          {/* Background animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-60 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div
            ref={heroRef}
            className="container mx-auto px-4 md:px-6 relative z-10 opacity-0 translate-y-8 duration-1000 ease-out"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-block animate-shimmer bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:400%_100%] px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-2">
                  AI-Powered GATE Preparation
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                  <span className="text-primary">Gate</span>Smart
                </h1>
                <p className="text-xl md:text-2xl text-gray-300">Crack GATE with AI-powered Study & Revision</p>
                <p className="text-gray-400 max-w-md">
                  Personalized learning paths, interactive practice tests, and smart revision tools designed
                  specifically for GATE aspirants.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/login">
                    <Button className="button-hover bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group transition-all duration-300 transform hover:translate-y-[-2px]">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="outline"
                      className="button-hover border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg transition-all duration-300"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative w-full h-[400px] transform transition-all duration-700 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-md"></div>
                  <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg h-full overflow-hidden">
                    {/* Animated particles background */}
                    <div className="absolute inset-0">
                      {mounted && Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-primary/30"
                          style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* 3D-like card stack */}
                    <div className="relative h-full flex items-center justify-center p-8">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-800/50 rounded-xl transform rotate-12 translate-x-6 -translate-y-6"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-800/80 rounded-xl transform -rotate-6 -translate-x-4 translate-y-2"></div>
                      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 w-64 h-64 rounded-xl shadow-xl flex flex-col items-center justify-center p-6 border border-gray-700">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative">
                          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
                          <Brain className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">AI-Powered Learning</h3>
                        <p className="text-gray-300 text-center text-sm">
                          Our intelligent system adapts to your learning style and helps you master GATE concepts efficiently.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - With scroll animations */}
        <section ref={featuresRef} className="py-20 bg-black/90 opacity-0 translate-y-8 duration-1000 ease-out">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Supercharge Your <span className="text-primary">GATE Preparation</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Our AI-powered platform adapts to your learning style and helps you master GATE concepts efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Study Plan",
                  description: "Personalized study schedules based on your availability and learning pace",
                  icon: <Brain className="h-6 w-6 text-primary" />,
                },
                {
                  title: "Spaced Repetition",
                  description: "Review topics at optimal intervals to maximize long-term retention",
                  icon: <Clock className="h-6 w-6 text-primary" />,
                },
                {
                  title: "Interactive Quizzes",
                  description: "Test your knowledge with adaptive quizzes that focus on your weak areas",
                  icon: <FileText className="h-6 w-6 text-primary" />,
                },
                {
                  title: "Progress Tracking",
                  description: "Visualize your improvement with detailed analytics and insights",
                  icon: <BarChart2 className="h-6 w-6 text-primary" />,
                },
                {
                  title: "Comprehensive Resources",
                  description: "Access curated study materials, notes, and references for GATE topics",
                  icon: <BookOpen className="h-6 w-6 text-primary" />,
                },
                {
                  title: "AI Doubt Solving",
                  description: "Get instant answers to your questions with our GenAI assistant",
                  icon: <MessageSquareText className="h-6 w-6 text-primary" />,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="feature-card card-hover bg-gray-900 rounded-xl p-8 border border-gray-800 transition-all duration-300 hover:bg-gray-900/80 group opacity-0 translate-y-8"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Link Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <div className="text-4xl mb-4">🎬</div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Want to See the Full Site Working?
                </h2>
                <p className="text-gray-300 mb-6">
                  Watch our comprehensive demo to see all features in action!
                  Navigate to the navbar and click "Watch Demo" to see the complete app demonstration.
                </p>
                <Link href="/demo">
                  <Button className="button-hover bg-primary hover:bg-primary/90 text-white px-6 py-3 group transition-all duration-300 transform hover:translate-y-[-2px]">
                    Watch Full Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - With scroll animations */}
        <section
          ref={howItWorksRef}
          className="py-20 bg-gradient-to-b from-black to-gray-900 opacity-0 translate-y-8 duration-1000 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                How <span className="text-primary">GateSmart</span> Works
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Our intelligent system adapts to your learning style and helps you prepare efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Sign up and tell us about your study goals and available time",
                },
                {
                  step: "02",
                  title: "Get Personalized Plan",
                  description: "Our AI creates a custom study schedule optimized for your GATE preparation",
                },
                {
                  step: "03",
                  title: "Track & Improve",
                  description: "Study, take quizzes, and watch your progress improve over time",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="step-card relative group opacity-0 translate-y-8"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative bg-gray-900 rounded-lg p-8 h-full flex flex-col items-center text-center">
                    <div className="text-4xl font-bold text-primary/50 mb-4">{item.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - With scroll animations */}
        <section ref={ctaRef} className="py-20 relative overflow-hidden opacity-0 translate-y-8 duration-1000 ease-out">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-20"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to transform your GATE preparation?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join GateSmart today and experience the power of AI-driven learning.
              </p>
              <Link href="/signup">
                <Button className="button-hover bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group transition-all duration-300 transform hover:translate-y-[-2px]">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}