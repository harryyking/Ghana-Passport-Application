"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, AlertTriangle, Upload } from "lucide-react"

export default function VerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()
    setVerificationStatus("processing")
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus("success")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document Upload and Verification */}
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerification} className="space-y-4">
                <div>
                  <Label htmlFor="ghana-card">Ghana Card Number</Label>
                  <Input id="ghana-card" placeholder="GHA-0123456789" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Birth Certificate</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">Upload PDF or Image</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Passport Photo</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">Upload Photo</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={verificationStatus === "processing"}>
                  {verificationStatus === "processing" ? "Verifying..." : "Verify Documents"}
                </Button>

                {verificationStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>All documents verified successfully</span>
                  </div>
                )}

                {verificationStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    <span>Verification failed. Please check the documents.</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Verification Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Document Requirements</h3>
                    <ul className="text-sm text-gray-600 list-disc pl-4">
                      <li>Birth certificate must be certified copy</li>
                      <li>Passport photo must be recent (less than 6 months)</li>
                      <li>Photos must be 35mm x 45mm</li>
                      <li>White background for photos</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Verification Process</h3>
                    <ul className="text-sm text-gray-600 list-disc pl-4">
                      <li>Check document authenticity</li>
                      <li>Verify Ghana Card details</li>
                      <li>Compare photo with Ghana Card</li>
                      <li>Validate personal information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

