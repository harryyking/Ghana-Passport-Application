"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ComplaintManagement() {
  const [complaintType, setComplaintType] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would submit the complaint to your backend
    console.log("Complaint submitted:", { complaintType, description })
    // Reset form
    setComplaintType("")
    setDescription("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an Issue</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="complaintType">Issue Type</label>
            <Select value={complaintType} onValueChange={setComplaintType}>
              <SelectTrigger id="complaintType">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lost">Lost Passport</SelectItem>
                <SelectItem value="delayed">Delayed Passport</SelectItem>
                <SelectItem value="incorrect">Incorrect Information</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about your issue"
              rows={4}
            />
          </div>
          <Button type="submit">Submit Report</Button>
        </form>
      </CardContent>
    </Card>
  )
}

