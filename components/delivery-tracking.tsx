"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Package, MapPin, Clock } from "lucide-react"
import { FacialRecognition } from "./facial-recognition"
import { createDelivery, updateDeliveryStatus } from "@/lib/actions"

type DeliveryStatus = "pending" | "in_transit" | "delivered" | "failed"

export function DeliveryTracking() {
  const [status, setStatus] = useState({
    distance: "2.3 km",
    eta: "15 minutes",
  })

  const initializeDelivery = async (address: string) => {
    const result = await createDelivery({
      applicationId: "current-application-id", // This will come from props
      address,
      recipientName: "Current User Name", // This will come from session
      recipientPhone: "User Phone", // This will come from session
    })

    if (result.success) {
      // Update UI with tracking information
    }
  }

  const updateStatus = async (status: DeliveryStatus) => {
    const result = await updateDeliveryStatus("delivery-id", status)
    if (result.success) {
      // Update UI with new status
    }
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Delivery Tracking</CardTitle>
        <div className="relative w-8 h-8">
          <Image src="/placeholder.svg?height=32&width=32" alt="Delivery Icon" width={32} height={32} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="text-blue-500" />
            <span>Your passport is on the way</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-500" />
            <span>Delivery Agent is {status.distance} away</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-blue-500" />
            <span>Estimated arrival: {status.eta}</span>
          </div>
        </div>
        <div className="mt-6">
          <FacialRecognition />
        </div>
      </CardContent>
    </Card>
  )
}

