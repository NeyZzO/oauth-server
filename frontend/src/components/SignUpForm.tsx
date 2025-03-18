import type React from "react"
import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router"
import api from "../lib/api"
import { FormWrapper } from "./form-wrapper"
import { RegistrationStep } from "./signup/registration-step"
import { QRCodeStep } from "./signup/qr-code-step"
import { TwoFactorStep } from "./login/two-factor-step"
import { SocialLoginButtons } from "./SocialLoginButtons"
import type { AxiosResponse } from "axios"
import { toast } from "sonner"

type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
  twoFactorCode: string
}

type FormErrors = {
  [K in keyof FormData]: string
}

export default function SignUpForm() {
  const location = useLocation();
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    twoFactorCode: "",
  })
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    twoFactorCode: "",
  })
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

  useEffect(() => {
    // Check the current signup state from the server
    const checkSignupState = async () => {
      try {
        const response = await api.get("/signup-state")
        if (response.data.step) {
          setStep(response.data.step)
          if (response.data.qrCodeUrl) {
            setQrCodeUrl(response.data.qrCodeUrl)
          }
        }
      } catch (error) {
        console.error("Error checking signup state:", error)
      }
    }

    checkSignupState()
  }, [])

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
      case "twoFactorCode":
        return value.length === 6 ? "" : "2FA code must be 6 digits"
      default:
        return ""
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormData, value) }))
  }

  const handleOTPChange = (value: string) => {
    setFormData((prev) => ({ ...prev, twoFactorCode: value }))
    setErrors((prev) => ({ ...prev, twoFactorCode: validateField("twoFactorCode", value) }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData);
    // TODO: Registration process (It was shitty)
    if (step == 1) {
      try {
        const data: AxiosResponse = await api.post(`/register${location.search}`, JSON.stringify(formData), {
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log(data); // ! For debug purposes, remove later
        
        if (data.status == 201) {
          return setStep(2);
        }
      } catch (err: unknown) {
        console.error(err);
        toast("Error", {description: "An unexpected error occurred (maybe the server is unreachable ?). Contact your system admin.", position: "top-left", duration: 6000})
      }
    }
  }

  return (
    <FormWrapper
      title="Sign Up"
      description={step === 1 ? "Create your account" : step === 2 ? "Set up 2FA" : "Verify 2FA"}
    >
      {step === 1 && <SocialLoginButtons />}
      {step === 1 ? (
        <RegistrationStep
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      ) : step === 2 ? (
        <QRCodeStep qrCodeUrl={qrCodeUrl} onSubmit={handleSubmit} />
      ) : (
        <TwoFactorStep
          twoFactorCode={formData.twoFactorCode}
          error={errors.twoFactorCode}
          handleOTPChange={handleOTPChange}
          onSubmit={handleSubmit}
        />
      )}
      <div className="text-center mt-4">
        <span className="text-muted-foreground text-sm">Already have an account? </span>
        <Link to={{pathname: "/login", search: location.search}} className="text-primary hover:underline text-sm font-medium">
          Login
        </Link>
      </div>
    </FormWrapper>
  )
}

