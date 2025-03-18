import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface RegistrationStepProps {
  formData: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
  errors: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function RegistrationStep({ formData, errors, handleInputChange, onSubmit }: RegistrationStepProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-2 mt-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className={`${errors.username && "border-red-500"}`}
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
          className={`${errors.email && "border-red-500"}`}
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" className={`${errors.password && "border-red-500"}`} name="password" type="password" value={formData.password} onChange={handleInputChange} />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>
      <div className="space-y-2 mt-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={`${errors.confirmPassword && "border-red-500"}`}
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>
      <Button type="submit" className="w-full mt-4">
        Next
      </Button>
    </form>
  )
}

