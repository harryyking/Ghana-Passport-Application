"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Send, CheckCircle } from "lucide-react"

type IssueType = "lost" | "delayed" | "damaged" | "other"

export default function ReportIssuesPage() {
  const [issueType, setIssueType] = useState<IssueType | "">("")
  const [applicationId, setApplicationId] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto p-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-[#006B3F]" />
                </div>
                <h2 className="text-2xl font-bold">Issue Reported Successfully</h2>
                <p className="text-gray-600">
                  We have received your report and will investigate the issue. Our team will contact you shortly.
                </p>
                <Button onClick={() => setSubmitted(false)} className="bg-[#006B3F]">
                  Report Another Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <Card className="bg-[#CE1126] text-white">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">Report an Issue</h1>
            <p className="text-red-100">Let us know if you're experiencing any problems</p>
          </CardContent>
        </Card>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label>Issue Type</Label>
                <RadioGroup value={issueType} onValueChange={(value: IssueType) => setIssueType(value)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="lost" id="lost" />
                      <Label htmlFor="lost" className="flex-1">
                        Lost Passport
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="delayed" id="delayed" />
                      <Label htmlFor="delayed" className="flex-1">
                        Delayed Application
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="damaged" id="damaged" />
                      <Label htmlFor="damaged" className="flex-1">
                        Damaged Passport
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="flex-1">
                        Other Issue
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationId">Application ID</Label>
                <Input
                  id="applicationId"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                  placeholder="Enter your application ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Describe the Issue</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please provide details about your issue"
                  rows={5}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  For lost or stolen passports, please also file a police report and include the report number in your
                  description.
                </p>
              </div>

              <Button type="submit" className="w-full bg-[#006B3F]">
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

