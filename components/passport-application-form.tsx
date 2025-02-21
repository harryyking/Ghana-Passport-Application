"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PassportTypeSelector, type PassportType, type ProcessingSpeed } from "./passport-type-selector"
import { DocumentRequirements } from "./document-requirements"
import { Steps } from "./steps"

export function PassportApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [passportType, setPassportType] = useState<PassportType>()
  const [processingSpeed, setProcessingSpeed] = useState<ProcessingSpeed>()
  const [documentsComplete, setDocumentsComplete] = useState(false)

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      passportType,
      processingSpeed,
      documentsComplete,
    })
  }

  return (
    <div className="space-y-6">
      <Steps steps={["Select Passport Type", "Upload Documents", "Review & Submit"]} currentStep={currentStep} />

      {currentStep === 1 && (
        <PassportTypeSelector
          selectedType={passportType}
          selectedSpeed={processingSpeed}
          onTypeSelect={setPassportType}
          onSpeedSelect={setProcessingSpeed}
        />
      )}

      {currentStep === 2 && passportType && (
        <DocumentRequirements passportType={passportType} onDocumentsComplete={setDocumentsComplete} />
      )}

      {currentStep === 3 && (
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
        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!passportType || !processingSpeed)) || (currentStep === 2 && !documentsComplete)
            }
          >
            Continue
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit Application</Button>
        )}
      </div>
    </div>
  )
}

