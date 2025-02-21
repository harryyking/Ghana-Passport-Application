"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Fingerprint, QrCode, Key } from "lucide-react"

export function DeliveryVerification() {
  const [verificationMethod, setVerificationMethod] = useState<"biometric" | "otp" | "qr" | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "failure" | null>(null)

  const handleVerification = () => {
    // Simulating verification process
    setVerificationStatus("pending")
    setTimeout(() => {
      setVerificationStatus(Math.random() > 0.2 ? "success" : "failure")
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure Delivery Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button
              variant={verificationMethod === "biometric" ? "default" : "outline"}
              onClick={() => setVerificationMethod("biometric")}
            >
              <Fingerprint className="mr-2 h-4 w-4" />
              Biometric
            </Button>
            <Button
              variant={verificationMethod === "otp" ? "default" : "outline"}
              onClick={() => setVerificationMethod("otp")}
            >
              <Key className="mr-2 h-4 w-4" />
              OTP
            </Button>
            <Button
              variant={verificationMethod === "qr" ? "default" : "outline"}
              onClick={() => setVerificationMethod("qr")}
            >
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </Button>
          </div>

          {verificationMethod === "biometric" && <p>Please use the biometric scanner to verify your identity.</p>}

          {verificationMethod === "otp" && (
            <div className="space-y-2">
              <Input placeholder="Enter OTP sent to your phone" />
              <Button onClick={handleVerification}>Verify OTP</Button>
            </div>
          )}

          {verificationMethod === "qr" && <p>Please scan the QR code on your passport with the official app.</p>}

          {verificationStatus === "pending" && <p className="text-yellow-600">Verifying...</p>}

          {verificationStatus === "success" && (
            <p className="text-green-600">Verification successful. You can now collect your passport.</p>
          )}

          {verificationStatus === "failure" && (
            <p className="text-red-600">Verification failed. Please try again or contact support.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

