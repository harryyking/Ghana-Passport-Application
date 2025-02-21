"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AppointmentBooking() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!date || !time || !location) {
      setError("Please fill in all fields")
      return
    }

    try {
      // Here you would integrate with your booking system
      // This is a placeholder for the actual booking process
      console.log(`Booking appointment for ${date} at ${time} in ${location}`)

      // Simulating a successful booking
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess("Appointment booked successfully")
    } catch (error) {
      setError("Booking failed. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Biometric Capture Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select onValueChange={setLocation} value={location}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accra">Accra Passport Office</SelectItem>
                <SelectItem value="kumasi">Kumasi Passport Office</SelectItem>
                <SelectItem value="tamale">Tamale Passport Office</SelectItem>
                <SelectItem value="takoradi">Takoradi Passport Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Book Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

