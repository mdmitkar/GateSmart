// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { CheckCircle2, XCircle } from 'lucide-react'
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"

// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle signup logic here
//     console.log("Signup attempt with:", formData)
//   }

//   // Password validation
//   const passwordLength = formData.password.length >= 8
//   const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ""

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-gradient">
//         <div className="w-full max-w-md space-y-8 animate-fade-in">
//           <Card className="card-hover bg-gray-900 border-gray-800">
//             <CardHeader className="space-y-1">
//               <CardTitle className="text-2xl font-bold text-center text-white">Create an account</CardTitle>
//               <CardDescription className="text-center text-gray-400">
//                 Enter your details to create your SmartStudy account
//               </CardDescription>
//             </CardHeader>

//             <form onSubmit={handleSubmit}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="name" className="block text-gray-300">
//                     Full Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="John Doe"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="email" className="block text-gray-300">
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="name@example.com"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="password" className="block text-gray-300">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="••••••••"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                   <div className="flex items-center text-sm text-gray-400 gap-1">
//                     {passwordLength ? (
//                       <CheckCircle2 className="h-4 w-4 text-green-500" />
//                     ) : (
//                       <XCircle className="h-4 w-4 text-red-500" />
//                     )}
//                     <span>At least 8 characters</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="confirmPassword" className="block text-gray-300">
//                     Confirm Password
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                   {formData.confirmPassword && (
//                     <div className="flex items-center text-sm text-gray-400 gap-1">
//                       {passwordsMatch ? (
//                         <CheckCircle2 className="h-4 w-4 text-green-500" />
//                       ) : (
//                         <XCircle className="h-4 w-4 text-red-500" />
//                       )}
//                       <span>Passwords {passwordsMatch ? "match" : "don't match"}</span>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>

//               <CardFooter className="flex flex-col space-y-4">
//                 <button
//                   type="submit"
//                   className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
//                   disabled={!passwordLength || !passwordsMatch}
//                 >
//                   Create account
//                 </button>

//                 <div className="text-center text-sm text-gray-400">
//                   Already have an account?{" "}
//                   <Link href="/login" className="text-primary hover:text-primary/90 font-medium transition-colors">
//                     Sign in
//                   </Link>
//                 </div>
//               </CardFooter>
//             </form>
//           </Card>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }