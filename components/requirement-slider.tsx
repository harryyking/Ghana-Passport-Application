"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, CreditCard, Clock, Camera, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const requirements = [
  {
    title: "Required Documents",
    items: ["Birth Certificate", "Ghana Card", "Proof of Profession", "Passport Size Photos (2)"],
    icon: FileText,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Additional Requirements",
    items: ["Previous Passport (if renewal)", "Marriage Certificate (if applicable)", "Affidavit (if applicable)"],
    icon: Shield,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Photo Requirements",
    items: ["White background", "No glasses", "Neutral expression", "Recent photo (< 6 months)"],
    icon: Camera,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Processing Time",
    items: ["Standard: 15 working days", "Express: 5 working days", "Emergency: 24-48 hours"],
    icon: Clock,
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    title: "Payment Information",
    items: ["Standard Fee: GH₵100", "Express Fee: GH₵200", "Accepted: MoMo, Card, Bank Transfer"],
    icon: CreditCard,
    gradient: "from-pink-500 to-rose-500",
  },
]

export function RequirementSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current === requirements.length - 1 ? 0 : current + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((current) => (current === 0 ? requirements.length - 1 : current - 1))
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((current) => (current === requirements.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {requirements.map((req, index) => {
            const Icon = req.icon
            return (
              <Card key={index} className={cn("min-w-full border-0", "transition-colors")}>
                <CardContent className="p-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${req.gradient} opacity-5`} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold">{req.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {req.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {requirements.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

