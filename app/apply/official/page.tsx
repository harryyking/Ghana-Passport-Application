"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DocumentUpload } from "@/components/document-upload"
import { Steps } from "@/components/steps"

export default function OfficialServicePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    department: "",
    serviceType: "",
    purposeOfTravel: "",
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
        <Card className="bg-green-600 text-white">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">Official Service Application</h1>
            <p className="text-green-100">Apply for official passport services</p>
          </CardContent>
        </Card>

        <Steps
          steps={["Personal Information", "Service Details", "Documents", "Review", "Submit"]}
          currentStep={currentStep}
        />

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1
                ? "Personal Information"
                : currentStep === 2
                  ? "Service Details"
                  : currentStep === 3
                    ? "Required Documents"
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
                    <Label htmlFor="position">Official Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department/Agency</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="government">Government Service</SelectItem>
                        <SelectItem value="military">Military Service</SelectItem>
                        <SelectItem value="civil">Civil Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purposeOfTravel">Purpose of Travel</Label>
                    <Input
                      id="purposeOfTravel"
                      value={formData.purposeOfTravel}
                      onChange={(e) => setFormData({ ...formData, purposeOfTravel: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && <DocumentUpload />}

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
                      <span className="font-medium">Department:</span> {formData.department}
                    </p>
                    <p>
                      <span className="font-medium">Service Type:</span> {formData.serviceType}
                    </p>
                    <p>
                      <span className="font-medium">Purpose of Travel:</span> {formData.purposeOfTravel}
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

