"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PassportTypeSelector, type PassportType, type ProcessingSpeed } from "./passport-type-selector"
import { DocumentRequirements } from "./document-requirements"
import { Steps } from "./steps"
import { RequirementSlider } from "./requirement-slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { createApplication } from "@/lib/actions"

export function PassportApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [passportType, setPassportType] = useState<PassportType>()
  const [processingSpeed, setProcessingSpeed] = useState<ProcessingSpeed>()
  const [documentsComplete, setDocumentsComplete] = useState(false)
  const [formData, setFormData] = useState({
    passportType: "",
    otherNames: "",
    processingSpeed: "",
    isEmergencyRequest: false,
  })

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await createApplication({
      userId: "current-user-id", // This will come from session
      applicationType: formData.passportType as PassportType,
      processingSpeed: formData.processingSpeed as ProcessingSpeed,
      isRenewal: false,
      emergencyRequest: formData.isEmergencyRequest,
    })

    if (result.success) {
      // Navigate to next step or show success message
      // onSubmit() // onSubmit is not defined, removing it.
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setPassportType(value as PassportType)
  }

  return (
    <div className="space-y-6">
      <Steps
        steps={["Select Passport Type", "Document Requirements", "Upload Documents", "Review & Submit"]}
        currentStep={currentStep}
      />

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Passport Type and Processing Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label>Passport Type</Label>
              <RadioGroup
                onValueChange={(value) => handleRadioChange("passportType", value)}
                value={formData.passportType}
              >
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
            <div className="space-y-2 mt-4">
              <Label htmlFor="otherNames">Other Names (if any)</Label>
              <Input
                id="otherNames"
                value={formData.otherNames || ""}
                onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
                placeholder="Enter any other names"
              />
            </div>
            <PassportTypeSelector
              selectedType={passportType}
              selectedSpeed={processingSpeed}
              onTypeSelect={setPassportType}
              onSpeedSelect={setProcessingSpeed}
            />
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Document Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <RequirementSlider />
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && passportType && (
        <DocumentRequirements passportType={passportType} onDocumentsComplete={setDocumentsComplete} />
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Selected Passport Type</h3>
                <p className="text-gray-600">{passportType}</p>
              </div>
              <div>
                <h3 className="font-medium">Processing Speed</h3>
                <p className="text-gray-600">{processingSpeed}</p>
              </div>
              <div>
                <h3 className="font-medium">Documents Status</h3>
                <p className="text-gray-600">{documentsComplete ? "All documents uploaded" : "Documents incomplete"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        {currentStep > 1 && (
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
        )}
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!passportType || !processingSpeed)) || (currentStep === 3 && !documentsComplete)
            }
            className="bg-[#006B3F]"
          >
            Continue
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-[#CE1126]">
            Submit Application
          </Button>
        )}
      </div>
    </div>
  )
}

