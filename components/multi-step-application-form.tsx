"use client"

import type React from "react"

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
  fullName: string
  paymentMethod: string
  momoProvider: string
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
    fullName: "",
    paymentMethod: "",
    momoProvider: "",
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

  const currentStep = step

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>{isRenewal ? "Passport Renewal" : "Passport Application"}</span>
          <span className="text-sm font-normal">
            Step {currentStep} of {totalSteps}
          </span>
        </CardTitle>
        <Progress value={progress} className="h-1" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Form steps content */}
          <div className="grid gap-6">
            {currentStep === 1 && (
              <div className="grid gap-4">
                <div className="bg-gradient-to-r from-[#CE1126] to-[#006B3F] p-0.5 rounded-xl">
                  <div className="bg-white p-4 rounded-xl">
                    <Label className="text-sm font-medium mb-2 block">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="border-0 bg-gray-50 h-12"
                      required
                    />
                  </div>
                </div>
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
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
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
              </div>
            )}

            {currentStep === 2 && (
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
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
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

            {currentStep === 4 && <DocumentUpload />}

            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                    value={formData.paymentMethod}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo">Mobile Money</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="visa" id="visa" />
                        <Label htmlFor="visa">Visa Card</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="paytm" id="paytm" />
                        <Label htmlFor="paytm">PayTM</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem value="flutterwave" id="flutterwave" />
                        <Label htmlFor="flutterwave">FlutterWave</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                {formData.paymentMethod === "momo" && (
                  <div className="space-y-2">
                    <Label htmlFor="momoProvider">Mobile Money Provider</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("momoProvider", value)}
                      value={formData.momoProvider}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                        <SelectItem value="airteltigo">AirtelTigo Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <PaymentProcessing isRenewal={isRenewal} />
              </div>
            )}

            {currentStep === 6 && <BiometricVerification isRenewal={isRenewal} />}

            {currentStep === 7 && (
              <PickupLocationSelection
                selectedLocation={formData.pickupLocation}
                onLocationSelect={(location) => handleSelectChange("pickupLocation", location)}
              />
            )}

            {currentStep === 8 && (
              <AppointmentScheduling
                selectedDate={formData.appointmentDate}
                selectedTime={formData.appointmentTime}
                onDateSelect={(date) => handleSelectChange("appointmentDate", date)}
                onTimeSelect={(time) => handleSelectChange("appointmentTime", time)}
              />
            )}
          </div>

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button onClick={handlePreviousStep} variant="outline" className="w-32">
                Previous
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button onClick={handleNextStep} className="w-32 bg-[#CE1126] hover:bg-[#CE1126]/90 ml-auto">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="w-32 bg-[#006B3F] hover:bg-[#006B3F]/90 ml-auto">
                Submit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

