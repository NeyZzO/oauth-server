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
  email: string
  password: string
}

type FormErrors = {
  [K in keyof FormData]: string
}

export default function LoginForm() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
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
      case "email":
        return value ? (/\S+@\S+\.\S+/.test(value) ? "" : "Email is invalid") : "Email is required"
      case "password":
        return value ? "" : "Password is required"
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
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
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
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>Choose your preferred login method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white cursor-pointer">
                  <Discord />
                  Login with Discord
                </Button>
                <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 cursor-pointer">
                  <Google />
                  Login with Google
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="px-0 h-auto font-normal text-xs">
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <Button type="submit" className="w-full mt-4 cursor-pointer">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <span className="text-muted-foreground text-sm">Don&apos;t have an account? </span>
            <Link to={{pathname: "/signup", search: location.search}} className="text-primary hover:underline text-sm font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

