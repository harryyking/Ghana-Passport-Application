"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockAuditLogs = [
  { id: 1, action: "Application Approved", admin: "John Doe", timestamp: "2023-05-15 14:30:00" },
  { id: 2, action: "Delivery Assigned", admin: "Jane Smith", timestamp: "2023-05-15 15:45:00" },
  { id: 3, action: "Photo Rejected", admin: "Mike Johnson", timestamp: "2023-05-15 16:20:00" },
]

export function AuditLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAuditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.admin}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

