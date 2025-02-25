"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, CalendarIcon } from "lucide-react"

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]

const locations = [
  {
    id: "acc",
    name: "Accra Passport Office",
    address: "Ridge, Accra",
    availability: "High",
  },
  {
    id: "kum",
    name: "Kumasi Passport Office",
    address: "Adum, Kumasi",
    availability: "Medium",
  },
  {
    id: "tam",
    name: "Tamale Passport Office",
    address: "Central Tamale",
    availability: "High",
  },
]

export default function ScheduleAppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <Card className="bg-[#CE1126] text-white">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">Schedule Appointment</h1>
            <p className="text-red-100">Book your biometric capture appointment</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedLocation === location.id
                          ? "border-[#006B3F] bg-green-50"
                          : "border-transparent bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedLocation(location.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{location.name}</h3>
                          <p className="text-sm text-gray-500">{location.address}</p>
                        </div>
                        <Badge
                          variant={
                            location.availability === "High"
                              ? "default"
                              : location.availability === "Medium"
                                ? "destructive"
                                : "destructive"
                          }
                        >
                          {location.availability} Availability
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Time Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={selectedTime === time ? "bg-[#006B3F]" : ""}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date() || date > new Date(2024, 3, 1)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#CE1126]" />
                    <span>
                      {selectedLocation ? locations.find((l) => l.id === selectedLocation)?.name : "Select a location"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-[#CE1126]" />
                    <span>{date ? date.toLocaleDateString() : "Select a date"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#CE1126]" />
                    <span>{selectedTime || "Select a time"}</span>
                  </div>
                  <Button
                    className="w-full bg-[#006B3F] hover:bg-[#006B3F]/90"
                    disabled={!selectedLocation || !date || !selectedTime}
                  >
                    Confirm Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

