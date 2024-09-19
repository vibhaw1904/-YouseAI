"use client"
import { useState,FormEvent, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { register } from "@/app/actions/register"


export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const[error,setError]=useState("")
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    
    const r = await register({
        email: email,
        password: password,
        name: name    
      });
      ref.current?.reset();
      if(r?.error){
        setError(r.error);
        return;
      } else {
        return router.push("login");
      }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <form action={handleSubmit} ref={ref} >
      {error && <div className="">{error}</div>}

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