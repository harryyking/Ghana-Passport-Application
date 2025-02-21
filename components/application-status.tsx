import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle } from "lucide-react"

interface ApplicationStatusProps {
  status: string
  type: "Standard" | "Expedited"
  isRenewal?: boolean
}

export function ApplicationStatus({ status, type, isRenewal = false }: ApplicationStatusProps) {
  const steps = [
    { label: isRenewal ? "Renewal Application Submitted" : "Application Submitted", completed: true },
    { label: "Payment Confirmed", completed: true },
    { label: "Processing", completed: status !== "Processing" },
    { label: "Ready for Delivery", completed: status === "Ready for Delivery" },
  ]

  return (
    <Card className="border-l-4 border-l-yellow-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {isRenewal ? "Renewal Status" : "Application Status"}
          <Badge variant={status === "Processing" ? "secondary" : "success"}>{status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant={type === "Expedited" ? "destructive" : "default"}>{type}</Badge>
            <span className="text-sm text-gray-500">
              {type === "Expedited" ? "Estimated 5 working days" : "Estimated 15 working days"}
            </span>
          </div>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${step.completed ? "bg-green-600" : "bg-gray-300"}`} />
              <span className={step.completed ? "text-green-600" : "text-gray-500"}>{step.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          {status === "Processing" ? <Clock className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
          {status === "Processing" ? "Estimated completion: 2-3 working days" : "Ready for pickup or delivery"}
        </div>
      </CardContent>
    </Card>
  )
}

