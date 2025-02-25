"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for reports
const mockReportData = [
  { name: "Greater Accra", newApplications: 400, renewals: 300 },
  { name: "Ashanti", newApplications: 300, renewals: 200 },
  { name: "Western", newApplications: 200, renewals: 150 },
  { name: "Eastern", newApplications: 150, renewals: 100 },
  { name: "Central", newApplications: 100, renewals: 50 },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState<string>("applications")
  const [reportData, setReportData] = useState(mockReportData)
  const { isAdminLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push("/admin/login")
    }
    // In a real application, you would fetch the report data here based on the reportType
    // setReportData(fetchedReportData)
  }, [isAdminLoggedIn, router]) // Removed reportType from dependencies

  if (!isAdminLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Application Processing Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Select onValueChange={(value) => setReportType(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applications">Applications by Region</SelectItem>
                    <SelectItem value="processing">Processing Times</SelectItem>
                    <SelectItem value="delivery">Delivery Performance</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => console.log("Generating PDF report")}>Generate PDF</Button>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newApplications" fill="#8884d8" />
                    <Bar dataKey="renewals" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

