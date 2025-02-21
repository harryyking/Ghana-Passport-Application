"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Fingerprint, Camera, CheckCircle } from "lucide-react"

interface BiometricVerificationProps {
  isRenewal?: boolean
}

export function BiometricVerification({ isRenewal = false }: BiometricVerificationProps) {
  const [fingerprintCaptured, setFingerprintCaptured] = useState(false)
  const [facialRecognitionComplete, setFacialRecognitionComplete] = useState(false)

  const captureFingerprint = () => {
    // In a real application, this would interface with a fingerprint scanner
    console.log("Capturing fingerprint...")
    setTimeout(() => {
      setFingerprintCaptured(true)
    }, 2000)
  }

  const captureFacialRecognition = () => {
    // In a real application, this would interface with a camera
    console.log("Capturing facial recognition...")
    setTimeout(() => {
      setFacialRecognitionComplete(true)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isRenewal ? "Renewal Biometric Verification" : "Biometric Verification"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isRenewal && (
          <p className="text-sm text-gray-600 mb-4">
            Biometric verification is required for renewals with significant changes. If no changes are reported, your
            previous biometric data may be used.
          </p>
        )}
        <div>
          <Button
            onClick={captureFingerprint}
            disabled={fingerprintCaptured}
            className="w-full"
            aria-label="Capture Fingerprint"
          >
            {fingerprintCaptured ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Fingerprint Captured
              </>
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                Capture Fingerprint
              </>
            )}
          </Button>
        </div>
        <div>
          <Button
            onClick={captureFacialRecognition}
            disabled={facialRecognitionComplete}
            className="w-full"
            aria-label="Capture Facial Recognition"
          >
            {facialRecognitionComplete ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Facial Recognition Complete
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Capture Facial Recognition
              </>
            )}
          </Button>
        </div>
        {fingerprintCaptured && facialRecognitionComplete && (
          <p className="text-green-600 font-semibold text-center">Biometric verification complete!</p>
        )}
      </CardContent>
    </Card>
  )
}

