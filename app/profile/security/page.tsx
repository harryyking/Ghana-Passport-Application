"use client"

import { BackButton } from "@/components/back-button"
import { SecuritySettings } from "@/components/security-settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecuritySettingsPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <SecuritySettings />
        </CardContent>
      </Card>
    </div>
  )
}

