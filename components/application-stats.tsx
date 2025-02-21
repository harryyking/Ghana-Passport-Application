import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, CheckCircle } from "lucide-react"

export function ApplicationStats() {
  const stats = [
    {
      title: "Processing Time",
      value: "5-7 days",
      icon: Clock,
      description: "Average processing duration",
    },
    {
      title: "Next Available",
      value: "Tomorrow",
      icon: Calendar,
      description: "Appointment slot",
    },
    {
      title: "Success Rate",
      value: "98%",
      icon: CheckCircle,
      description: "Application approval rate",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
                <Icon className="h-8 w-8 text-[#CE1126]" />
                <h4 className="text-2xl font-semibold">{stat.value}</h4>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

