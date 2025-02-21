"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { AdminHeader } from "@/components/admin-header"
import { ApplicationReview } from "@/components/application-review"
import { DeliveryManagement } from "@/components/delivery-management"
import { ReportsAnalytics } from "@/components/reports-analytics"
import { AuditLog } from "@/components/audit-log"

export default function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()



  // const fetchApplications = async (region) => {
  //   // This would be an API call in a real application
  //   const mockApplications = [
  //     { id: "APP001", name: "John Doe", type: "New", status: "Pending", region: "Greater Accra" },
  //     { id: "APP002", name: "Jane Smith", type: "Renewal", status: "In Review", region: "Ashanti" },
  //     { id: "APP003", name: "Kwame Nkrumah", type: "Diplomatic", status: "Approved", region: "Greater Accra" },
  //   ]
  //   setApplications(mockApplications.filter((app) => region === "all" || app.region === region))

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Application Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              {/* <Input
                placeholder="Search by name, application number, or Ghana Card number"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
              /> */}
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Greater Accra">Greater Accra</SelectItem>
                  <SelectItem value="Ashanti">Ashanti</SelectItem>
                  {/* Add more regions as needed */}
                </SelectContent>
              </Select>
            </div>
            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.id}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    <TableCell>
                      <Badge variant={app.status === "Approved" ? "success" : "warning"}>{app.status}</Badge>
                    </TableCell>
                    <TableCell>{app.region}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/admin/applications/${app.id}`)}>
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ApplicationReview />
          <DeliveryManagement />
        </div>

        <div className="mt-8">
          <ReportsAnalytics />
        </div>

        <div className="mt-8">
          <AuditLog />
        </div>
      </main>
    </div>
  )
}

