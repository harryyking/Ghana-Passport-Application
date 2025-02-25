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
import { FraudDetection } from "@/components/fraud-detection"
import { ComplaintResolution } from "@/components/complaint-resolution"
import { PriorityProcessing } from "@/components/priority-processing"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([])
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { user, isAdminLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push("/admin/login")
    } else {
      // Fetch applications based on admin's region
      fetchApplications(user?.region);
    }
  }, [isAdminLoggedIn, router, user])

  const fetchApplications = async (region: string | undefined) => {
    // This would be an API call in a real application
    const mockApplications = [
      { id: "APP001", name: "John Doe", type: "New", status: "Pending", region: "Greater Accra" },
      { id: "APP002", name: "Jane Smith", type: "Renewal", status: "In Review", region: "Ashanti" },
      { id: "APP003", name: "Kwame Nkrumah", type: "Diplomatic", status: "Approved", region: "Greater Accra" },
    ]
    setApplications(mockApplications.filter((app) => region === "all" || app.region === region))
  }

  const handleSearch = (query: any) => {
    setSearchQuery(query)
    // Implement search logic here
  }

  const handleStatusChange = (applicationId:any, newStatus: any) => {
    // Implement status change logic here
  }

  if (!isAdminLoggedIn || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <Tabs defaultValue="applications">
          <TabsList className="mb-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Management</TabsTrigger>
            <TabsTrigger value="priority">Priority Processing</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <Input
                    placeholder="Search by name, application number, or Ghana Card number"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="max-w-sm"
                  />
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
                <Table>
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
                    {applications.map((app: any) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.id}</TableCell>
                        <TableCell>{app.name}</TableCell>
                        <TableCell>{app.type}</TableCell>
                        <TableCell>
                          <Badge variant={app.status === "Approved" ? "default" : "destructive"}>{app.status}</Badge>
                        </TableCell>
                        <TableCell>{app.region}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/applications/${app.id}`)}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <ApplicationReview />
          </TabsContent>

          <TabsContent value="delivery">
            <DeliveryManagement />
          </TabsContent>

          <TabsContent value="priority">
            <PriorityProcessing />
          </TabsContent>

          <TabsContent value="fraud">
            <FraudDetection />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsAnalytics />
          </TabsContent>

          <TabsContent value="complaints">
            <ComplaintResolution />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLog />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

