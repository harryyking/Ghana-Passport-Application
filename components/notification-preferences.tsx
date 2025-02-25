"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: true,
    push: false,
    applicationUpdates: true,
    appointmentReminders: true,
    documentExpiry: true,
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Channels</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications" className="flex flex-col">
            <span>Email Notifications</span>
            <span className="font-normal text-sm text-gray-500">Receive updates via email</span>
          </Label>
          <Switch id="email-notifications" checked={preferences.email} onCheckedChange={() => handleToggle("email")} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications" className="flex flex-col">
            <span>SMS Notifications</span>
            <span className="font-normal text-sm text-gray-500">Receive updates via text message</span>
          </Label>
          <Switch id="sms-notifications" checked={preferences.sms} onCheckedChange={() => handleToggle("sms")} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications" className="flex flex-col">
            <span>Push Notifications</span>
            <span className="font-normal text-sm text-gray-500">Receive updates via mobile app</span>
          </Label>
          <Switch id="push-notifications" checked={preferences.push} onCheckedChange={() => handleToggle("push")} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Types</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="application-updates" className="flex flex-col">
            <span>Application Updates</span>
            <span className="font-normal text-sm text-gray-500">Status changes and important alerts</span>
          </Label>
          <Switch
            id="application-updates"
            checked={preferences.applicationUpdates}
            onCheckedChange={() => handleToggle("applicationUpdates")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="appointment-reminders" className="flex flex-col">
            <span>Appointment Reminders</span>
            <span className="font-normal text-sm text-gray-500">Upcoming appointment notifications</span>
          </Label>
          <Switch
            id="appointment-reminders"
            checked={preferences.appointmentReminders}
            onCheckedChange={() => handleToggle("appointmentReminders")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="document-expiry" className="flex flex-col">
            <span>Document Expiry</span>
            <span className="font-normal text-sm text-gray-500">Alerts for expiring documents</span>
          </Label>
          <Switch
            id="document-expiry"
            checked={preferences.documentExpiry}
            onCheckedChange={() => handleToggle("documentExpiry")}
          />
        </div>
      </div>
    </div>
  )
}

