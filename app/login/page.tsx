"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PasswordInput } from "@/components/password-input"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    console.log("Form submitted with:", formData)

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      console.log("Fetch response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.log("Error data:", errorData)
        throw new Error(errorData.detail || "Login failed")
      }

      const data = await response.json()
      console.log("Login successful, data:", data)

      // Store token in a cookie
      document.cookie = `token=${data.access_token}; path=/; max-age=${30 * 24 * 60 * 60}` // 30 days expiry
      console.log("Token stored in cookie:", document.cookie)

      // Force redirect with a slight delay to ensure state updates
      setTimeout(() => {
        window.location.href = "/dashboard/quizzes"
        console.log("Redirecting to /dashboard/quizzes using window.location.href")
      }, 100)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Error during login:", err.message)
        setError(err.message)
      } else {
        console.log("Error during login: Unknown error")
        setError("Login failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <Card className="card-hover bg-gray-900 border-gray-800">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-white">Welcome back</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-focus-effect bg-gray-800 border-gray-700 text-white w-full px-3 py-2 rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/90 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-focus-effect bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full button-hover bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="text-center text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:text-primary/90 font-medium transition-colors">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}