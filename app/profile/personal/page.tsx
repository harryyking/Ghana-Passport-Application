"use client"

import { BackButton } from "@/components/back-button"
import { PersonalInformation } from "@/components/personal-information"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PersonalInformationPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonalInformation />
        </CardContent>
      </Card>
    </div>
  )
}

