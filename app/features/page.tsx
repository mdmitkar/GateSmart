// app/features/page.tsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Brain, BookOpen, BarChart2, MessageSquareText, Clock, FileText, Calendar, CheckCircle, Zap, Target, Award, Users } from 'lucide-react'

export default function FeaturesPage() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const aiTutorRef = useRef<HTMLDivElement>(null)
  const studyPlanRef = useRef<HTMLDivElement>(null)
  const quizzesRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
    if (aiTutorRef.current) observer.observe(aiTutorRef.current)
    if (studyPlanRef.current) observer.observe(studyPlanRef.current)
    if (quizzesRef.current) observer.observe(quizzesRef.current)
    if (progressRef.current) observer.observe(progressRef.current)
    if (ctaRef.current) observer.observe(ctaRef.current)

    // Feature cards
    document.querySelectorAll(".feature-card").forEach((card) => {
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
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28 hero-gradient">
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
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Powerful Features for <span className="text-primary">GATE Success</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover how GateSmart's AI-powered tools can transform your GATE preparation
              </p>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-pulse">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Overview Section */}
        <section ref={featuresRef} className="py-20 bg-black/90 opacity-0 translate-y-8 duration-1000 ease-out">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Key <span className="text-primary">Features</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Our platform combines cutting-edge AI technology with proven learning methodologies to help you ace the GATE exam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Tutor",
                  description: "Get instant answers to your questions with our GenAI assistant",
                  icon: <Brain className="h-6 w-6 text-primary" />,
                  link: "#ai-tutor",
                },
                {
                  title: "Smart Study Plan",
                  description: "Personalized study schedules based on your availability and learning pace",
                  icon: <Calendar className="h-6 w-6 text-primary" />,
                  link: "#study-plan",
                },
                {
                  title: "Interactive Quizzes",
                  description: "Test your knowledge with adaptive quizzes that focus on your weak areas",
                  icon: <FileText className="h-6 w-6 text-primary" />,
                  link: "#quizzes",
                },
                {
                  title: "Progress Tracking",
                  description: "Visualize your improvement with detailed analytics and insights",
                  icon: <BarChart2 className="h-6 w-6 text-primary" />,
                  link: "#progress",
                },
                {
                  title: "Comprehensive Resources",
                  description: "Access curated study materials, notes, and references for GATE topics",
                  icon: <BookOpen className="h-6 w-6 text-primary" />,
                  link: "#resources",
                },
                {
                  title: "Spaced Repetition",
                  description: "Review topics at optimal intervals to maximize long-term retention",
                  icon: <Clock className="h-6 w-6 text-primary" />,
                  link: "#spaced-repetition",
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
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <a 
                    href={feature.link} 
                    className="text-primary hover:text-primary/90 font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Tutor Section */}
        <section 
          id="ai-tutor"
          ref={aiTutorRef} 
          className="py-20 bg-gradient-to-b from-black to-gray-900 opacity-0 translate-y-8 duration-1000 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block animate-shimmer bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:400%_100%] px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-4">
                  AI-Powered Learning
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Your Personal <span className="text-primary">AI Tutor</span>
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Get instant answers to your questions and personalized explanations for complex GATE topics.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Ask questions in natural language",
                    "Get step-by-step explanations",
                    "Receive personalized learning recommendations",
                    "Available 24/7 for instant help",
                    "Covers all GATE CS subjects",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/ai-tutor">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Try AI Tutor
                  </Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-25"></div>
                  <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">AI Tutor</h3>
                          <p className="text-xs text-gray-400">Online now</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                        <p className="text-gray-300 text-sm">
                          How does virtual memory work in operating systems?
                        </p>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-3 ml-auto max-w-[80%]">
                        <p className="text-gray-200 text-sm">
                          Virtual memory is a memory management technique that provides an "idealized abstraction of the storage resources that are actually available on a given machine" which "creates the illusion to users of a very large (main) memory."
                        </p>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-3 ml-auto max-w-[80%]">
                        <p className="text-gray-200 text-sm">
                          The key components are:
                          <br />1. Page tables: Map virtual addresses to physical addresses
                          <br />2. TLB: Cache for page table entries
                          <br />3. Page faults: When a page isn't in physical memory
                          <br />
                          <br />Would you like me to explain any of these in more detail?
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      <input
                        type="text"
                        placeholder="Ask anything about GATE CS..."
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-md">
                        <MessageSquareText className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Study Plan Section */}
        <section 
          id="study-plan"
          ref={studyPlanRef} 
          className="py-20 bg-gray-950 opacity-0 translate-y-8 duration-1000 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-25"></div>
                  <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium text-white flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        May 2025
                      </h3>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-gray-400 text-sm font-medium">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 3;
                        const isCurrentMonth = day > 0 && day <= 31;
                        const isToday = day === 16;
                        const hasSession = [3, 7, 12, 16, 20, 24, 28].includes(day);
                        
                        return (
                          <div 
                            key={i} 
                            className={`
                              aspect-square flex flex-col items-center justify-center rounded-md text-sm
                              ${!isCurrentMonth ? 'text-gray-600' : 'text-gray-300'}
                              ${isToday ? 'bg-primary/20 text-white' : ''}
                              ${hasSession && isCurrentMonth && !isToday ? 'bg-gray-800' : ''}
                            `}
                          >
                            {isCurrentMonth && (
                              <>
                                <span>{day}</span>
                                {hasSession && (
                                  <span className="w-1 h-1 bg-primary rounded-full mt-1"></span>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="bg-gray-800 p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">Operating Systems Concepts</h4>
                            <p className="text-gray-400 text-sm">9:00 AM - 11:00 AM</p>
                          </div>
                          <div className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                            High Priority
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">Data Structures - Trees & Graphs</h4>
                            <p className="text-gray-400 text-sm">2:00 PM - 4:00 PM</p>
                          </div>
                          <div className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                            Medium Priority
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block animate-shimmer bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:400%_100%] px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-4">
                  Personalized Planning
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Smart <span className="text-primary">Study Plan</span>
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Get a personalized study schedule tailored to your learning pace, availability, and GATE syllabus.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "AI-generated study plans based on your goals",
                    "Flexible scheduling that adapts to your availability",
                    "Balanced coverage of all GATE CS topics",
                    "Priority-based task management",
                    "Sync with your calendar apps",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/study-plan">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Create Your Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quizzes Section */}
        <section 
          id="quizzes"
          ref={quizzesRef} 
          className="py-20 bg-black opacity-0 translate-y-8 duration-1000 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block animate-shimmer bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:400%_100%] px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-4">
                  Test Your Knowledge
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Adaptive <span className="text-primary">Quizzes</span>
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Challenge yourself with smart quizzes that adapt to your knowledge level and focus on your weak areas.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "AI-powered question selection based on your performance",
                    "Detailed explanations for every question",
                    "Spaced repetition to reinforce learning",
                    "Track your progress across different subjects",
                    "Practice with previous years' GATE questions",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/quizzes">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Take a Quiz
                  </Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-25"></div>
                  <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium text-white flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-2" />
                        Operating Systems Quiz
                      </h3>
                      <div className="text-gray-400 text-sm">
                        Question 3 of 10
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="text-white text-lg mb-4">
                          Which of the following page replacement algorithms suffers from Belady's anomaly?
                        </p>
                        <div className="space-y-3">
                          {[
                            "Optimal Page Replacement",
                            "Least Recently Used (LRU)",
                            "First-In-First-Out (FIFO)",
                            "Most Recently Used (MRU)",
                          ].map((option, i) => (
                            <div 
                              key={i} 
                              className={`
                                p-3 rounded-md border cursor-pointer transition-colors
                                ${i === 2 
                                  ? 'bg-primary/10 border-primary/30 text-white' 
                                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-800/80'}
                              `}
                            >
                              <div className="flex items-center">
                                <div className={`
                                  h-5 w-5 rounded-full border mr-3 flex items-center justify-center
                                  ${i === 2 
                                    ? 'border-primary bg-primary/20' 
                                    : 'border-gray-600'}
                                `}>
                                  {i === 2 && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                                </div>
                                {option}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                          Previous
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Tracking Section */}
        <section 
          id="progress"
          ref={progressRef} 
          className="py-20 bg-gray-950 opacity-0 translate-y-8 duration-1000 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur opacity-25"></div>
                  <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium text-white flex items-center">
                        <BarChart2 className="h-5 w-5 text-primary mr-2" />
                        Your Progress Dashboard
                      </h3>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-medium">Overall Progress</h4>
                          <span className="text-primary font-medium">68%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-white font-medium">Subject Progress</h4>
                        <div className="space-y-3">
                          {[
                            { name: "Operating Systems", progress: 85, color: "bg-green-500" },
                            { name: "Data Structures", progress: 72, color: "bg-blue-500" },
                            { name: "Computer Networks", progress: 64, color: "bg-yellow-500" },
                            { name: "Database Systems", progress: 58, color: "bg-orange-500" },
                            { name: "Theory of Computation", progress: 45, color: "bg-red-500" },
                          ].map((subject, i) => (
                            <div key={i} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-300">{subject.name}</span>
                                <span className="text-xs text-gray-400">{subject.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-1.5">
                                <div 
                                  className={`${subject.color} h-1.5 rounded-full`} 
                                  style={{ width: `${subject.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-center mb-2">
                            <Target className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">42</div>
                            <div className="text-sm text-gray-400">Quizzes Completed</div>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-center mb-2">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">12</div>
                            <div className="text-sm text-gray-400">Achievements Earned</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block animate-shimmer bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:400%_100%] px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-4">
                  Track Your Growth
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Detailed <span className="text-primary">Progress Tracking</span>
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Monitor your improvement with comprehensive analytics and insights to optimize your study strategy.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Visual progress tracking for all subjects",
                    "Performance analytics for quizzes and practice tests",
                    "Identify strengths and areas for improvement",
                    "Track study time and productivity",
                    "Set and monitor personal goals",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/progress">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    View Your Progress
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaRef} 
          className="py-20 relative overflow-hidden opacity-0 translate-y-8 duration-1000 ease-out"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-20"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to transform your GATE preparation?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of successful GATE aspirants who have elevated their preparation with GateSmart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex items-center justify-center">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-900"></div>
                  ))}
                </div>
                <div className="ml-4 text-left">
                  <div className="text-white font-medium">Join 10,000+ students</div>
                  <div className="text-gray-400 text-sm">Preparing for GATE with GateSmart</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}