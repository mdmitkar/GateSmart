"use client"

import { useState } from "react"
import Link from "next/link"
import { HelpCircle, Search, ChevronDown, ChevronUp, ArrowLeft, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // FAQ data
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I create a study plan?",
      answer: "To create a study plan, navigate to the Study Plan page from your dashboard. Click on the 'Add Study Session' button and fill in the details like subject, topic, date, and time. You can view your study plan in day, week, or month view.",
      category: "Study Plan"
    },
    {
      id: 2,
      question: "Can I track my progress?",
      answer: "Yes, you can track your progress on the Progress page. It shows your study hours, quiz scores, and subject-wise progress. You can also see your weak areas and get recommendations for improvement.",
      category: "Progress Tracking"
    },
    {
      id: 3,
      question: "How does the AI Tutor work?",
      answer: "The AI Tutor uses advanced natural language processing to answer your GATE-related questions. Simply type your question in the chat interface, and the AI will provide a detailed answer. You can ask about concepts, solve problems, or get explanations for topics you find difficult.",
      category: "AI Tutor"
    },
    {
      id: 4,
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot password?' link on the login page. Enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      category: "Account"
    },
    {
      id: 5,
      question: "Can I download study materials for offline use?",
      answer: "Yes, many resources in our library can be downloaded for offline use. Look for the download icon on the resource card. Downloaded materials will be available in your device's storage.",
      category: "Resources"
    },
    {
      id: 6,
      question: "How are quiz scores calculated?",
      answer: "Quiz scores are calculated as the percentage of correct answers. For example, if you answer 8 out of 10 questions correctly, your score will be 80%. Some quizzes may have weighted questions, where difficult questions carry more points.",
      category: "Quizzes"
    },
    {
      id: 7,
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your data is encrypted and stored securely. We do not share your personal information with third parties. You can manage your privacy settings in the Settings page.",
      category: "Account"
    },
    {
      id: 8,
      question: "How do I contact support?",
      answer: "You can contact our support team by clicking on the 'Contact' link in the footer or by sending an email to support@smartstudy.com. We typically respond within 24 hours.",
      category: "General"
    },
    {
      id: 9,
      question: "Can I use SmartStudy on mobile devices?",
      answer: "Yes, SmartStudy is fully responsive and works on all devices including smartphones and tablets. You can access all features on mobile, just like on desktop.",
      category: "General"
    },
    {
      id: 10,
      question: "How do I delete my account?",
      answer: "To delete your account, go to Settings > Privacy & Data and click on the 'Delete Account' button. Please note that this action is irreversible and will permanently delete all your data.",
      category: "Account"
    },
  ]

  // Get all unique categories
  const categories = Array.from(new Set(faqItems.map(item => item.category)))

  // Filter FAQ items based on search query and active category
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === null || item.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Toggle FAQ item expansion
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-primary mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">Help Center</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to frequently asked questions about SmartStudy
            </p>

            {/* Search */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
              className={activeCategory === null ? "bg-primary hover:bg-primary/90" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-primary hover:bg-primary/90" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ items */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-4 text-left"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <span className="font-medium text-white">{item.question}</span>
                    </div>
                    {expandedId === item.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {expandedId === item.id && (
                    <div className="p-4 pt-0 pl-12 text-gray-300 border-t border-gray-800">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  We couldn&apos;t find any FAQs matching your search. Try using different keywords or browse by category.
                </p>
                <Button
                  className="mt-4 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory(null)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Contact support */}
          <div className="mt-16 bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Still need help?</h2>
            <p className="text-gray-400 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </main >

      <Footer />
    </div >
  )
}