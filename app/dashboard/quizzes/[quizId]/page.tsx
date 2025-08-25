"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Timer, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Flag, XCircle } from 'lucide-react';

interface Question {
  question_text: string;
  options: string[];
  correct_answer: number;
  marks: number;
  negative_marks: number;
  type: "MCQ";
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: string;
  questions: Question[];
  time_limit: number;
  status: string;
  score?: number;
  last_attempt?: string;
}

interface SubmissionResult {
  score: number;
  totalMarks: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export default function QuizPage() {
  const router = useRouter();
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load quiz data and attempt state
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find(row => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(`http://localhost:8000/api/quizzes/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch quiz");
        }

        const data = await response.json();
        const quizData: Quiz = {
          id: data.id,
          title: data.title,
          description: data.description,
          subject: data.subject,
          topic: data.topic,
          difficulty: data.difficulty,
          questions: data.questions.map((q: any) => ({
            ...q,
            type: "MCQ",
            correct_answer: Number(q.correct_answer),
          })),
          time_limit: data.time_limit,
          status: data.status,
          score: data.score,
          last_attempt: data.last_attempt,
        };
        setQuiz(quizData);

        const isCompleted = data.status === "completed";
        setIsSubmitted(isCompleted);

        if (isCompleted) {
          // If the quiz is completed, show the results
          setAnswers(new Array(quizData.questions.length).fill(null)); // We don't store answers in the backend
          setCurrentQuestionIndex(0);
          setTimeRemaining(0);
          setSubmissionResult({
            score: data.score || 0,
            totalMarks: quizData.questions.reduce((sum, q) => sum + q.marks, 0),
            correctAnswers: 0, // We don't store answers, so this is not tracked
            incorrectAnswers: 0,
          });
        } else {
          // Otherwise, start or resume the quiz
          setAnswers(new Array(quizData.questions.length).fill(null));
          setCurrentQuestionIndex(0);
          setTimeRemaining(quizData.time_limit * 60);

          // Start a new attempt if not completed
          if (data.status !== "in-progress") {
            await fetch(`http://localhost:8000/api/quizzes/${quizId}/attempt`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "in-progress",
                score: null,
                completed_at: null,
              }),
            });
          }
        }
      } catch (err) {
        setError("Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, router]);

  // Timer logic
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isSubmitted]);

  // Handle answer selection for MCQ
  const handleAnswerChange = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  // Move to the next question
  const handleSaveAndNext = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Submit the quiz and store results in the backend
  const handleSubmitQuiz = async () => {
    if (!quiz || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Calculate the score locally
      let score = 0;
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      const totalMarks = quiz.questions.reduce((sum, q) => sum + q.marks, 0);

      answers.forEach((answer, index) => {
        const question = quiz.questions[index];
        if (answer === null) return; // Unanswered
        if (answer === question.correct_answer) {
          score += question.marks;
          correctAnswers += 1;
        } else {
          score += question.negative_marks;
          incorrectAnswers += 1;
        }
      });

      // Convert score to percentage
      const percentageScore = (score / totalMarks) * 100;

      // Submit the attempt to the backend
      const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];

      await fetch(`http://localhost:8000/api/quizzes/${quizId}/attempt`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "completed",
          score: percentageScore,
          completed_at: new Date().toISOString(),
        }),
      });

      // Update state
      setSubmissionResult({
        score,
        totalMarks,
        correctAnswers,
        incorrectAnswers,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to submit quiz. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Navigate to a specific question via the palette
  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) return <div className="text-center mt-10">Loading quiz...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!quiz) return <div className="text-center mt-10">Quiz not found.</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4">
      {/* Header with Quiz Title and Timer */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        {!isSubmitted && (
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6" />
            <span className="text-lg">{formatTime(timeRemaining || 0)}</span>
          </div>
        )}
      </div>

      {/* Display Results After Submission */}
      {isSubmitted && submissionResult && (
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-2">
                Your Score: {submissionResult.score} / {submissionResult.totalMarks}
              </p>
              <p className="text-sm mb-2">
                Correct Answers: {submissionResult.correctAnswers}
              </p>
              <p className="text-sm mb-4">
                Incorrect Answers: {submissionResult.incorrectAnswers}
              </p>
              <Button onClick={() => router.push("/dashboard/quizzes")}>
                Back to Quizzes
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Layout: Question Area and Palette */}
      {!isSubmitted && (
        <div className="flex gap-6">
          {/* Question Area */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle>
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{currentQuestion.question_text}</p>

                {/* Question Options (MCQ Only) */}
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={index}
                        checked={answers[currentQuestionIndex] === index}
                        onChange={() => handleAnswerChange(index)}
                        disabled={isSubmitted}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/dashboard/quizzes")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Quizzes
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    {currentQuestionIndex < quiz.questions.length - 1 ? (
                      <Button onClick={handleSaveAndNext}>
                        Save & Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmitQuiz} disabled={isSubmitting}>
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Palette */}
          <div className="w-64">
            <Card>
              <CardHeader>
                <CardTitle>Question Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {quiz.questions.map((_, index) => (
                    <Button
                      key={index}
                      variant={answers[index] !== null ? "default" : "outline"}
                      className={`p-2 ${
                        currentQuestionIndex === index ? "bg-blue-500" : ""
                      }`}
                      onClick={() => handleQuestionNavigation(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/dashboard/quizzes")}
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    End Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}