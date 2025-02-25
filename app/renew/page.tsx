"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/header"
import { DocumentUpload } from "@/components/document-upload"
import { PaymentProcessing } from "@/components/payment-processing"
import { BiometricVerification } from "@/components/biometric-verification"

export default function RenewalPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    passportNumber: "",
    expiryDate: "",
    address: "",
    phone: "",
    email: "",
    hasChanges: false,
  })
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, hasChanges: checked }))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit the renewal application
    console.log("Renewal application submitted:", formData)
    router.push("/dashboard")
  }

  if (!isLoggedIn || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Passport Renewal Application</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleNextStep()
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Current Passport Number</Label>
                  <Input
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Passport Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Current Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasChanges" checked={formData.hasChanges} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="hasChanges">
                    I have significant changes to report (e.g., name change, facial features)
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Next
                </Button>
              </form>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <DocumentUpload />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                  <Button onClick={handleNextStep}>Next</Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <PaymentProcessing />
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                  <Button onClick={handleNextStep}>Next</Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                {formData.hasChanges && <BiometricVerification />}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                  <Button onClick={handleSubmit}>Submit Renewal Application</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

