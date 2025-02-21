"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const mapContainerStyle = {
  width: "100%",
  height: "300px",
}

const center = {
  lat: 5.6037, // Accra, Ghana
  lng: -0.187,
}

export function DeliveryScheduling() {
  const [deliveryDate, setDeliveryDate] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")
  const [address, setAddress] = useState("")
  const [markerPosition, setMarkerPosition] = useState(center)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAuU4DO4sxHLljpOJnPCWXgIOMpGIn3BN0",
    libraries: ["places", "maps"],
  })

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the delivery scheduling logic
    console.log("Delivery scheduled")
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition(e.latLng.toJSON())
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Delivery</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSchedule} className="space-y-4">
          <div>
            <Label htmlFor="deliveryDate">Preferred Date</Label>
            <Input
              id="deliveryDate"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="deliveryTime">Preferred Time</Label>
            <Input
              id="deliveryTime"
              type="time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Delivery Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div>
            <Label>Select Location on Map</Label>
            {isLoaded ? (
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10} onClick={handleMapClick}>
                <Marker position={markerPosition} />
              </GoogleMap>
            ) : (
              <div>Loading map...</div>
            )}
          </div>
          <Button type="submit" className="w-full">
            Schedule Delivery
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

