"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { User, Shield, Bell, Users, MessageSquare, ChevronRight, Search } from "lucide-react"
import { RequirementSlider } from "@/components/requirement-slider"
import { BackButton } from "@/components/back-button"

const statsCards = [
  { number: "2", label: "Active Applications", color: "text-blue-600" },
  { number: "5", label: "Family Members", color: "text-green-600" },
  { number: "3", label: "Appointments", color: "text-purple-600" },
  { number: "1", label: "Notifications", color: "text-orange-600" },
]

const menuItems = [
  {
    icon: User,
    title: "Personal Information",
    description: "Update your personal details",
    href: "/profile/personal",
  },
  {
    icon: Shield,
    title: "Security Settings",
    description: "Manage your security preferences",
    href: "/profile/security",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure notification settings",
    href: "/profile/notifications",
  },
  {
    icon: Users,
    title: "Family Management",
    description: "Manage family members",
    href: "/profile/family",
  },
  {
    icon: MessageSquare,
    title: "Support & Help",
    description: "Get help with your account",
    href: "/help-center",
  },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0915-O1ZIx8pIjNk8OsGf7fyoqFMV27J9Tx.jpeg"
              alt="Ghana.GOV Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-[200px] md:w-[300px]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <BackButton />
        {/* Profile Section */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Image
              src={user.photoUrl || "/placeholder.svg"}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">Verified</Badge>
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <Card key={stat.label} className="p-4">
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.number}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Passport Requirements Slider */}
        <div className="my-8">
          <RequirementSlider />
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item) => (
            <button key={item.title} className="w-full text-left" onClick={() => router.push(item.href)}>
              <Card className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-gray-100">
                    <item.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button variant="destructive" className="w-full py-6 text-base" onClick={() => logout()}>
          Logout
        </Button>
      </main>
    </div>
  )
}

