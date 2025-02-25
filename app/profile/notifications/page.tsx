"use client"

import { BackButton } from "@/components/back-button"
import { NotificationPreferences } from "@/components/notification-preferences"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotificationsPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationPreferences />
        </CardContent>
      </Card>
    </div>
  )
}

