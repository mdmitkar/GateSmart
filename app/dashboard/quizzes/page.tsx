"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart, BookOpen, Calendar, Clock, FileText, GraduationCap, LayoutDashboard, MessageSquare, Settings, User, CheckCircle, AlertCircle, ChevronRight, Timer, ArrowRight, Repeat, LogOut, RefreshCcw, Sparkles, Quote } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Quiz = {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionsCount: number;
  timeLimit: string;
  lastAttempt?: string;
  score?: number;
  totalMarks?: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

type QuizCategory = {
  name: string;
  quizzes: Quiz[];
}

export default function QuizzesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'completed'>('all');
  const [quizCategories, setQuizCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    const token = getTokenFromCookies();
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/quizzes/", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch quizzes");
        }

        const quizzes: any[] = await response.json();
        const formattedQuizzes: Quiz[] = quizzes.map(quiz => {
          const totalMarks = quiz.questions?.reduce((sum: number, q: any) => sum + q.marks, 0) || 0;
          
          return {
            id: quiz.id,
            title: quiz.title,
            subject: quiz.subject || "Unknown Subject",
            topic: quiz.topic || "Unknown Topic",
            difficulty: quiz.difficulty || "medium",
            questionsCount: quiz.questions?.length || 0,
            timeLimit: quiz.time_limit ? `${quiz.time_limit} mins` : "No limit",
            lastAttempt: quiz.last_attempt ? new Date(quiz.last_attempt).toLocaleDateString() : undefined,
            score: quiz.score,
            totalMarks: totalMarks,
            status: quiz.status || "not-started",
          };
        });

        const categories: QuizCategory[] = [
          {
            name: "Full-Length Mock Tests",
            quizzes: formattedQuizzes.filter(quiz => quiz.topic === "Full-Length Mock"),
          },
          {
            name: "In Progress",
            quizzes: formattedQuizzes.filter(quiz => quiz.status === "in-progress"),
          },
          {
            name: "Recently Completed",
            quizzes: formattedQuizzes.filter(quiz => quiz.status === "completed"),
          },
          {
            name: "Subject-wise Quizzes",
            quizzes: formattedQuizzes.filter(quiz => quiz.topic !== "Full-Length Mock" && quiz.status === "not-started"),
          },
        ];

        setQuizCategories(categories);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again later.");
        setQuizCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [router]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  const filteredCategories = quizCategories.filter(category => {
    if (activeTab === 'all') return category.quizzes.length > 0;
    if (activeTab === 'completed' && category.name === 'Recently Completed') return category.quizzes.length > 0;
    return false;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'hard':
        return 'bg-red-500/20 text-red-400 font-bold text-sm';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string, score?: number) => {
    switch (status) {
      case 'completed':
        return score && score >= 70
          ? <CheckCircle className="h-5 w-5 text-green-400" />
          : <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-400" />;
      default:
        return <ChevronRight className="h-5 w-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Loading quizzes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
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
              { name: "Quizzes", icon: <FileText size={20} />, href: "/dashboard/quizzes", current: true },
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

      <div className="md:pl-64">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Quizzes & Practice Tests</h1>
              <p className="mt-1 text-gray-400">Test your knowledge and track your progress</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center bg-blue-500/20 text-blue-400 px-4 py-2 rounded">
                <RefreshCcw className="mr-2 h-4 w-4" />
                <span>Mock tests refresh every Friday or Saturday</span>
              </div>
              <div className="flex items-center bg-purple-500/20 text-purple-400 px-4 py-2 rounded">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>All the best for your test! 🎉</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-200">Quizzes Completed</h3>
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold text-white">{quizCategories.find(cat => cat.name === "Recently Completed")?.quizzes.length || 0}</span>
                    <span className="text-sm text-gray-400 ml-2">/ {quizCategories.flatMap(cat => cat.quizzes).length}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-green-400">+{quizCategories.find(cat => cat.name === "Recently Completed")?.quizzes.length || 0} this week</span>
                  </div>
                </div>
                <Progress
                  value={(quizCategories.find(cat => cat.name === "Recently Completed")?.quizzes.length || 0) / (quizCategories.flatMap(cat => cat.quizzes).length || 1) * 100}
                  className="h-2 mt-4 bg-gray-800"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-200">Average Score</h3>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold text-white">
                      {quizCategories.find(cat => cat.name === "Recently Completed")?.quizzes.length
                        ? Math.round(
                            quizCategories.find(cat => cat.name === "Recently Completed")!.quizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0) /
                            quizCategories.find(cat => cat.name === "Recently Completed")!.quizzes.length
                          )
                        : 0}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-green-400">↑ 5% from last month</span>
                  </div>
                </div>
                <Progress
                  value={
                    quizCategories.find(cat => cat.name === "Recently Completed")?.quizzes.length
                      ? quizCategories.find(cat => cat.name === "Recently Completed")!.quizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0) /
                        quizCategories.find(cat => cat.name === "Recently Completed")!.quizzes.length
                      : 0
                  }
                  className="h-2 mt-4 bg-gray-800"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-200">Motivational Quote</h3>
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Quote className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-300 italic">
                      "Success is the sum of small efforts, repeated day in and day out."
                    </p>
                    <p className="text-xs text-gray-400 mt-2">— Robert Collier</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex border-b border-gray-800 mb-6">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'all'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Quizzes
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'completed'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>

          {error && (
            <div className="mb-6 text-center text-red-400">
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-8">
            {filteredCategories.length === 0 && !error ? (
              <p className="text-center text-gray-400">No quizzes available.</p>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">{category.name}</h2>
                    {category.quizzes.length > 3 && (
                      <Button variant="ghost" className="text-primary hover:bg-gray-800">
                        View All
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.quizzes.map((quiz) => (
                      <Card
                        key={quiz.id}
                        className={`relative bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:border-gray-600 transition-colors shadow-lg ${
                          quiz.status === 'in-progress' ? 'border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                              {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                            </span>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-blue-400 mr-1" />
                              <span className="text-xs text-gray-300">{quiz.questionsCount} questions</span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg text-white mb-1">{quiz.title}</h3>
                          <p className="text-sm text-gray-300 mb-3">{quiz.subject} <span className="text-gray-500">•</span> {quiz.topic}</p>
                          <div className="flex items-center text-sm text-gray-300 mb-4">
                            <Timer className="h-4 w-4 text-purple-400 mr-1" />
                            <span>{quiz.timeLimit}</span>
                          </div>

                          {quiz.status === 'completed' && quiz.score !== undefined && (
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-400">Score</span>
                                <span className="text-sm font-medium text-white">{Math.round(quiz.score)}%</span>
                              </div>
                              <Progress
                                value={quiz.score}
                                className="h-2 bg-gray-700"
                              />
                            </div>
                          )}

                          {quiz.status === 'in-progress' && (
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-400">Progress</span>
                                <span className="text-sm font-medium text-white">60%</span>
                              </div>
                              <Progress value={60} className="h-2 bg-gray-700" />
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            {quiz.lastAttempt && (
                              <span className="text-xs text-gray-500">Last attempt: {quiz.lastAttempt}</span>
                            )}
                            <Link href={`/dashboard/quizzes/${quiz.id}`}>
                              <Button
                                className={`ml-auto ${
                                  quiz.status === 'completed'
                                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                                    : quiz.status === 'in-progress'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-primary hover:bg-primary/90'
                                }`}
                              >
                                {quiz.status === 'completed'
                                  ? <><Repeat className="mr-2 h-4 w-4" /> Retake</>
                                  : quiz.status === 'in-progress'
                                  ? <><Clock className="mr-2 h-4 w-4" /> Continue</>
                                  : <><ArrowRight className="mr-2 h-4 w-4" /> Start Quiz</>}
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}