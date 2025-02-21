"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export function ApplicationReview() {
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleZoom = (level: number) => {
    setZoomLevel(level)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Passport Photo</Label>
            <div className="relative w-full h-64 border rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Passport Photo"
                layout="fill"
                objectFit="contain"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
            <div className="mt-2 flex justify-center space-x-2">
              <Button onClick={() => handleZoom(1)}>100%</Button>
              <Button onClick={() => handleZoom(1.5)}>150%</Button>
              <Button onClick={() => handleZoom(2)}>200%</Button>
            </div>
          </div>
          <div>
            <Label>AI Photo Validation</Label>
            <Input value="Photo complies with requirements" readOnly />
          </div>
          <div>
            <Label>Admin Notes</Label>
            <Textarea placeholder="Enter any notes about the application..." />
          </div>
          <div className="flex justify-between">
            <Button variant="destructive">Reject</Button>
            <Button variant="outline">Request Changes</Button>
            <Button variant="default">Approve</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

