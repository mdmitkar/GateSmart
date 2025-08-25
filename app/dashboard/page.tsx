"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart, BookOpen, Calendar, Clock, FileText, Flame, GraduationCap, LayoutDashboard, MessageSquare, Settings, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [studyStreak, setStudyStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(68)
      setStudyStreak(7)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const todaysPlan = [
    { time: "09:00 AM", subject: "Digital Logic", duration: "45 mins", completed: true },
    { time: "11:30 AM", subject: "Computer Networks", duration: "60 mins", completed: true },
    { time: "03:00 PM", subject: "Operating Systems", duration: "45 mins", completed: false },
    { time: "06:30 PM", subject: "Algorithms", duration: "60 mins", completed: false },
  ]

  const upcomingQuizzes = [
    { subject: "Computer Architecture", date: "Today", difficulty: "Medium" },
    { subject: "Data Structures", date: "Tomorrow", difficulty: "Hard" },
    { subject: "Theory of Computation", date: "In 2 days", difficulty: "Medium" },
  ]

  const weakAreas = [
    { subject: "Computer Networks", score: 65 },
    { subject: "Operating Systems", score: 72 },
    { subject: "Theory of Computation", score: 58 },
  ]

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 hidden md:block">
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              <span className="text-primary">Smart</span>Study
            </span>
          </Link>
        </div>
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {[
              { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard", current: true },
              { name: "Study Plan", icon: <Calendar size={20} />, href: "/dashboard/study-plan", current: false },
              { name: "Resources", icon: <BookOpen size={20} />, href: "/dashboard/resources", current: false },
              { name: "Quizzes", icon: <FileText size={20} />, href: "/dashboard/quizzes", current: false },
              { name: "AI Tutor", icon: <MessageSquare size={20} />, href: "/dashboard/ai-tutor", current: false },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800">
            <div className="space-y-1">
              {[
                { name: "Profile", icon: <User size={20} />, href: "/dashboard/profile", current: false },
                { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings", current: false },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="mr-3 text-gray-400">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full"
              >
                <span className="mr-3 text-gray-400"><LogOut size={20} /></span>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white">
              <span className="text-primary">Gate</span>Smart
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="text-gray-300">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {/* Welcome section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, Student!</h1>
              <p className="mt-1 text-gray-400">Here's your study progress for today</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link href="/dashboard/study-plan">
                <Button className="bg-primary hover:bg-primary/90">
                  <Calendar className="mr-2 h-4 w-4" />
                  Study Plan
                </Button>
              </Link>
              <Link href="/dashboard/ai-tutor">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI Tutor
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Overall Progress</CardTitle>
                <CardDescription className="text-gray-400">Your GATE preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-white">{progress}%</span>
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-primary" />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-bl-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Study Streak</CardTitle>
                <CardDescription className="text-gray-400">Consecutive days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{studyStreak} days</span>
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div className="mt-2 flex space-x-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full ${
                        i < studyStreak ? "bg-orange-500" : "bg-gray-800"
                      }`}
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Topics Covered</CardTitle>
                <CardDescription className="text-gray-400">Out of 120 topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">78</span>
                  <BookOpen className="h-5 w-5 text-green-500" />
                </div>
                <div className="mt-2">
                  <Progress value={65} className="h-2 bg-gray-800" indicatorClassName="bg-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Study Hours</CardTitle>
                <CardDescription className="text-gray-400">This week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">24.5 hrs</span>
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {[30, 60, 45, 90, 75, 60, 45].map((height, i) => (
                    <div key={i} className="flex items-end h-10">
                      <div
                        className="w-full bg-blue-500/70 rounded-sm"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium text-gray-200">Today's Study Plan</CardTitle>
                  <CardDescription className="text-gray-400">Your scheduled sessions for today</CardDescription>
                </div>
                <Link href="/dashboard/study-plan">
                  <Button variant="ghost" className="text-primary hover:bg-gray-800">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysPlan.map((session, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{session.subject}</p>
                        <p className="text-sm text-gray-400">
                          {session.time} • {session.duration}
                        </p>
                      </div>
                      <div>
                        {session.completed ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            Completed
                          </span>
                        ) : (
                          <Link href="/dashboard/study-plan">
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Start
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Upcoming Quizzes</CardTitle>
                <CardDescription className="text-gray-400">Test your knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingQuizzes.map((quiz, i) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{quiz.subject}</h4>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            quiz.difficulty === "Hard"
                              ? "bg-red-500/20 text-red-400"
                              : quiz.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {quiz.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{quiz.date}</span>
                        <Link href="/dashboard/quizzes">
                          <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                            Prepare
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium text-gray-200">Areas to Improve</CardTitle>
                  <CardDescription className="text-gray-400">Focus on these topics</CardDescription>
                </div>
                <Link href="/dashboard/quizzes">
                  <Button variant="ghost" className="text-primary hover:bg-gray-800">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakAreas.map((area, i) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-800/50 border border-gray-800">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">{area.subject}</h4>
                        <span className="text-sm font-medium text-gray-400">{area.score}%</span>
                      </div>
                      <Progress
                        value={area.score}
                        className="h-2 bg-gray-800"
                        indicatorClassName={`${
                          area.score < 60
                            ? "bg-red-500"
                            : area.score < 75
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                      <div className="mt-2 flex justify-end">
                        <Link href="/dashboard/quizzes">
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Practice Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full"></div>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-200">AI Tutor</CardTitle>
                <CardDescription className="text-gray-400">Get instant help with your doubts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-800 mb-4">
                  <p className="text-gray-300 mb-4">
                    Having trouble with a concept? Ask our AI tutor for help anytime.
                  </p>
                  <Link href="/dashboard/ai-tutor">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask a Question
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Recent: "Explain virtual memory"</span>
                  <Link href="/dashboard/ai-tutor" className="text-primary hover:underline">
                    History
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recommended Resources</h2>
              <Link href="/dashboard/resources">
                <Button variant="ghost" className="text-primary hover:bg-gray-800">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Computer Networks Fundamentals",
                  type: "Video",
                  duration: "45 mins",
                  level: "Intermediate",
                },
                {
                  title: "Operating Systems: Memory Management",
                  type: "Article",
                  duration: "20 mins",
                  level: "Advanced",
                },
                {
                  title: "Theory of Computation: Regular Languages",
                  type: "Practice",
                  duration: "30 mins",
                  level: "Beginner",
                },
              ].map((resource, i) => (
                <Card key={i} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-white mb-1">{resource.title}</h3>
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                          <span className="mr-2">{resource.type}</span>
                          <span>•</span>
                          <span className="mx-2">{resource.duration}</span>
                          <span>•</span>
                          <span className="ml-2">{resource.level}</span>
                        </div>
                        <Link href="/dashboard/resources">
                          <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                            Start Learning
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}