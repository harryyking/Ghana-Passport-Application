"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

// Mock data for family applications
const mockFamilyApplications = [
  { id: "FAM001", name: "Jane Doe", relationship: "Spouse", status: "Processing" },
  { id: "FAM002", name: "John Doe Jr.", relationship: "Child", status: "Completed" },
  { id: "FAM003", name: "Sarah Doe", relationship: "Child", status: "Pending" },
]

export function FamilyApplications() {
  const [applications, setApplications] = useState(mockFamilyApplications)

  const handleAddFamilyMember = () => {
    // In a real application, this would open a form to add a new family member
    console.log("Add family member")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Family Applications
          <Button onClick={handleAddFamilyMember} size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Family Member
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.relationship}</TableCell>
                <TableCell>
                  <Badge
                  >
                    {app.status}
                  </Badge>
                </TableCell>
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
  )
}

