"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, CreditCard, Clock, Camera, Shield } from "lucide-react"

const requirements = [
  {
    title: "Required Documents",
    items: ["Birth Certificate", "Ghana Card", "Proof of Profession", "Passport Photos (2)"],
    icon: FileText,
    color: "bg-[#e8f5e9]", // Pastel green
    iconColor: "text-[#2e7d32]",
  },
  {
    title: "Additional Requirements",
    items: ["Previous Passport (if renewal)", "Marriage Certificate (if applicable)", "Affidavit (if needed)"],
    icon: Shield,
    color: "bg-[#e3f2fd]", // Pastel blue
    iconColor: "text-[#1565c0]",
  },
  {
    title: "Photo Requirements",
    items: ["White background", "No glasses", "Neutral expression", "Recent (< 6 months)"],
    icon: Camera,
    color: "bg-[#f3e5f5]", // Pastel purple
    iconColor: "text-[#7b1fa2]",
  },
  {
    title: "Processing Time",
    items: ["Standard: 15 working days", "Express: 5 working days", "Emergency: 24-48 hours"],
    icon: Clock,
    color: "bg-[#fff3e0]", // Pastel orange
    iconColor: "text-[#ef6c00]",
  },
  {
    title: "Payment Information",
    items: ["Standard Fee: GH₵100", "Express Fee: GH₵200", "Accepted: MoMo, Card"],
    icon: CreditCard,
    color: "bg-[#fce4ec]", // Pastel pink
    iconColor: "text-[#c2185b]",
  },
]

export default function PassportRequirements() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {requirements.map((req, index) => {
        const Icon = req.icon
        return (
          <Card key={index} className={`${req.color} border-none hover:shadow-lg transition-shadow`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-white/50 ${req.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{req.title}</h3>
              </div>
              <ul className="space-y-2">
                {req.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${req.iconColor}`} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

