"use client";

import { ExternalLink, Play, Smartphone, Monitor, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 hero-gradient">
          {/* Background animated elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-60 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block animate-shimmer bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:400%_100%] px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-4">
                Watch Our App in Action
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                <span className="text-primary">Gate</span>Smart Demo
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of learning with our AI-powered study management platform. 
                See how students can create quizzes, get AI tutoring, and track their progress seamlessly.
              </p>
            </div>

            {/* Demo Video Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="card-hover bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
                <div className="text-6xl mb-6">🎬</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Full App Demo Video
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Watch our comprehensive 4-minute demo showcasing all the amazing features of Smart Study App.
                  Perfect for understanding how the platform works and what it can do for your studies.
                </p>
                
                {/* Main Demo Link */}
                <div className="mb-8">
                  <a
                    href="https://drive.google.com/file/d/1mggQGttAUcYDUxwlGc14Gl5mwxJ2NA7X/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 text-xl group transform hover:translate-y-[-2px]"
                  >
                    <Play size={24} className="mr-3" />
                    Watch Full Demo on Google Drive
                    <ExternalLink size={20} className="ml-3" />
                  </a>
                </div>

                {/* Video Info */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    📱 Demo Video Details
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
                    <div className="flex items-center justify-center">
                      <Smartphone size={16} className="mr-2 text-primary" />
                      Mobile Optimized
                    </div>
                    <div className="flex items-center justify-center">
                      <Monitor size={16} className="mr-2 text-primary" />
                      HD Quality
                    </div>
                    <div className="flex items-center justify-center">
                      <Globe size={16} className="mr-2 text-primary" />
                      Accessible Anywhere
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
              <div className="feature-card card-hover bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <div className="text-2xl">🤖</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Tutoring</h3>
                <p className="text-gray-400">Get instant help with your studies using advanced AI models</p>
              </div>
              
              <div className="feature-card card-hover bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <div className="text-2xl">📊</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Analytics</h3>
                <p className="text-gray-400">Track your progress with detailed insights and performance metrics</p>
              </div>
              
              <div className="feature-card card-hover bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <div className="text-2xl">🎯</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Personalized Learning</h3>
                <p className="text-gray-400">Custom study plans and adaptive quiz recommendations</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Ready to Experience Smart Learning?
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Join thousands of students who are already using Smart Study App to ace their exams!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button className="button-hover bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group transition-all duration-300 transform hover:translate-y-[-2px]">
                      Get Started for Free
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="button-hover border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg transition-all duration-300"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
