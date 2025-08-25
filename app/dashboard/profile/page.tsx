"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart, BookOpen, Calendar, FileText, LayoutDashboard, MessageSquare, Settings, User, Mail, Lock, Edit2, Camera, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    bio: "GATE aspirant focusing on Computer Science. Currently studying Data Structures and Algorithms.",
    joinedDate: "January 2023"
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    console.log("Profile saved:", userData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

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
              { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard", current: false },
              { name: "Study Plan", icon: <Calendar size={20} />, href: "/dashboard/study-plan", current: false },
              { name: "Resources", icon: <BookOpen size={20} />, href: "/dashboard/resources", current: false },
              { name: "Quizzes", icon: <FileText size={20} />, href: "/dashboard/quizzes", current: false },
              { name: "AI Tutor", icon: <MessageSquare size={20} />, href: "/dashboard/ai-tutor", current: false },
              // { name: "Progress", icon: <BarChart size={20} />, href: "/dashboard/progress", current: false },
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
                { name: "Profile", icon: <User size={20} />, href: "/dashboard/profile", current: true },
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
          {/* Sarcastic Disclaimer */}
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-center text-yellow-400">
            Behold, a Profile page! It’s a stunning dummy—zero functionality, but it’ll wake up... someday.
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <p className="mt-1 text-gray-400">Manage your account information and settings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800 lg:col-span-1">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    <User className="h-16 w-16 text-gray-600" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{userData.name}</h2>
                <p className="text-gray-400 mb-4">@{userData.username}</p>
                <div className="w-full space-y-2 mb-6">
                  <div className="flex items-center text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
              <CardHeader>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="bg-gray-800 text-gray-400">
                    <TabsTrigger value="account" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                      Account
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                      Preferences
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="account" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-white">Account Information</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setIsEditing(!isEditing)}
                          className="text-primary hover:text-primary/90 hover:bg-gray-800"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          {isEditing ? "Cancel" : "Edit"}
                        </Button>
                      </div>
                      
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={userData.name}
                              onChange={handleChange}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username" className="text-gray-300">Username</Label>
                            <Input
                              id="username"
                              name="username"
                              value={userData.username}
                              onChange={handleChange}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={userData.email}
                              onChange={handleChange}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                            <textarea
                              id="bio"
                              name="bio"
                              rows={4}
                              value={userData.bio}
                              onChange={handleChange}
                              className="w-full rounded-md bg-gray-800 border border-gray-700 text-white p-2"
                            />
                          </div>
                          <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-gray-400">Full Name</h4>
                            <p className="text-white">{userData.name}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-gray-400">Username</h4>
                            <p className="text-white">@{userData.username}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-gray-400">Email</h4>
                            <p className="text-white">{userData.email}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-gray-400">Bio</h4>
                            <p className="text-white">{userData.bio}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="pt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">
                          <Lock className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="preferences" className="pt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Study Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                            <p className="text-sm text-gray-400">Receive emails about your study schedule</p>
                          </div>
                          <div className="h-6 w-11 rounded-full bg-gray-700 flex items-center p-1 cursor-pointer">
                            <div className="h-4 w-4 rounded-full bg-white transform translate-x-5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-white">Study Reminders</h4>
                            <p className="text-sm text-gray-400">Get notifications before scheduled study sessions</p>
                          </div>
                          <div className="h-6 w-11 rounded-full bg-primary flex items-center p-1 cursor-pointer">
                            <div className="h-4 w-4 rounded-full bg-white transform translate-x-5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-white">Weekly Progress Report</h4>
                            <p className="text-sm text-gray-400">Receive a weekly summary of your study progress</p>
                          </div>
                          <div className="h-6 w-11 rounded-full bg-primary flex items-center p-1 cursor-pointer">
                            <div className="h-4 w-4 rounded-full bg-white transform translate-x-5"></div>
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}