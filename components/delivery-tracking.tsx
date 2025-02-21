"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import Image from "next/image"
import { Package, MapPin, Clock } from "lucide-react"
import { FacialRecognition } from "./facial-recognition"


const deliveryPersonLocation = {
  lat: 5.6037, // Accra
  lng: -0.187,
}

const destination = {
  lat: 5.62,
  lng: -0.18,
}

export function DeliveryTracking() {
  const [driverLocation, setDriverLocation] = useState(deliveryPersonLocation)
  // const { isLoaded } = useJsApiLoader(googleMapsConfig)

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Delivery Tracking</CardTitle>
        <div className="relative w-8 h-8">
          <Image src="/placeholder.svg?height=32&width=32" alt="Delivery Icon" width={32} height={32} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mb-4 rounded-lg overflow-hidden">
          {/* {isLoaded ? (
            <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={driverLocation} zoom={14}>
              <Marker
                position={driverLocation}
                icon={{
                  url: "/placeholder.svg?height=30&width=30",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
              <Marker
                position={destination}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            </GoogleMap>
          ) : (
            <div>Loading map...</div>
          )}
        </div>
        <div className="space-y-4"> */}
          <div className="flex items-center gap-2">
            <Package className="text-blue-500" />
            <span>Your passport is on the way</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-500" />
            <span>Delivery Agent is 2.3 km away</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-blue-500" />
            <span>Estimated arrival: 15 minutes</span>
          </div>
        </div>
        <div className="mt-6">
          <FacialRecognition />
        </div>
      </CardContent>
    </Card>
  )
}

