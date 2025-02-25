"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Calendar,
  Users,
  AlertTriangle,
  MessageSquare,
  StampIcon as Passport,
  RefreshCw,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Briefcase,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { RequirementSlider } from "@/components/requirement-slider"
import { ServiceCards } from "@/components/service-cards"

const features = [
  {
    title: "Review & Track Applications",
    description: "Review your application before submission and track its status",
    icon: FileText,
    href: "/review-and-track",
    color: "bg-blue-500",
  },
  {
    title: "Schedule Appointments",
    description: "Book biometric capture sessions",
    icon: Calendar,
    href: "/schedule-appointments",
    color: "bg-green-500",
  },
  {
    title: "Family Management",
    description: "Manage family applications",
    icon: Users,
    href: "/family-account",
    color: "bg-purple-500",
  },
  {
    title: "Report Issues",
    description: "Report problems with your application",
    icon: AlertTriangle,
    href: "/report-issues",
    color: "bg-red-500",
  },
  {
    title: "Help Center",
    description: "Get assistance and support",
    icon: MessageSquare,
    href: "/help-center",
    color: "bg-orange-500",
  },
  {
    title: "Travel Companion",
    description: "Pre-fill e-Visa forms and manage travel documents",
    icon: Briefcase,
    href: "/travel-companion",
    color: "bg-indigo-500",
  },
  {
    title: "User Education & Support",
    description: "Learn how the passport system works",
    icon: HelpCircle,
    href: "/user-education",
    color: "bg-teal-500",
  },
]

const quickActions = [
  {
    icon: Passport,
    label: "New Application",
    href: "/apply",
  },
  {
    icon: RefreshCw,
    label: "Renew Passport",
    href: "/renew",
  },
  {
    icon: Calendar,
    label: "Book Appointment",
    href: "/schedule-appointments",
  },
  {
    icon: FileText,
    label: "Check Status",
    href: "/track-applications",
  },
]

export default function DashboardPage() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) {
    return null
  }

  // Add floating Adinkra symbols to the dashboard background
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

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
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
        @keyframes float-0 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(100px, 100px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes float-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-100px, 50px) rotate(-180deg); }
          100% { transform: translate(0, 0) rotate(-360deg); }
        }
        @keyframes float-2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(50px, -100px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes float-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-50px, -50px) rotate(-180deg); }
          100% { transform: translate(0, 0) rotate(-360deg); }
        }
        @keyframes float-4 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(75px, 75px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>

      {/* Rest of the dashboard content */}
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, {user.ghanaCardNumber}</h1>
                <p className="text-blue-100">Ghana Card Holder</p>
              </div>
              <Image
                src={user.photoUrl || "/placeholder.svg"}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <action.icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">{action.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Processing Time</p>
                  <p className="text-2xl font-bold">5-7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Applications</p>
                  <p className="text-2xl font-bold">2 Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Next Appointment</p>
                  <p className="text-2xl font-bold">Tomorrow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Passport Requirements section */}
        <Card>
          <CardHeader>
            <CardTitle>Passport Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <RequirementSlider />
          </CardContent>
        </Card>

        {/* Service Cards */}
        <ServiceCards />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${feature.color} bg-opacity-10`}>
                      <feature.icon className={`h-6 w-6 ${feature.color.replace("bg-", "text-")}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Application Submitted</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <Badge>Processing</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Appointment Scheduled</p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
                <Badge variant="default">Confirmed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

