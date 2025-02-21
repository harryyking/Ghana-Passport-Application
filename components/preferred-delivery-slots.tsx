"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const timeSlots = ["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "14:00 - 16:00", "16:00 - 18:00"]

export function PreferredDeliverySlots() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Preferred delivery slot:", { date: selectedDate, timeSlot: selectedTimeSlot })
    // Reset form
    setSelectedDate("")
    setSelectedTimeSlot("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferred Delivery Time Slots</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="delivery-date">Preferred Date</Label>
            <input
              id="delivery-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-slot">Preferred Time Slot</Label>
            <Select onValueChange={setSelectedTimeSlot} value={selectedTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Schedule Delivery
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

