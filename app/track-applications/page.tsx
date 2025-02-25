"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockApplications = [
  {
    id: "APP001",
    type: "New Passport",
    submissionDate: "2024-02-15",
    status: "Processing",
    nextStep: "Biometric Capture",
  },
  {
    id: "APP002",
    type: "Renewal",
    submissionDate: "2024-02-10",
    status: "Pending Review",
    nextStep: "Document Verification",
  },
]

export default function TrackApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-4 w-4 text-[#FCD116]" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-[#006B3F]" />
      default:
        return <AlertTriangle className="h-4 w-4 text-[#CE1126]" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <Card className="bg-[#CE1126] text-white">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">Track Applications</h1>
            <p className="text-red-100">Monitor the status of your passport applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Search by application ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Step</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    <TableCell>{app.submissionDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(app.status)}
                        <Badge
                          variant={app.status === "Processing" ? "default" : "secondary"}
                          className="bg-opacity-90"
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{app.nextStep}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-none">
                  <div className="w-8 h-8 rounded-full bg-[#006B3F] flex items-center justify-center text-white">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Application Submitted</h3>
                  <p className="text-sm text-gray-500">Your application has been received and is being processed</p>
                  <p className="text-sm text-gray-400 mt-1">2024-02-15 09:30 AM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none">
                  <div className="w-8 h-8 rounded-full bg-[#FCD116] flex items-center justify-center text-white">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Document Verification</h3>
                  <p className="text-sm text-gray-500">Your documents are being verified by our team</p>
                  <p className="text-sm text-gray-400 mt-1">In Progress</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

