"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}