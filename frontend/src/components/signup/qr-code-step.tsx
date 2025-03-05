import type React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "../ui/skeleton"

interface QRCodeStepProps {
  qrCodeUrl: string | null
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function QRCodeStep({ qrCodeUrl, onSubmit }: QRCodeStepProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <p>Scan this QR code with your authenticator app:</p>
        {qrCodeUrl ? (
          <img src={qrCodeUrl || "/placeholder.svg"} alt="2FA QR Code" className="mx-auto" />
        ) : (
          <Skeleton className="h-[256px] w-[256px] ml-auto mr-auto"/>
        )}
      </div>
      <Button type="submit" className="w-full mt-4">
        I've scanned the QR code
      </Button>
    </form>
  )
}

