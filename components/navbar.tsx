import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-black/90 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              <span className="text-blue-500">Gate</span>Smart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/demo" className="text-gray-300 hover:text-blue-500 transition-colors flex items-center">
              Watch Demo
            </Link>
            <Link href="/features" className="text-gray-300 hover:text-blue-500 transition-colors">
              Features
            </Link>
            <Link href="/resources" className="text-gray-300 hover:text-blue-500 transition-colors">
              Resources
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-blue-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-blue-500 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md">
              Login
            </Link>
            <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/demo"
                className="text-gray-300 hover:text-blue-500 transition-colors flex items-center py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Watch Demo
              </Link>
              <Link
                href="/features"
                className="text-gray-300 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/resources"
                className="text-gray-300 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-800">
                <Link
                  href="/login"
                  className="block text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}