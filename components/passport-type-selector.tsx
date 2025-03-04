"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type PassportType = "STANDARD" | "DIPLOMATIC" | "SERVICE" | "OFFICIAL" | "REPLACEMENT"
export type ProcessingSpeed = "STANDARD" | "EXPEDITED" | "PRIORITY"

interface PassportTypeOption {
  id: PassportType
  title: string
  description: string
  basePrice: number
  eligibleForPriority: boolean
  processingTimes: {
    standard: string
    expedited?: string
    priority?: string
  }
  requiredDocuments: string[]
}

const passportTypes: PassportTypeOption[] = [
  {
    id: "STANDARD",
    title: "Standard Passport",
    description: "For regular citizens traveling internationally",
    basePrice: 100,
    eligibleForPriority: false,
    processingTimes: {
      standard: "4-6 weeks",
      expedited: "2-3 weeks",
    },
    requiredDocuments: ["Ghana Card", "Passport Photo", "Proof of Payment"],
  },
  {
    id: "DIPLOMATIC",
    title: "Diplomatic Passport",
    description: "For high-ranking government officials and diplomats",
    basePrice: 500,
    eligibleForPriority: true,
    processingTimes: {
      standard: "2-3 weeks",
      priority: "1 week",
    },
    requiredDocuments: ["Appointment Letter", "Official Government ID", "Ministry Endorsement"],
  },
  {
    id: "SERVICE",
    title: "Service Passport",
    description: "For government employees on official duties",
    basePrice: 400,
    eligibleForPriority: true,
    processingTimes: {
      standard: "2-3 weeks",
      priority: "1 week",
    },
    requiredDocuments: ["Employment Verification", "Official Letter from Government Department"],
  },
  {
    id: "OFFICIAL",
    title: "Official Passport",
    description: "For government representatives on state business",
    basePrice: 400,
    eligibleForPriority: true,
    processingTimes: {
      standard: "2-3 weeks",
      priority: "1 week",
    },
    requiredDocuments: ["Authorization Letter", "Employment Proof", "Government ID"],
  },
  {
    id: "REPLACEMENT",
    title: "Replacement Passport",
    description: "For lost or damaged passports",
    basePrice: 200,
    eligibleForPriority: false,
    processingTimes: {
      standard: "4-6 weeks",
      expedited: "2-3 weeks",
    },
    requiredDocuments: [
      "Police Report (if lost)",
      "Damaged Passport (if applicable)",
      "Affidavit",
      "Proof of Identity",
    ],
  },
]

interface PassportTypeSelectorProps {
  onTypeSelect: (type: PassportType) => void
  onSpeedSelect: (speed: ProcessingSpeed) => void
  selectedType?: PassportType
  selectedSpeed?: ProcessingSpeed
}

export function PassportTypeSelector({
  onTypeSelect,
  onSpeedSelect,
  selectedType,
  selectedSpeed,
}: PassportTypeSelectorProps) {
  const [showPriorityOption, setShowPriorityOption] = useState(false)

  const handleTypeChange = (type: PassportType) => {
    onTypeSelect(type)
    const passportType = passportTypes.find((t) => t.id === type)
    setShowPriorityOption(passportType?.eligibleForPriority || false)

    // Reset processing speed when changing type
    if (!passportType?.eligibleForPriority && selectedSpeed === "PRIORITY") {
      onSpeedSelect("STANDARD")
    }
  }

  const calculateTotalPrice = (type: PassportType, speed: ProcessingSpeed) => {
    const basePrice = passportTypes.find((t) => t.id === type)?.basePrice || 0
    const speedMultiplier = {
      STANDARD: 1,
      EXPEDITED: 2,
      PRIORITY: 3,
    }
    return basePrice * speedMultiplier[speed]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Passport Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Label className="text-base font-semibold">Service Type</Label>
          <RadioGroup onValueChange={(value: PassportType) => handleTypeChange(value)} value={selectedType}>
            <div className="grid gap-4">
              {passportTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={type.id} className="text-base font-semibold">
                      {type.title} - GHS {type.basePrice}
                    </Label>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {type.requiredDocuments.map((doc, index) => (
                        <Badge key={index} variant="secondary">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-5 w-5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Base Price: GH₵{type.basePrice}</p>
                        <p>Processing Times:</p>
                        <ul className="list-disc pl-4">
                          {Object.entries(type.processingTimes).map(([speed, time]) => (
                            <li key={speed}>
                              {speed.charAt(0).toUpperCase() + speed.slice(1)}: {time}
                            </li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </RadioGroup>

          {selectedType && (
            <div className="mt-6">
              <Label className="text-base font-semibold">Processing Speed</Label>
              <RadioGroup
                onValueChange={(value: ProcessingSpeed) => onSpeedSelect(value)}
                value={selectedSpeed}
                className="mt-2"
              >
                <div className="grid gap-4">
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <div className="flex-1">
                      <Label htmlFor="standard">Standard Processing</Label>
                      <p className="text-sm text-muted-foreground">Regular processing time with standard fee</p>
                    </div>
                    <Badge variant="secondary">GH₵{calculateTotalPrice(selectedType, "STANDARD")}</Badge>
                  </div>

                  {!showPriorityOption && (
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <RadioGroupItem value="expedited" id="expedited" />
                      <div className="flex-1">
                        <Label htmlFor="expedited">Expedited Processing</Label>
                        <p className="text-sm text-muted-foreground">Faster processing time with additional fee</p>
                      </div>
                      <Badge variant="secondary">GH₵{calculateTotalPrice(selectedType, "EXPEDITED")}</Badge>
                    </div>
                  )}

                  {showPriorityOption && (
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <RadioGroupItem value="priority" id="priority" />
                      <div className="flex-1">
                        <Label htmlFor="priority">Priority Processing</Label>
                        <p className="text-sm text-muted-foreground">
                          Fastest processing time for eligible government officials
                        </p>
                      </div>
                      <Badge variant="secondary">GH₵{calculateTotalPrice(selectedType, "PRIORITY")}</Badge>
                    </div>
                  )}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

