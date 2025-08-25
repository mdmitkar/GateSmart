"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart, BookOpen, Calendar, FileText, LayoutDashboard, MessageSquare, Settings, User, Bell, Moon, Sun, Globe, Shield, Clock, Save, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState("dark")
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    studyReminders: true,
    quizReminders: true,
    achievementAlerts: true,
    weeklyReports: true
  })
  const [studyPreferences, setStudyPreferences] = useState({
    defaultStudyDuration: "60",
    breakReminders: true,
    breakInterval: "25",
    autoStartNextSession: false
  })
  const [privacySettings, setPrivacySettings] = useState({
    shareProgress: false,
    showOnlineStatus: true,
    allowDataCollection: true
  })

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }

  const handleStudyPrefChange = (setting: string, value: string | boolean) => {
    setStudyPreferences(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }))
  }

  const saveSettings = () => {
    console.log("Settings saved:", {
      theme,
      notificationSettings,
      studyPreferences,
      privacySettings
    })
    alert("Settings saved successfully!")
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
              <span className="text-primary">Gate</span>Smart
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
                { name: "Profile", icon: <User size={20} />, href: "/dashboard/profile", current: false },
                { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings", current: true },
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
          {/* Sarcastic Disclaimer */}
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md text-center text-yellow-400">
            Wow, a Settings page! Too bad it’s just a fancy mock-up—functionality TBD, stay tuned... or don’t.
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="mt-1 text-gray-400">Customize your app experience</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Save All Settings
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Sun className="h-5 w-5 text-yellow-400 mr-2" />
                  <CardTitle className="text-lg font-medium text-gray-200">Appearance</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Customize how the app looks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white">Theme</h3>
                      <p className="text-xs text-gray-400">Choose between light and dark mode</p>
                    </div>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="h-4 w-4 text-yellow-400 mr-2" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="h-4 w-4 text-blue-400 mr-2" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 text-gray-400 mr-2" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-lg font-medium text-gray-200">Notifications</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="text-sm font-medium text-white">Email Notifications</Label>
                      <p className="text-xs text-gray-400">Receive important updates via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="study-reminders" className="text-sm font-medium text-white">Study Reminders</Label>
                      <p className="text-xs text-gray-400">Get notified before scheduled study sessions</p>
                    </div>
                    <Switch
                      id="study-reminders"
                      checked={notificationSettings.studyReminders}
                      onCheckedChange={() => handleNotificationToggle('studyReminders')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="quiz-reminders" className="text-sm font-medium text-white">Quiz Reminders</Label>
                      <p className="text-xs text-gray-400">Get notified about upcoming quizzes</p>
                    </div>
                    <Switch
                      id="quiz-reminders"
                      checked={notificationSettings.quizReminders}
                      onCheckedChange={() => handleNotificationToggle('quizReminders')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="achievement-alerts" className="text-sm font-medium text-white">Achievement Alerts</Label>
                      <p className="text-xs text-gray-400">Get notified when you earn achievements</p>
                    </div>
                    <Switch
                      id="achievement-alerts"
                      checked={notificationSettings.achievementAlerts}
                      onCheckedChange={() => handleNotificationToggle('achievementAlerts')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-reports" className="text-sm font-medium text-white">Weekly Progress Reports</Label>
                      <p className="text-xs text-gray-400">Receive a weekly summary of your study progress</p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={() => handleNotificationToggle('weeklyReports')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-400 mr-2" />
                  <CardTitle className="text-lg font-medium text-gray-200">Study Preferences</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Customize your study experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="default-duration" className="text-sm font-medium text-white">Default Study Duration</Label>
                      <p className="text-xs text-gray-400">Set the default length for study sessions</p>
                    </div>
                    <Select 
                      value={studyPreferences.defaultStudyDuration} 
                      onValueChange={(value) => handleStudyPrefChange('defaultStudyDuration', value)}
                    >
                      <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="break-reminders" className="text-sm font-medium text-white">Break Reminders</Label>
                      <p className="text-xs text-gray-400">Get reminded to take breaks during long study sessions</p>
                    </div>
                    <Switch
                      id="break-reminders"
                      checked={studyPreferences.breakReminders}
                      onCheckedChange={() => handleStudyPrefChange('breakReminders', !studyPreferences.breakReminders)}
                    />
                  </div>
                  {studyPreferences.breakReminders && (
                    <div className="flex items-center justify-between pl-6">
                      <div>
                        <Label htmlFor="break-interval" className="text-sm font-medium text-white">Break Interval</Label>
                        <p className="text-xs text-gray-400">How often to take breaks</p>
                      </div>
                      <Select 
                        value={studyPreferences.breakInterval} 
                        onValueChange={(value) => handleStudyPrefChange('breakInterval', value)}
                      >
                        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="25">Every 25 minutes</SelectItem>
                          <SelectItem value="30">Every 30 minutes</SelectItem>
                          <SelectItem value="45">Every 45 minutes</SelectItem>
                          <SelectItem value="60">Every 60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-start" className="text-sm font-medium text-white">Auto-start Next Session</Label>
                      <p className="text-xs text-gray-400">Automatically start the next scheduled session</p>
                    </div>
                    <Switch
                      id="auto-start"
                      checked={studyPreferences.autoStartNextSession}
                      onCheckedChange={() => handleStudyPrefChange('autoStartNextSession', !studyPreferences.autoStartNextSession)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-red-400 mr-2" />
                  <CardTitle className="text-lg font-medium text-gray-200">Privacy & Data</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Manage your privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="share-progress" className="text-sm font-medium text-white">Share Progress</Label>
                      <p className="text-xs text-gray-400">Allow others to see your study progress</p>
                    </div>
                    <Switch
                      id="share-progress"
                      checked={privacySettings.shareProgress}
                      onCheckedChange={() => handlePrivacyToggle('shareProgress')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="online-status" className="text-sm font-medium text-white">Show Online Status</Label>
                      <p className="text-xs text-gray-400">Let others see when you're online</p>
                    </div>
                    <Switch
                      id="online-status"
                      checked={privacySettings.showOnlineStatus}
                      onCheckedChange={() => handlePrivacyToggle('showOnlineStatus')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-collection" className="text-sm font-medium text-white">Allow Data Collection</Label>
                      <p className="text-xs text-gray-400">Help us improve by allowing anonymous usage data collection</p>
                    </div>
                    <Switch
                      id="data-collection"
                      checked={privacySettings.allowDataCollection}
                      onCheckedChange={() => handlePrivacyToggle('allowDataCollection')}
                    />
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-800">
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                      Delete Account
                    </Button>
                    <p className="text-xs text-gray-400 mt-2">
                      This will permanently delete your account and all associated data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}