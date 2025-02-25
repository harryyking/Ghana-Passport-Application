"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PriorityProcessing() {
  const [priorityApplications, setPriorityApplications] = useState([
    { id: "APP007", name: "Ambassador John Doe", type: "Diplomatic", status: "Expedited" },
    { id: "APP009", name: "Minister Jane Smith", type: "Official", status: "Pending" },
    { id: "APP011", name: "Consul Emma Brown", type: "Service", status: "In Review" },
  ])

  const handleExpedite = (id: string) => {
    setPriorityApplications(priorityApplications.map((app) => (app.id === id ? { ...app, status: "Expedited" } : app)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Processing</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priorityApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.id}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      app.status === "Expedited" ? "success" : app.status === "In Review" ? "warning" : "default"
                    }
                  >
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {app.status !== "Expedited" && (
                    <Button variant="outline" size="sm" onClick={() => handleExpedite(app.id)}>
                      Expedite
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

