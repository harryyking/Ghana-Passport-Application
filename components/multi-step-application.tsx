"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DocumentUpload } from "./document-upload"
import { BiometricVerification } from "./biometric-verification"
import { PaymentProcessing } from "./payment-processing"
import { PickupLocationSelection } from "./pickup-location-selection"
import { AppointmentScheduling } from "./appointment-scheduling"

interface FormData {
  passportType: string
  firstName: string
  lastName: string
  dateOfBirth: string
  placeOfBirth: string
  address: string
  occupation: string
  emergencyContact: string
  isEmergencyRequest: boolean
  language: string
  pickupLocation: string
  appointmentDate: string
  appointmentTime: string
}

interface MultiStepApplicationFormProps {
  onSubmit: () => void
  isRenewal?: boolean
}

export function MultiStepApplicationForm({ onSubmit, isRenewal = false }: MultiStepApplicationFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    passportType: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    address: "",
    occupation: "",
    emergencyContact: "",
    isEmergencyRequest: false,
    language: "en",
    pickupLocation: "",
    appointmentDate: "",
    appointmentTime: "",
  })

  const totalSteps = 8
  const progress = (step / totalSteps) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value === "true" }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1)
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {isRenewal ? "Passport Renewal" : "Passport Application"} - Step {step} of {totalSteps}
        </CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label>Passport Type</Label>
                <RadioGroup
                  onValueChange={(value) => handleRadioChange("passportType", value)}
                  value={formData.passportType}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select onValueChange={(value) => handleSelectChange("language", value)} value={formData.language}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tw">Twi</SelectItem>
                    <SelectItem value="ew">Ewe</SelectItem>
                    <SelectItem value="ga">Ga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  id="placeOfBirth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Current Address</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Emergency Passport Request</Label>
                <RadioGroup
                  onValueChange={(value) => handleRadioChange("isEmergencyRequest", value)}
                  value={formData.isEmergencyRequest.toString()}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="emergency-yes" />
                    <Label htmlFor="emergency-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="emergency-no" />
                    <Label htmlFor="emergency-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {step === 4 && <DocumentUpload />}

          {step === 5 && <PaymentProcessing isRenewal={isRenewal} />}

          {step === 6 && <BiometricVerification isRenewal={isRenewal} />}

          {step === 7 && (
            <PickupLocationSelection
              selectedLocation={formData.pickupLocation}
              onLocationSelect={(location) => handleSelectChange("pickupLocation", location)}
            />
          )}

          {step === 8 && (
            <AppointmentScheduling
              selectedDate={formData.appointmentDate}
              selectedTime={formData.appointmentTime}
              onDateSelect={(date) => handleSelectChange("appointmentDate", date)}
              onTimeSelect={(time) => handleSelectChange("appointmentTime", time)}
            />
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" onClick={handlePreviousStep} variant="outline">
                Previous
              </Button>
            )}
            {step < totalSteps ? (
              <Button type="button" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit}>
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

