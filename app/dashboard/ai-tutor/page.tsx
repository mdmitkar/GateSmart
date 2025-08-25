"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { BarChart, BookOpen, Calendar, Clock, FileText, Flame, GraduationCap, LayoutDashboard, MessageSquare, Settings, User, Send, Bot, Sparkles, Lightbulb, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Utility function to get cookie by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return null
}

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI tutor for GATE preparation. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Sample suggested questions
  const suggestedQuestions = [
    "Explain the OSI model in computer networks",
    "What is virtual memory in operating systems?",
    "Explain the time complexity of quicksort",
    "What are the normal forms in DBMS?",
    "Explain the concept of paging in OS"
  ]
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    try {
      // Get token from cookie
      const token = getCookie('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      // Call the backend API to get AI response
      const response = await fetch('http://localhost:8000/api/ai-tutor/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // Ensure cookies are sent with the request
        body: JSON.stringify({ query: inputValue }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }
      
      const data = await response.json()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'ai',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process your request. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }
  
  // Handle pressing Enter to send
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    // Focus the input
    document.getElementById('message-input')?.focus()
  }
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
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
              { name: "AI Tutor", icon: <MessageSquare size={20} />, href: "/dashboard/ai-tutor", current: true },
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
                { name: "Profile", icon: <User size={20} />, href: "/dashboard/profile" },
                { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
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
        <main className="flex flex-col h-screen">
          {/* Header */}
          <div className="bg-gray-900 border-b border-gray-800 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">AI Tutor</h1>
                <p className="text-sm text-gray-400">Ask any GATE-related questions</p>
              </div>
            </div>
          </div>
          
          {/* Chat container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary/20 text-white' 
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <Bot className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-primary">AI Tutor</span>
                      <span className="text-xs text-gray-500 ml-2">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">
                    {message.content}
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] md:max-w-[70%] rounded-lg p-3 bg-gray-800 text-white">
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary">AI Tutor</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested questions */}
          {messages.length < 3 && (
            <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
                Suggested Questions
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="p-4 bg-gray-900 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <Input
                id="message-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                className="flex-1 bg-gray-800 border-gray-700 text-white focus:ring-primary"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={inputValue.trim() === '' || isTyping}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span className="flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </span>
              <button className="flex items-center hover:text-gray-300 transition-colors">
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset conversation
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}