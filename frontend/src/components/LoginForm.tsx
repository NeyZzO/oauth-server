"use client"

import type React from "react"
import { useState } from "react"
import { useLocation, Link } from "react-router"
import api from "../lib/api"
import { FormWrapper } from "./form-wrapper"
import { CredentialsStep } from "./login/credentials-step"
import { SocialLoginButtons } from "./SocialLoginButtons"

type FormData = {
  identifier: string
  password: string
}

type FormErrors = {
  [K in keyof FormData]: string
}

export default function LoginForm() {
    const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    identifier: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({
    identifier: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormData, value) }))
  }

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "identifier":
        return value ? "" : "Username or Email is required"
      case "password":
        return value ? "" : "Password is required"
      default:
        return ""
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await api.post("/login", formData)
      // Redirect to the URL provided by the backend
      window.location.href = response.data.redirectUrl
    } catch (error) {
      console.error("Login error:", error)
      setErrors((prev) => ({ ...prev, password: "Invalid credentials" }))
    }
  }

  return (
    <FormWrapper title="Login" description="Enter your credentials">
      <SocialLoginButtons />
      <CredentialsStep
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <div className="text-center mt-4">
        <span className="text-muted-foreground text-sm">Don't have an account? </span>
        <Link to={{pathname: "/signup", search: location.search}} className="text-primary hover:underline text-sm font-medium">
          Sign up
        </Link>
      </div>
    </FormWrapper>
  )
}

