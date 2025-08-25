import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/' || 
    path === '/login' || 
    path === '/signup' || 
    path === '/features' || 
    path === '/resources' || 
    path === '/about' || 
    path === '/contact'
  
  // Check if the path starts with /dashboard
  const isProtectedPath = path.startsWith('/dashboard')
  
  // Get the token from cookies
  const token = request.cookies.get('token')?.value || ''
  
  // If trying to access a protected path without a token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // If trying to access login/signup with a token, redirect to dashboard
  if ((path === '/login' || path === '/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/features',
    '/resources',
    '/about',
    '/contact',
    '/dashboard/:path*',
  ],
}