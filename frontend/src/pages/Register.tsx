"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router";
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Discord from "@/components/svgs/Discord";
import Google from "@/components/svgs/Google";

type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

type FormErrors = {
  [K in keyof FormData]: string
}

export default function SignUpForm() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const location = useLocation();

  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (isDarkMode) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "username":
        return value ? "" : "Username is required"
      case "email":
        return value ? (/\S+@\S+\.\S+/.test(value) ? "" : "Email is invalid") : "Email is required"
      case "password":
        return value ? (value.length >= 8 ? "" : "Password must be at least 8 characters") : "Password is required"
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match"
      default:
        return ""
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormData, value) }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = {
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).every((error) => error === "")) {
      // Form is valid, you can submit it here
      console.log("Form is valid", formData)
    }
  }

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-border bg-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              <CardDescription>Choose your preferred sign-up method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
                  <Discord />
                  Sign up with Discord
                </Button>
                <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-300">
                  <Google />
                  Sign up with Google
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name" className="mt-2">Username</Label>
                  <Input
                    id="name"
                    name="username"
                    type="text"
                    placeholder="John Doe"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2 mt-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
                <Button type="submit" className="w-full mt-4">
                  Sign Up
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <span className="text-muted-foreground text-sm">Already have an account? </span>
            <Link to={{pathname: "/login", search:location.search}} className="text-primary hover:underline text-sm font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


