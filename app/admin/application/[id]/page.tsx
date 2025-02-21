"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for an application
const mockApplication = {
  id: "APP001",
  name: "John Doe",
  type: "New",
  status: "Pending Review",
  region: "Greater Accra",
  photoUrl: "/placeholder.svg?height=200&width=200",
  details: {
    dateOfBirth: "1990-01-01",
    placeOfBirth: "Accra",
    address: "123 Main St, Accra",
    occupation: "Software Developer",
  },
}

export default function ApplicationReview({ params }: { params: { id: string } }) {
  const [application, setApplication] = useState(mockApplication)
  const [comments, setComments] = useState("")
  const router = useRouter()

  const handleApprove = () => {
    // In a real application, you would send an API request to approve the application
    console.log("Approving application", application.id)
    router.push("/admin/dashboard")
  }

  const handleReject = () => {
    // In a real application, you would send an API request to reject the application
    console.log("Rejecting application", application.id)
    router.push("/admin/dashboard")
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Review</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Application Details - {application.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Name:</strong> {application.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {application.type}
                  </p>
                  <p>
                    <strong>Status:</strong> {application.status}
                  </p>
                  <p>
                    <strong>Region:</strong> {application.region}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {application.details.dateOfBirth}
                  </p>
                  <p>
                    <strong>Place of Birth:</strong> {application.details.placeOfBirth}
                  </p>
                  <p>
                    <strong>Address:</strong> {application.details.address}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {application.details.occupation}
                  </p>
                </div>
                <div>
                  <img
                    src={application.photoUrl || "/placeholder.svg"}
                    alt="Applicant Photo"
                    className="w-full max-w-xs mx-auto"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter any comments or notes about this application"
                  className="mt-1"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
                  Back to Dashboard
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  Reject
                </Button>
                <Button variant="default" onClick={handleApprove}>
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

