"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", applications: 400, approvals: 240, rejections: 20 },
  { name: "Feb", applications: 300, approvals: 180, rejections: 30 },
  { name: "Mar", applications: 500, approvals: 350, rejections: 25 },
  { name: "Apr", applications: 280, approvals: 200, rejections: 15 },
  { name: "May", applications: 200, approvals: 150, rejections: 10 },
  { name: "Jun", applications: 278, approvals: 220, rejections: 18 },
]

export function ReportsAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports & Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applications">Applications Processed</SelectItem>
              <SelectItem value="delivery">Delivery Success Rates</SelectItem>
              <SelectItem value="payment">Payment History</SelectItem>
            </SelectContent>
          </Select>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" />
                <Bar dataKey="approvals" fill="#82ca9d" />
                <Bar dataKey="rejections" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

