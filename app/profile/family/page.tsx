"use client"

import { BackButton } from "@/components/back-button"
import { FamilyAccountManagement } from "@/components/family-account-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FamilyManagementPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>Family Management</CardTitle>
        </CardHeader>
        <CardContent>
          <FamilyAccountManagement />
        </CardContent>
      </Card>
    </div>
  )
}

