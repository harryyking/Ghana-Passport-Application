"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/header"
import { DeliveryTracking } from "@/components/delivery-tracking"
import { DeliveryScheduling } from "@/components/delivery-scheduling"
import { ApplicationStatus } from "@/components/application-status"
import { MultiStepApplicationForm } from "@/components/multi-step-application"

export default function ApplyPage() {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const router = useRouter()

  // Mock data for passport application type and status
  const passportApplication = {
    type: "Expedited" as const,
    status: "Processing",
  }

  const handleApplicationSubmit = () => {
    setApplicationSubmitted(true)
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!applicationSubmitted ? (
          <MultiStepApplicationForm onSubmit={handleApplicationSubmit} />
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Submitted Successfully</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your passport application has been submitted. You can now schedule your delivery and track your
                  application status.
                </p>
              </CardContent>
            </Card>
            <ApplicationStatus status={passportApplication.status} type={passportApplication.type} />
            <DeliveryScheduling />
            <DeliveryTracking />
          </div>
        )}
      </main>
    </div>
  )
}

