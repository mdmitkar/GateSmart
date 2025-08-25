// app/about/page.tsx
"use client"

import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-28 hero-gradient">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About <span className="text-primary">GateSmart</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're on a mission to revolutionize GATE preparation with AI-powered learning tools.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  GateSmart was founded in 2023 by a team of GATE toppers and AI enthusiasts who recognized the challenges faced by GATE aspirants in their preparation journey.
                </p>
                <p>
                  Having experienced the struggles of GATE preparation firsthand, our founders were determined to create a solution that would make the process more efficient, personalized, and effective.
                </p>
                <p>
                  By combining advanced AI technology with proven learning methodologies, we developed GateSmart - an intelligent study companion designed specifically for GATE aspirants.
                </p>
                <p>
                  Today, GateSmart is helping thousands of students across India achieve their GATE dreams through personalized study plans, adaptive quizzes, and AI-powered doubt solving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Our Mission</h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  At GateSmart, our mission is to democratize quality GATE preparation by making it accessible, personalized, and effective for every aspirant, regardless of their background or resources.
                </p>
                <p>
                  We believe that with the right guidance and tools, every student can unlock their full potential and achieve success in the GATE examination.
                </p>
                <p>
                  Through continuous innovation and improvement, we strive to stay at the forefront of educational technology, incorporating the latest advancements in AI and learning science to provide the best possible preparation experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Rahul Sharma",
                  role: "Founder & CEO",
                  bio: "GATE 2019 AIR 15, IIT Delhi Alumnus",
                },
                {
                  name: "Priya Patel",
                  role: "CTO",
                  bio: "AI Researcher, 8+ years in EdTech",
                },
                {
                  name: "Amit Kumar",
                  role: "Head of Content",
                  bio: "GATE 2020 AIR 7, Ex-Faculty at Made Easy",
                },
              ].map((member, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-white text-center">{member.name}</h3>
                  <p className="text-primary text-center mb-2">{member.role}</p>
                  <p className="text-gray-400 text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/30 to-secondary/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your GATE Preparation?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful GATE aspirants who have elevated their preparation with GateSmart.
            </p>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}