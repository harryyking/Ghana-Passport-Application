"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

export function FraudDetection() {
  const [suspiciousApplications, setSuspiciousApplications] = useState([
    { id: "APP005", name: "John Smith", type: "New", risk: "High", reason: "Multiple applications" },
    { id: "APP008", name: "Emma Brown", type: "Renewal", risk: "Medium", reason: "Inconsistent information" },
    { id: "APP012", name: "Michael Johnson", type: "New", risk: "Low", reason: "Unusual application pattern" },
  ])

  const handleInvestigate = (id: string) => {
    // Implement investigation logic
    console.log(`Investigating application ${id}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suspiciousApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.id}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.type}</TableCell>
                <TableCell>
                  <Badge variant={app.risk === "High" ? "destructive" : app.risk === "Medium" ? "warning" : "default"}>
                    {app.risk}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                    {app.reason}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleInvestigate(app.id)}>
                    Investigate
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

