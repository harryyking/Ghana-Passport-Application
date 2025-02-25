"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DocumentUpload } from "@/components/document-upload"
import { Steps } from "@/components/steps"

export default function DiplomaticServicePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    ministry: "",
    appointmentLetter: null,
    diplomaticNote: "",
  })
  const router = useRouter()

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/track-applications")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <Card className="bg-purple-600 text-white">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">Diplomatic Service Application</h1>
            <p className="text-purple-100">Apply for diplomatic passport services</p>
          </CardContent>
        </Card>

        <Steps
          steps={["Personal Information", "Documents", "Verification", "Review", "Submit"]}
          currentStep={currentStep}
        />

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1
                ? "Personal Information"
                : currentStep === 2
                  ? "Required Documents"
                  : currentStep === 3
                    ? "Verification"
                    : currentStep === 4
                      ? "Review Application"
                      : "Review Application"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Diplomatic Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ministry">Ministry/Department</Label>
                    <Input
                      id="ministry"
                      value={formData.ministry}
                      onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && <DocumentUpload />}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="diplomaticNote">Diplomatic Note</Label>
                    <Textarea
                      id="diplomaticNote"
                      value={formData.diplomaticNote}
                      onChange={(e) => setFormData({ ...formData, diplomaticNote: e.target.value })}
                      placeholder="Enter any additional diplomatic notes or requirements"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Application Summary</h3>
                  <div className="grid gap-2">
                    <p>
                      <span className="font-medium">Name:</span> {formData.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Position:</span> {formData.position}
                    </p>
                    <p>
                      <span className="font-medium">Ministry:</span> {formData.ministry}
                    </p>
                    <p>
                      <span className="font-medium">Diplomatic Note:</span> {formData.diplomaticNote}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Please review your application details carefully before submitting.
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {currentStep < 5 ? (
                  <Button type="button" onClick={handleNext} className="ml-auto">
                    {currentStep === 4 ? "Confirm & Submit" : "Next"}
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    Submit Application
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

