"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface PickupLocationSelectionProps {
  selectedLocation: string
  onLocationSelect: (location: string) => void
}

export function PickupLocationSelection({ selectedLocation, onLocationSelect }: PickupLocationSelectionProps) {
  const [locations, setLocations] = useState<string[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setLocations([
      "Accra Passport Office",
      "Kumasi Passport Office",
      "Takoradi Passport Office",
      "Tamale Passport Office",
      "Sunyani Passport Office",
      "Ho Passport Office",
    ])
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Pick-up Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup-location">Preferred Pick-up Location</Label>
            <Select onValueChange={onLocationSelect} value={selectedLocation}>
              <SelectTrigger id="pickup-location">
                <SelectValue placeholder="Select a pick-up location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

