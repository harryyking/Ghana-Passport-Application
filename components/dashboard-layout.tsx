"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, FileText, Users, Calendar, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0915-O1ZIx8pIjNk8OsGf7fyoqFMV27J9Tx.jpeg"
              alt="Ghana.GOV Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Main Content */}
        <main className="flex-1 container py-6">{children}</main>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden">
        <nav className="container flex justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center p-2">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/services" className="flex flex-col items-center p-2">
            <FileText className="h-5 w-5" />
            <span className="text-xs">Services</span>
          </Link>
          <Link href="/activity" className="flex flex-col items-center p-2">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Activity</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2">
            <Users className="h-5 w-5" />
            <span className="text-xs">Account</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

