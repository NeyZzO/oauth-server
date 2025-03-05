import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CredentialsStepProps {
  formData: { identifier: string; password: string }
  errors: { identifier: string; password: string }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function CredentialsStep({ formData, errors, handleInputChange, onSubmit }: CredentialsStepProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-2  mt-2">
        <Label htmlFor="identifier">Username or Email</Label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="Username or Email"
          value={formData.identifier}
          onChange={handleInputChange}
        />
        {errors.identifier && <p className="text-sm text-red-500">{errors.identifier}</p>}
      </div>
      <div className="space-y-2 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>
      <Button type="submit" className="w-full mt-4">
        Next
      </Button>
    </form>
  )
}

