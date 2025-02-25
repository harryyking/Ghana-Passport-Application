"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { addDays, format } from "date-fns"
import { scheduleAppointment } from "@/lib/actions"

interface AppointmentSchedulingProps {
  selectedDate: string
  selectedTime: string
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
}

export function AppointmentScheduling({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: AppointmentSchedulingProps) {
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("") // Added location state

  useEffect(() => {
    // Generate available dates for the next 14 days
    const dates = Array.from({ length: 14 }, (_, i) => format(addDays(new Date(), i + 1), "yyyy-MM-dd"))
    setAvailableDates(dates)

    // In a real application, you would fetch available times from an API
    setAvailableTimes(["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"])
  }, [])

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedLocation) return

    const result = await scheduleAppointment({
      applicationId: "current-application-id", // This will come from props
      type: "biometric",
      date: new Date(selectedDate),
      time: selectedTime,
      location: selectedLocation,
    })

    if (!result.success) {
      // Handle error
      return
    }

    // Handle success (e.g., show confirmation, update UI)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Pick-up Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appointment-date">Appointment Date</Label>
            <Select onValueChange={onDateSelect} value={selectedDate}>
              <SelectTrigger id="appointment-date">
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {format(new Date(date), "MMMM d, yyyy")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointment-time">Appointment Time</Label>
            <Select onValueChange={onTimeSelect} value={selectedTime}>
              <SelectTrigger id="appointment-time">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Location Select - Add this if you have location data */}
          <div className="space-y-2">
            <Label htmlFor="appointment-location">Appointment Location</Label>
            <Select onValueChange={setSelectedLocation} value={selectedLocation}>
              <SelectTrigger id="appointment-location">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="location1" value="location1">
                  Location 1
                </SelectItem>
                <SelectItem key="location2" value="location2">
                  Location 2
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </CardContent>
    </Card>
  )
}

