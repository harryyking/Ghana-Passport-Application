import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SecurityAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Security Alert</AlertTitle>
          <AlertDescription>
            We've detected unusual activity on your account. Please review your recent login attempts and contact
            support if you don't recognize any of them.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

