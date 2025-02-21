"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/header"
import { FeatureCard } from "@/components/feature-card"
import { NotificationCenter } from "@/components/notification-center"
import { AppointmentScheduler } from "@/components/appointement-scheduler"
import { TaskProgress } from "@/components/task-progress"
import { ApplicationStats } from "@/components/application-stats"
import { Calendar, Users, FileText, AlertTriangle, MessageSquare, StampIcon as Passport, RefreshCw } from "lucide-react"
import Image from "next/image"
import { HelpCircle } from "lucide-react"
import { HelpCenter } from "@/components/help-center"
import { PhotoGuidelines } from "@/components/photo-guidelines"
import { DeliveryVerification } from "@/components/delivery-verification"
import { PassportTypeDisplay } from "@/components/passport-type-display"
import { FamilyApplications } from "@/components/family-applications"
import { SecurityAlerts } from "@/components/security-alerts"
import { ComplaintManagement } from "@/components/compliant-management"
import { NotificationSettings } from "@/components/notification-settings"

const adinkraSymbols = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funtumfunefu-denkyemfunefu-small-IGcFsqBTsW1E8FR7NPz1OLTZ7MR94G.png",
    alt: "Funtumfunefu Denkyemfunefu",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sankofa-small-YxivKaLq9s36YwspL0ldoJT5psqAk6.png",
    alt: "Sankofa",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dwennimmen-small-P8bjKqRcGKbmEiQDFxQ8AjKKGuAxhy.png",
    alt: "Dwennimmen",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aban-small-rs1KmNjO74j5PgZkfXWKeXy82Bsmqg.png",
    alt: "Aban",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adinkrahene-small-or2hBMtqcxE3foGUJT1hEveIstvKNR.png",
    alt: "Adinkrahene",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [showSecurityAlert, setShowSecurityAlert] = useState(false)


  const features = [
    {
      title: "Apply for Passport",
      description: "Start a new passport application",
      icon: Passport,
      href: "/apply",
    },
    {
      title: "Renew Passport",
      description: "Renew your existing passport",
      icon: RefreshCw,
      href: "/renew",
    },
    {
      title: "Track Applications",
      description: "Monitor your passport application status in real-time",
      icon: FileText,
      href: "/track-applications",
    },
    {
      title: "Schedule Appointments",
      description: "Book biometric capture and pickup times",
      icon: Calendar,
      href: "/schedule-appointments",
    },
    {
      title: "Family Management",
      description: "Manage applications for family members",
      icon: Users,
      href: "/family-management",
    },
    {
      title: "Help Center",
      description: "Get assistance and answers to your questions",
      icon: HelpCircle,
      href: "/help",
    },
    {
      title: "Report Issues",
      description: "Report lost, delayed, or incorrect passports",
      icon: AlertTriangle,
      href: "/report-issues",
    },
    {
      title: "Notification Settings",
      description: "Customize your notification preferences",
      icon: MessageSquare,
      href: "/notification-settings",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F0F0F0] relative overflow-hidden">
      {/* Floating Adinkra Symbols */}
      <div className="fixed inset-0 pointer-events-none">
        {adinkraSymbols.map((symbol, index) => (
          <div
            key={index}
            className="absolute opacity-5"
            style={{
              animation: `float-${index} ${20 + index * 2}s infinite linear`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Image
              src={symbol.src || "/placeholder.svg"}
              alt={symbol.alt}
              width={100}
              height={100}
              className="w-16 h-16 md:w-24 md:h-24"
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes float-0 { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(100px, 100px) rotate(180deg); } 100% { transform: translate(0, 0) rotate(360deg); } }
        @keyframes float-1 { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-100px, 50px) rotate(-180deg); } 100% { transform: translate(0, 0) rotate(-360deg); } }
        @keyframes float-2 { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(50px, -100px) rotate(180deg); } 100% { transform: translate(0, 0) rotate(360deg); } }
        @keyframes float-3 { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-50px, -50px) rotate(-180deg); } 100% { transform: translate(0, 0) rotate(-360deg); } }
        @keyframes float-4 { 0% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(75px, 75px) rotate(180deg); } 100% { transform: translate(0, 0) rotate(360deg); } }
      `}</style>

      <Header />
      <main className="container mx-auto p-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Section */}
          <div className="col-span-full bg-white rounded-lg shadow p-6 border-l-4 border-l-[#CE1126]">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Welcome, {Users.name}! 👋</h1>
                <p className="text-gray-600">Welcome to your passport application dashboard</p>
              </div>
              <NotificationCenter />
            </div>
          </div>

          {/* Passport Type Display */}
          <div className="col-span-full">
            <PassportTypeDisplay />
          </div>

          {/* Feature Cards */}
          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                href={feature.href}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="col-span-full lg:col-span-2 space-y-6">
            <TaskProgress />
            <PhotoGuidelines />
            <ApplicationStats />
            <DeliveryVerification />
            <FamilyApplications />
            <ComplaintManagement />
          </div>

          {/* Right Column */}
          <div className="col-span-full lg:col-span-1 space-y-6">
            <AppointmentScheduler />
            <SecurityAlerts />
            <NotificationSettings />
            <HelpCenter />
          </div>
        </div>
      </main>
    </div>
  )
}

