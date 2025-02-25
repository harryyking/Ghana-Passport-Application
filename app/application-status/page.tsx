"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ApplicationStatus } from "@/components/application-status"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApplicationStatusPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ApplicationStatus status="Processing" type="Standard" />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

