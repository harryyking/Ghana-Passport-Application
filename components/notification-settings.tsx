"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    sms: true,
    email: true,
    push: false,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications" className="flex flex-col">
              <span>SMS Notifications</span>
              <span className="font-normal text-sm text-gray-500">Receive updates via text message</span>
            </Label>
            <Switch id="sms-notifications" checked={settings.sms} onCheckedChange={() => handleToggle("sms")} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex flex-col">
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-gray-500">Receive updates via email</span>
            </Label>
            <Switch id="email-notifications" checked={settings.email} onCheckedChange={() => handleToggle("email")} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex flex-col">
              <span>Push Notifications</span>
              <span className="font-normal text-sm text-gray-500">Receive updates via mobile app</span>
            </Label>
            <Switch id="push-notifications" checked={settings.push} onCheckedChange={() => handleToggle("push")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

