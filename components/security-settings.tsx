"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Change Password</h3>
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>
        <Button className="bg-[#006B3F]">Update Password</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor" className="flex flex-col">
            <span>Enable Two-Factor Authentication</span>
            <span className="font-normal text-sm text-gray-500">Add an extra layer of security to your account</span>
          </Label>
          <Switch id="two-factor" checked={twoFactor} onCheckedChange={setTwoFactor} />
        </div>
        {twoFactor && <Button variant="outline">Set Up Two-Factor Authentication</Button>}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Login History</h3>
        <Button variant="outline">View Login History</Button>
      </div>
    </div>
  )
}

