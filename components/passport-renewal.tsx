"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DocumentRequirements } from "./document-requirements"
import { Steps } from "./steps"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

type PassportType = "standard" | "express" | "diplomatic" | "service" | "official"

export function PassportRenewal() {
  const [currentStep, setCurrentStep] = useState(1)
  const [passportNumber, setPassportNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [documentsComplete, setDocumentsComplete] = useState(false)
  const [passportType, setPassportType] = useState<PassportType>("standard")
  const router = useRouter()

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle renewal submission logic here
    console.log("Renewal submitted", { passportNumber, expiryDate, hasChanges, documentsComplete, passportType })
    setCurrentStep(5) // Move to the application status step
  }

  return (
    <div className="space-y-6">
      <Steps
        steps={[
          "Passport Information",
          "Document Requirements",
          "Upload Documents",
          "Review & Submit",
          "Application Status",
        ]}
        currentStep={currentStep}
      />

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Passport Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Current Passport Number</Label>
                <Input
                  id="passportNumber"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Passport Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <Label>Passport Type for Renewal</Label>
                <RadioGroup value={passportType} onValueChange={(value) => setPassportType(value as PassportType)}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">Express</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium mb-2">Eligible Categories:</p>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="diplomatic" id="diplomatic" />
                        <Label htmlFor="diplomatic">Diplomatic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="service" id="service" />
                        <Label htmlFor="service">Service</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="official" id="official" />
                        <Label htmlFor="official">Official</Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-500 mt-2">
                  Note: Diplomatic, Service, and Official passports are only available for eligible government officials
                  and personnel.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasChanges"
                  checked={hasChanges}
                  onCheckedChange={(checked) => setHasChanges(checked as boolean)}
                />
                <Label htmlFor="hasChanges">
                  I have significant changes to report (e.g., name change, facial features)
                </Label>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Document Requirements for Renewal</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Valid Ghana Card</li>
              <li>Current passport (even if expired)</li>
              <li>Passport-sized photographs (if significant changes)</li>
              <li>Proof of name change (if applicable)</li>
            </ul>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && <DocumentRequirements passportType="renewal" onDocumentsComplete={setDocumentsComplete} />}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Renewal Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Passport Number</h3>
                <p className="text-gray-600">{passportNumber}</p>
              </div>
              <div>
                <h3 className="font-medium">Expiry Date</h3>
                <p className="text-gray-600">{expiryDate}</p>
              </div>
              <div>
                <h3 className="font-medium">Passport Type</h3>
                <p className="text-gray-600">{passportType}</p>
              </div>
              <div>
                <h3 className="font-medium">Significant Changes</h3>
                <p className="text-gray-600">{hasChanges ? "Yes" : "No"}</p>
              </div>
              <div>
                <h3 className="font-medium">Documents Status</h3>
                <p className="text-gray-600">{documentsComplete ? "All documents uploaded" : "Documents incomplete"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Status</h3>
                <p className="text-green-600">Submitted Successfully</p>
              </div>
              <div>
                <h3 className="font-medium">Next Steps</h3>
                <p>Your application is being processed. You will be notified of any updates.</p>
              </div>
              <Button onClick={() => router.push("/dashboard")} className="w-full bg-[#006B3F]">
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        {currentStep > 1 && currentStep < 5 && (
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
        )}
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!passportNumber || !expiryDate)) || (currentStep === 3 && !documentsComplete)
            }
            className="bg-[#006B3F]"
          >
            Continue
          </Button>
        ) : currentStep === 4 ? (
          <Button onClick={handleSubmit} className="bg-[#CE1126]">
            Submit Renewal Application
          </Button>
        ) : null}
      </div>
    </div>
  )
}

