"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function ReportPassportIssue() {
  const [issueType, setIssueType] = useState<"missing" | "delayed">()
  const [applicationNumber, setApplicationNumber] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ issueType, applicationNumber, description })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
            <p className="text-gray-600">
              Thank you for your report. We will investigate the issue and contact you soon.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Missing or Delayed Passport</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Issue Type</Label>
            <RadioGroup value={issueType} onValueChange={(value: "missing" | "delayed") => setIssueType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="missing" id="missing" />
                <Label htmlFor="missing">Missing Passport</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delayed" id="delayed" />
                <Label htmlFor="delayed">Delayed Passport</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationNumber">Application Number</Label>
            <Input
              id="applicationNumber"
              value={applicationNumber}
              onChange={(e) => setApplicationNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description of the Issue</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <Button type="submit" className="w-full">
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

