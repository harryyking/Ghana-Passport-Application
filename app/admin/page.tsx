"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample application data
const applications = [
  {
    id: "APP001",
    name: "John Doe",
    status: "Pending",
    submittedDate: "2024-01-15",
    priority: "High",
  },
  {
    id: "APP002",
    name: "Jane Smith",
    status: "Verified",
    submittedDate: "2024-01-14",
    priority: "Normal",
  },
  // Add more sample data as needed
]

const analyticsData = [
  { name: "Jan", applications: 400, processed: 300 },
  { name: "Feb", applications: 300, processed: 250 },
  { name: "Mar", applications: 500, processed: 400 },
  { name: "Apr", applications: 280, processed: 220 },
  { name: "May", applications: 200, processed: 180 },
  { name: "Jun", applications: 278, processed: 240 },
]

export default function AdminDashboard() {
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [applicationsState, setApplications] = useState([
    { id: "APP001", name: "John Doe", status: "Pending", submittedDate: "2023-05-15", priority: "High" },
    { id: "APP002", name: "Jane Smith", status: "Verified", submittedDate: "2023-05-14", priority: "Normal" },
  ])

  const handleReview = (id: string) => {
    // Implement review logic
    console.log("Reviewing application:", id)
  }

  const handleZoom = (action: "in" | "out") => {
    // Implement zoom logic
    console.log("Zoom action:", action)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-gray-500">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-gray-500">Average 42 per day</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 days</div>
              <p className="text-xs text-gray-500">-0.5 days from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
              <ArrowDown className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-gray-500">-0.8% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Input placeholder="Search applications..." className="w-[200px]" />
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationsState.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.id}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>
                      <Badge variant={app.status === "Verified" ? "default" : "destructive"}>{app.status}</Badge>
                    </TableCell>
                    <TableCell>{app.submittedDate}</TableCell>
                    <TableCell>
                      <Badge variant={app.priority === "High" ? "destructive" : "default"}>{app.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleReview(app.id)}>
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Photo Review */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Photo Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <img src="/placeholder.svg" alt="Passport Photo" className="w-full h-auto" />
                <div className="flex justify-center mt-2">
                  <Button onClick={() => handleZoom("in")}>Zoom In</Button>
                  <Button onClick={() => handleZoom("out")} className="ml-2">
                    Zoom Out
                  </Button>
                </div>
              </div>
              <div className="w-1/2">
                <h3 className="font-semibold mb-2">AI Validation Results</h3>
                <ul className="list-disc pl-5">
                  <li>Background: Compliant</li>
                  <li>Face Position: Compliant</li>
                  <li>Lighting: Non-compliant (shadows detected)</li>
                </ul>
                <div className="mt-4">
                  <Button variant="destructive" className="mr-2">
                    Reject Photo
                  </Button>
                  <Button variant="default">Approve Photo</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Verification */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Document Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ghana Card</TableCell>
                  <TableCell>
                    <Badge variant="default">Verified</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Proof of Payment</TableCell>
                  <TableCell>
                    <Badge variant="destructive">Pending</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Delivery Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Delivery Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Delivery Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent1">John Doe</SelectItem>
                  <SelectItem value="agent2">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
              <Button>Assign Deliveries</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Passport ID</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>PAS001</TableCell>
                  <TableCell>Alice Johnson</TableCell>
                  <TableCell>123 Main St, Accra</TableCell>
                  <TableCell>
                    <Badge>In Transit</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PAS002</TableCell>
                  <TableCell>Bob Williams</TableCell>
                  <TableCell>456 Church Rd, Kumasi</TableCell>
                  <TableCell>
                    <Badge variant="default">Delivered</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Reports & Analytics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Reports & Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                  <Bar dataKey="processed" fill="#82ca9d" name="Processed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Audit Log */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-05-15 14:30:22</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Approved application PAS003</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-05-15 13:45:10</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Rejected photo for application PAS004</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

