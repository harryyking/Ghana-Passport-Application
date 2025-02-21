"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function PassportRenewal() {
  const [passportNumber, setPassportNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle renewal submission logic here
    console.log("Renewal submitted", { passportNumber, expiryDate, hasChanges })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passport Renewal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full">
            Submit Renewal Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

