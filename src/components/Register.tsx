"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (password !== confirmPassword) {
//       // Handle password mismatch (e.g., show error message)
//       console.error("Passwords do not match")
//       return
//     }
//     try {
//       await register(email, password)
//       router.push("/dashboard")
//     } catch (error) {
//       console.error("Registration failed:", error)
//       // Handle registration error (e.g., show error message)
//     }
//   }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <form >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Name</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </CardContent>
      </form>
      <CardFooter>
        <p className="text-sm text-center w-full">
          Already have an account? <Link href="login" className="text-blue-500 hover:underline">Login here</Link>
        </p>
      </CardFooter>
    </Card>
  )
}