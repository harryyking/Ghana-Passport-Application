import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function AppointmentScheduler() {
  const upcomingAppointments = [
    {
      title: "Biometric Capture",
      date: "May 15, 2024",
      time: "10:00 AM",
      location: "Accra Office",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-start space-x-4 rounded-lg border p-4">
                <div className="rounded-full bg-[#FDE51B] p-2 text-[#CE1126]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{appointment.title}</p>
                  <p className="text-sm text-gray-500">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.location}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white"
                >
                  Reschedule
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No upcoming appointments</p>
            <Button className="mt-4 bg-[#CE1126] text-white hover:bg-[#CE1126]/90">Schedule Now</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

