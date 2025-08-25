import Link from "next/link"

export default function Navbar() {
  return (
    <header className="bg-black/90 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              <span className="text-blue-500">Gate</span>Smart
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/features" className="text-gray-300 hover:text-blue-500 transition-colors">
              Features
            </a>
            <a href="/resources" className="text-gray-300 hover:text-blue-500 transition-colors">
              Resources
            </a>
            <a href="/about" className="text-gray-300 hover:text-blue-500 transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-300 hover:text-blue-500 transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md">
              Login
            </a>
            <a href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}