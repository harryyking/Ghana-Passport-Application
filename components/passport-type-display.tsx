import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from your application state or API
const mockPassportApplication = {
  type: "Standard",
  processingSpeed: "Expedited",
  estimatedProcessingTime: "2 weeks",
  applicationDate: "2023-05-15",
}

export function PassportTypeDisplay() {
  const { type, processingSpeed, estimatedProcessingTime, applicationDate } = mockPassportApplication

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Passport Application</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="font-semibold">Type:</span> {type}
          </div>
          <div>
            <span className="font-semibold">Processing:</span>{" "}
            <Badge variant={processingSpeed === "Expedited" ? "destructive" : "default"}>{processingSpeed}</Badge>
          </div>
          <div>
            <span className="font-semibold">Estimated Processing Time:</span> {estimatedProcessingTime}
          </div>
          <div>
            <span className="font-semibold">Application Date:</span> {applicationDate}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

