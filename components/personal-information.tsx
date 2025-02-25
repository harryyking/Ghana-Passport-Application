"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PersonalInformation() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    dateOfBirth: "1990-01-01",
    gender: "male",
    nationality: "Ghanaian",
    address: "123 Main St, Accra",
    phone: "+233 XX XXX XXXX",
    email: "johndoe@example.com",
  })

  const handleChange = (key: keyof typeof personalInfo, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" value={personalInfo.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={personalInfo.dateOfBirth}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select value={personalInfo.gender} onValueChange={(value) => handleChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality">Nationality</Label>
        <Input
          id="nationality"
          value={personalInfo.nationality}
          onChange={(e) => handleChange("nationality", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" value={personalInfo.address} onChange={(e) => handleChange("address", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" value={personalInfo.phone} onChange={(e) => handleChange("phone", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      <Button className="bg-[#006B3F]">Save Changes</Button>
    </div>
  )
}

