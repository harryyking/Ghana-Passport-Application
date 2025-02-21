"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/header"
import { Camera } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecurityAlerts } from "@/components/security-alerts"
import { NotificationSettings } from "@/components/notification-settings"
import { ComplaintManagement } from "@/components/complaint-management"
import { PassportRenewal } from "@/components/passport-renewal"

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { user, updateProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "")
      setDateOfBirth(user.dateOfBirth || "")
      setEmail(user.email || "")
      setPhoneNumber(user.phoneNumber || "")
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile({ fullName, dateOfBirth, email, phoneNumber })
      setSuccessMessage("Profile updated successfully")
      setError("")
    } catch (error) {
      setError("Failed to update profile. Please try again.")
      setSuccessMessage("")
    }
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="w-full md:w-64 h-fit">
            <CardHeader>
              <CardTitle>Profile Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-1 h-fit">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="security">Security Alerts</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="issues">Report Issue</TabsTrigger>
                  <TabsTrigger value="renewal">Passport Renewal</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs defaultValue="personal" className="w-full">
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src="/placeholder.svg"
                              alt="Profile"
                              width={128}
                              height={128}
                              className="object-cover"
                            />
                          </div>
                          <Button
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <SecurityAlerts />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>

              <TabsContent value="issues">
                <ComplaintManagement />
              </TabsContent>

              <TabsContent value="renewal">
                <PassportRenewal />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

