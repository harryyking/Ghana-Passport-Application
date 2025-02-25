"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Plane, CreditCard, Map } from "lucide-react"

export default function TravelCompanionPage() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [itinerary, setItinerary] = useState("")

  const handleVisaApplication = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle visa application logic
    console.log("Applying for visa to:", selectedCountry)
  }

  const handleItinerarySave = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle itinerary save logic
    console.log("Saving itinerary:", itinerary)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Travel Companion</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="visa">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="visa">Visa Application</TabsTrigger>
                <TabsTrigger value="itinerary">Travel Itinerary</TabsTrigger>
                <TabsTrigger value="wallet">Digital Wallet</TabsTrigger>
                <TabsTrigger value="advisory">Travel Advisory</TabsTrigger>
              </TabsList>
              <TabsContent value="visa">
                <Card>
                  <CardHeader>
                    <CardTitle>Pre-Filled Visa Application</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleVisaApplication} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Destination Country</Label>
                        <Input
                          id="country"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          placeholder="Enter destination country"
                          required
                        />
                      </div>
                      <Button type="submit">
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Pre-Filled Visa Application
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="itinerary">
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Itinerary Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleItinerarySave} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="itinerary">Travel Itinerary</Label>
                        <Textarea
                          id="itinerary"
                          value={itinerary}
                          onChange={(e) => setItinerary(e.target.value)}
                          placeholder="Enter your travel itinerary details"
                          rows={5}
                          required
                        />
                      </div>
                      <Button type="submit">
                        <Plane className="mr-2 h-4 w-4" />
                        Save Itinerary
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="wallet">
                <Card>
                  <CardHeader>
                    <CardTitle>Digital Travel Wallet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>Manage your travel expenses and loyalty programs here.</p>
                      <Button>
                        <CreditCard className="mr-2 h-4 w-4" />
                        View Expenses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="advisory">
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Advisory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>Get real-time travel advisories and destination-specific information.</p>
                      <Button>
                        <Map className="mr-2 h-4 w-4" />
                        View Interactive Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

