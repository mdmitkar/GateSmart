// ///
// "use client"

// import { createContext, useContext, useState, useEffect, ReactNode } from "react"
// import { useRouter } from "next/navigation"

// type User = {
//   id: string
//   name: string
//   email: string
// }

// type AuthContextType = {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<void>
//   signup: (name: string, email: string, password: string) => Promise<void>
//   logout: () => void
//   isAuthenticated: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   // Check if user is logged in on initial load
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // For now, just check if token exists in localStorage
//         const token = localStorage.getItem("token")
        
//         if (token) {
//           // In a real app, you'd validate the token with your backend
//           // For now, we'll just simulate a user
//           setUser({
//             id: "1",
//             name: "Test User",
//             email: "test@example.com"
//           })
//         }
//       } catch (error) {
//         console.error("Auth check failed:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     checkAuth()
//   }, [])

//   const login = async (email: string, password: string) => {
//     setIsLoading(true)
//     try {
//       // In a real app, you'd call your API here
//       // For now, we'll just simulate a successful login
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       // Store token
//       localStorage.setItem("token", "fake-jwt-token")
      
//       // Set user
//       setUser({
//         id: "1",
//         name: "Test User",
//         email: email
//       })
      
//       // Redirect to dashboard
//       router.push("/dashboard")
//     } catch (error) {
//       console.error("Login failed:", error)
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const signup = async (name: string, email: string, password: string) => {
//     setIsLoading(true)
//     try {
//       // In a real app, you'd call your API here
//       // For now, we'll just simulate a successful signup
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       // Store token
//       localStorage.setItem("token", "fake-jwt-token")
      
//       // Set user
//       setUser({
//         id: "1",
//         name: name,
//         email: email
//       })
      
//       // Redirect to dashboard
//       router.push("/dashboard")
//     } catch (error) {
//       console.error("Signup failed:", error)
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const logout = () => {
//     // Remove token
//     localStorage.removeItem("token")
    
//     // Clear user
//     setUser(null)
    
//     // Redirect to home
//     router.push("/")
//   }

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       isLoading, 
//       login, 
//       signup, 
//       logout,
//       isAuthenticated: !!user
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
// ///