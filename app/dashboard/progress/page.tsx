"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart, BookOpen, Calendar, FileText, LayoutDashboard, MessageSquare, Settings, User, Clock, Award, TrendingUp, CheckCircle, Target, ChevronDown, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("month")
  
  // Mock data for charts and stats
  const subjectProgress = [
    { name: "Computer Networks", progress: 75, color: "bg-blue-500" },
    { name: "Operating Systems", progress: 60, color: "bg-purple-500" },
    { name: "Data Structures", progress: 85, color: "bg-green-500" },
    { name: "Algorithms", progress: 70, color: "bg-yellow-500" },
    { name: "Database Systems", progress: 45, color: "bg-red-500" },
    { name: "Computer Architecture", progress: 30, color: "bg-indigo-500" },
    { name: "Theory of Computation", progress: 20, color: "bg-pink-500" },
  ]
  
  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.0 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 4.0 },
    { day: "Sun", hours: 2.7 },
  ]
  
  const maxHours = Math.max(...weeklyActivity.map(day => day.hours))
  
  const recentAchievements = [
    { id: 1, title: "5-Day Streak", description: "Studied for 5 consecutive days", date: "2 days ago", icon: <Award className="h-5 w-5 text-yellow-400" /> },
    { id: 2, title: "Quiz Master", description: "Scored 90% on Computer Networks quiz", date: "1 week ago", icon: <CheckCircle className="h-5 w-5 text-green-400" /> },
    { id: 3, title: "Study Goal Reached", description: "Completed 20 hours of study this week", date: "1 week ago", icon: <Target className="h-5 w-5 text-blue-400" /> },
  ]
  
  const weakTopics = [
    { id: 1, name: "B-Trees", subject: "Data Structures", score: 40 },
    { id: 2, name: "Virtual Memory", subject: "Operating Systems", score: 35 },
    { id: 3, name: "TCP/IP Protocol", subject: "Computer Networks", score: 45 },
  ]

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
              { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard", current: false },
              { name: "Study Plan", icon: <Calendar size={20} />, href: "/dashboard/study-plan", current: false },
              { name: "Resources", icon: <BookOpen size={20} />, href: "/dashboard/resources", current: false },
              { name: "Quizzes", icon: <FileText size={20} />, href: "/dashboard/quizzes", current: false },
              { name: "AI Tutor", icon: <MessageSquare size={20} />, href: "/dashboard/ai-tutor", current: false },
              { name: "Progress", icon: <BarChart size={20} />, href: "/dashboard/progress", current: true },
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
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white">
              <span className="text-primary">Smart</span>Study
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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Progress Tracking</h1>
              <p className="mt-1 text-gray-400">Monitor your study progress and identify areas for improvement</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Study Hours */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">Total Study Hours</h3>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">42.5</span>
                    <span className="text-sm text-gray-400 ml-1">hrs</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-400">↑ 12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quizzes Completed */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">Quizzes Completed</h3>
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">18</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-400">↑ 8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Score */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">Average Score</h3>
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Award className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">76%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-400">↑ 5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Streak */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">Current Streak</h3>
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-red-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">5</span>
                    <span className="text-sm text-gray-400 ml-1">days</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-400">Best: 12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Subject Progress */}
            <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Subject Progress</CardTitle>
                <CardDescription className="text-gray-400">Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectProgress.map((subject, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-white">{subject.name}</h4>
                        <span className="text-xs text-gray-400">{subject.progress}%</span>
                      </div>
                      <Progress 
                        value={subject.progress} 
                        className="h-2 bg-gray-800" 
                        indicatorClassName={subject.color}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Weekly Activity</CardTitle>
                <CardDescription className="text-gray-400">Hours studied per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-40 mt-4 mb-2">
                  {weeklyActivity.map((day, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-primary/80 rounded-t-sm" 
                        style={{ height: `${(day.hours / maxHours) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                  <div>
                    <span className="text-sm text-gray-400">Total this week</span>
                    <div className="text-xl font-bold text-white">
                      {weeklyActivity.reduce((sum, day) => sum + day.hours, 0).toFixed(1)} hrs
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-green-400">↑ 15% vs last week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Achievements */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Recent Achievements</CardTitle>
                <CardDescription className="text-gray-400">Your latest study milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                          {achievement.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-gray-700 text-gray-300 hover:bg-gray-800">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-200">Areas for Improvement</CardTitle>
                <CardDescription className="text-gray-400">Topics that need more attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakTopics.map((topic) => (
                    <div key={topic.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium text-white">{topic.name}</h4>
                          <p className="text-xs text-gray-400">{topic.subject}</p>
                        </div>
                        <span className="text-xs text-red-400">{topic.score}%</span>
                      </div>
                      <Progress 
                        value={topic.score} 
                        className="h-2 bg-gray-800" 
                        indicatorClassName="bg-red-500"
                      />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                  Generate Study Plan for Weak Areas
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}