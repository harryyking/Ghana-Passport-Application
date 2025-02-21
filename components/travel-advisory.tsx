"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function TravelAdvisory() {
  const [destination, setDestination] = useState("")
  const [travelInfo, setTravelInfo] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would fetch this data from an API
    setTravelInfo(`
      Travel Advisory for ${destination}:
      - Visa Requirements: Visa on arrival available for Ghanaian citizens.
      - Health Regulations: Yellow fever vaccination required.
      - Current Travel Alerts: None at this time.
      - Currency: Local currency is accepted. Credit cards widely used in urban areas.
      - Emergency Contacts: Ghana Embassy contact: +1234567890
    `)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Travel Advisory</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination Country</Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination country"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Get Travel Information
          </Button>
        </form>
        {travelInfo && (
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <div className="flex items-center mb-2">
              <AlertCircle className="text-blue-500 mr-2" />
              <h3 className="font-semibold">Travel Information</h3>
            </div>
            <p className="text-sm whitespace-pre-line">{travelInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

