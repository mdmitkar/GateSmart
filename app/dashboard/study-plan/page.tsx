"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart, BookOpen, Calendar, Clock, FileText, LayoutDashboard, MessageSquare, Settings, User, LogOut, Plus, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface StudyTopic {
  id: string;
  title: string;
  subject: string;
  estimated_hours: number;
  actual_hours: number;
  status: "not-started" | "in-progress" | "completed";
  last_studied: string | null;
  next_revision: string | null;
}

interface StudySession {
  id: string;
  topic_id: string | null;
  title: string;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  comprehension_level: number | null;
}

export default function StudyPlanPage() {
  const router = useRouter();
  const [studyTopics, setStudyTopics] = useState<StudyTopic[]>([]);
  const [isAddTopicDialogOpen, setIsAddTopicDialogOpen] = useState(false);
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic | null>(null);
  const [newTopic, setNewTopic] = useState({
    title: "",
    subject: "",
    estimated_hours: 1,
  });
  const [newSession, setNewSession] = useState({
    title: "Study Session",
    date: new Date().toISOString().split('T')[0],
    start_time: "09:00:00",
    end_time: "10:00:00",
    comprehension_level: 3,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state for session submission

  // Function to format dates nicely
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  // Fetch study topics on mount
  useEffect(() => {
    const fetchStudyTopics = async () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/study-plan/topics', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch study topics');
        const data = await response.json();
        setStudyTopics(data);
      } catch (error) {
        console.error('Error fetching study topics:', error);
        alert("Failed to fetch study topics. Please try again."); // Use alert instead of toast
      }
    };

    fetchStudyTopics();
  }, [router]);

  const handleAddTopic = async () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/study-plan/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newTopic),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add study topic');
      }
      const newStudyTopic = await response.json();
      setStudyTopics([...studyTopics, newStudyTopic]);
      setNewTopic({ title: "", subject: "", estimated_hours: 1 });
      setIsAddTopicDialogOpen(false);
      alert("Study topic added successfully!"); // Use alert instead of toast
    } catch (error) {
      console.error('Error adding study topic:', error);
      alert(error.message || "Failed to add study topic. Please try again."); // Use alert instead of toast
    }
  };

  const handleAddSession = async () => {
    if (!selectedTopic) {
      alert("Please select a topic before logging a session."); // Use alert instead of toast
      return;
    }

    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      router.push('/login');
      return;
    }

    setIsSubmitting(true); // Set loading state

    try {
      const response = await fetch(`http://localhost:8000/api/study-plan/sessions?topic_id=${selectedTopic.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newSession),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add study session");
      }

      const responseData = await response.json();

      // Extract session and updated topic from response
      const newSessionData = responseData.session;
      const updatedTopicData = responseData.topic;

      // Update the study topic locally
      const updatedTopics = studyTopics.map((topic) => {
        if (topic.id === selectedTopic.id && updatedTopicData) {
          return {
            ...topic,
            actual_hours: updatedTopicData.actual_hours,
            status: updatedTopicData.status,
            last_studied: updatedTopicData.last_studied,
            next_revision: updatedTopicData.next_revision,
          };
        }
        return topic;
      });

      setStudyTopics(updatedTopics);
      setNewSession({
        title: "Study Session",
        date: new Date().toISOString().split("T")[0],
        start_time: "09:00:00",
        end_time: "10:00:00",
        comprehension_level: 3,
      });
      // Keep the dialog open and show a success message
      alert("Study session logged successfully!"); // Use alert instead of toast
    } catch (error) {
      console.error("Error adding study session:", error);
      alert(error.message || "Failed to log study session. Please try again."); // Use alert instead of toast
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const calculateDuration = (start_time: string, end_time: string): number => {
    const start = new Date(`1970-01-01T${start_time}Z`);
    const end = new Date(`1970-01-01T${end_time}Z`);
    let diff = (end.getTime() - start.getTime()) / 1000 / 60;
    if (diff < 0) diff += 24 * 60; // Handle next-day end time
    return diff;
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

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
              { name: "Study Plan", icon: <Calendar size={20} />, href: "/dashboard/study-plan", current: true },
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

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Study Plan</h1>
            <p className="text-gray-400">Plan your studies with AI-powered revision suggestions</p>
          </div>

          {/* Add New Topic Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Study Topics</h2>
            <Dialog open={isAddTopicDialogOpen} onOpenChange={setIsAddTopicDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Topic
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Study Topic</DialogTitle>
                  <DialogDescription className="text-gray-400">Add a topic to study</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-300">Topic Title</Label>
                    <Input
                      id="title"
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., Arrays in Programming"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                    <Select
                      value={newTopic.subject}
                      onValueChange={(value) => setNewTopic({ ...newTopic, subject: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="Discrete Mathematics">Discrete Mathematics</SelectItem>
                        <SelectItem value="Linear Algebra">Linear Algebra</SelectItem>
                        <SelectItem value="Calculus">Calculus</SelectItem>
                        <SelectItem value="Probability and Statistics">Probability and Statistics</SelectItem>
                        <SelectItem value="Programming and Data Structures">Programming and Data Structures</SelectItem>
                        <SelectItem value="Algorithms">Algorithms</SelectItem>
                        <SelectItem value="Theory of Computation">Theory of Computation</SelectItem>
                        <SelectItem value="Compiler Design">Compiler Design</SelectItem>
                        <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                        <SelectItem value="Databases">Databases</SelectItem>
                        <SelectItem value="Computer Networks">Computer Networks</SelectItem>
                        <SelectItem value="Digital Logic">Digital Logic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hours" className="text-gray-300">Estimated Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      value={newTopic.estimated_hours}
                      onChange={(e) => setNewTopic({ ...newTopic, estimated_hours: parseInt(e.target.value) || 1 })}
                      className="bg-gray-700 border-gray-600 text-white"
                      min="1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={handleAddTopic} className="bg-primary hover:bg-primary/90 w-full">
                    Add Topic
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Study Topics List */}
          <div className="grid gap-6">
            {studyTopics.map((topic) => (
              <Card key={topic.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2">{topic.title}</CardTitle>
                      <div className="text-sm text-gray-400">{topic.subject}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      topic.status === "completed" ? "bg-green-500/20 text-green-400" :
                      topic.status === "in-progress" ? "bg-blue-500/20 text-blue-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {topic.status.replace("-", " ")}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Study Progress</span>
                        <span className="text-white">{topic.actual_hours.toFixed(1)}h / {topic.estimated_hours}h</span>
                      </div>
                      <Progress value={(topic.actual_hours / topic.estimated_hours) * 100} className="h-2" />
                    </div>
                    <div className="text-sm text-gray-400 flex items-center">
                      Next Revision: {formatDate(topic.next_revision)}{" "}
                      {topic.next_revision && (
                        <span className="ml-2 text-xs text-primary">(AI-powered)</span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog
                    open={isAddSessionDialogOpen && selectedTopic?.id === topic.id}
                    onOpenChange={(open) => {
                      setIsAddSessionDialogOpen(open);
                      if (!open) setSelectedTopic(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Log Study Session
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">Log Study Session for {selectedTopic?.title}</DialogTitle>
                        <DialogDescription className="text-gray-400">Record your study time for this topic</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="date" className="text-gray-300">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newSession.date}
                            onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="start_time" className="text-gray-300">Start Time</Label>
                            <Input
                              id="start_time"
                              type="time"
                              value={newSession.start_time.split(':').slice(0, 2).join(':')}
                              onChange={(e) => {
                                const time = e.target.value; // e.g., "09:00"
                                setNewSession({ ...newSession, start_time: `${time}:00` }); // Convert to "09:00:00"
                              }}
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="end_time" className="text-gray-300">End Time</Label>
                            <Input
                              id="end_time"
                              type="time"
                              value={newSession.end_time.split(':').slice(0, 2).join(':')}
                              onChange={(e) => {
                                const time = e.target.value; // e.g., "10:00"
                                setNewSession({ ...newSession, end_time: `${time}:00` }); // Convert to "10:00:00"
                              }}
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="comprehension" className="text-gray-300">Comprehension Level (1-5)</Label>
                          <Select
                            value={newSession.comprehension_level.toString()}
                            onValueChange={(value) => setNewSession({ ...newSession, comprehension_level: parseInt(value) })}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Basic</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={handleAddSession}
                          className="bg-primary hover:bg-primary/90 w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Logging..." : "Log Session"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
            {studyTopics.length === 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No study topics yet</h3>
                  <p className="text-gray-400 mb-4">Add a topic to start planning your studies!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}