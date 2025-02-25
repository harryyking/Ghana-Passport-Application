"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitComplaint } from "@/lib/actions"
import { ComplaintType } from "@prisma/client"

export function ComplaintResolution() {
  const [complaints, setComplaints] = useState([
    { id: "COM001", type: "Missing Passport", status: "Open", priority: "High" },
    { id: "COM002", type: "Delayed Application", status: "In Progress", priority: "Medium" },
    { id: "COM003", type: "Incorrect Information", status: "Resolved", priority: "Low" },
  ])

  const [complaintType, setComplaintType] = useState<ComplaintType>("LOST_PASSPORT")
  const [description, setDescription] = useState("")

  const handleStatusChange = (id: string, newStatus: string) => {
    setComplaints(
      complaints.map((complaint) => (complaint.id === id ? { ...complaint, status: newStatus } : complaint)),
    )
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await submitComplaint({
      userId: "current-user-id", // This will come from session
      type: complaintType,
      description,
    })

    if (result.success) {
      // Show success message and reset form
      setDescription("")
      setComplaintType("DELAYED_PROCESSING")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaint Resolution</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complaint ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>{complaint.id}</TableCell>
                <TableCell>{complaint.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      complaint.status === "Open"
                        ? "default"
                        : complaint.status === "In Progress"
                          ? "destructive"
                          : "default"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      complaint.priority === "High"
                        ? "destructive"
                        : complaint.priority === "Medium"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {complaint.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select value={complaint.status} onValueChange={(value) => handleStatusChange(complaint.id, value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

