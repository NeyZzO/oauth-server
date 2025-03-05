import type React from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"

interface TwoFactorStepProps {
  twoFactorCode: string
  error: string
  handleOTPChange: (value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function TwoFactorStep({ twoFactorCode, error, handleOTPChange, onSubmit }: TwoFactorStepProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-2 d-flex">
        <Label htmlFor="twoFactorCode">2FA Code</Label>
        <div className="place-content-center w-fit mr-auto ml-auto">
          <InputOTP maxLength={6} value={twoFactorCode} onChange={handleOTPChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button type="submit" className="w-full mt-4">
        Submit
      </Button>
    </form>
  )
}

