"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface Application {
  id: string
  type: "new" | "renewal"
  status: "pending" | "processing" | "approved" | "rejected"
  submissionDate: string
  lastUpdate: string
  estimatedCompletion?: string
  comments?: string
}

interface FamilyMemberApplicationsProps {
  memberId: string
  memberName: string
  applications: Application[]
}

export function FamilyMemberApplications({ memberId, memberName, applications }: FamilyMemberApplicationsProps) {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "processing":
        return "warning"
      case "approved":
        return "success"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications for {memberName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.id}</TableCell>
                <TableCell className="capitalize">{application.type}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(application.status)}
                    <Badge variant={getStatusBadgeVariant(application.status)}>{application.status}</Badge>
                  </div>
                </TableCell>
                <TableCell>{application.submissionDate}</TableCell>
                <TableCell>{application.lastUpdate}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Application Details - {application.id}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Type</p>
                            <p className="capitalize">{application.type}</p>
                          </div>
                          <div>
                            <p className="font-medium">Status</p>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(application.status)}
                              <span className="capitalize">{application.status}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Submission Date</p>
                            <p>{application.submissionDate}</p>
                          </div>
                          <div>
                            <p className="font-medium">Last Update</p>
                            <p>{application.lastUpdate}</p>
                          </div>
                          {application.estimatedCompletion && (
                            <div>
                              <p className="font-medium">Estimated Completion</p>
                              <p>{application.estimatedCompletion}</p>
                            </div>
                          )}
                        </div>
                        {application.comments && (
                          <div>
                            <p className="font-medium">Comments</p>
                            <p className="text-gray-600">{application.comments}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

