"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const guidelines = [
  {
    title: "Photo Dimensions",
    content: ["35mm x 45mm (3.5 x 4.5 cm)", "Head height between 32-36mm", "Face must take up 70-80% of photo"],
    background: "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
  },
  {
    title: "Photo Quality",
    content: [
      "High resolution, sharp focus",
      "No shadows or reflections",
      "Proper exposure and contrast",
      "Minimum 600 DPI resolution",
    ],
    background: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
  },
  {
    title: "Background & Lighting",
    content: ["Plain white background", "Even lighting on face", "No shadows behind head", "Natural skin tone"],
    background: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Pose & Expression",
    content: ["Neutral expression", "Looking straight at camera", "Both eyes open", "Mouth closed", "No head tilt"],
    background: "bg-gradient-to-br from-violet-500/10 to-indigo-500/10",
  },
  {
    title: "Appearance",
    content: [
      "No head covering (except religious)",
      "No glasses or tinted lenses",
      "No face paint or temporary tattoos",
      "Natural makeup only",
    ],
    background: "bg-gradient-to-br from-pink-500/10 to-rose-500/10",
  },
]

export function PhotoGuidelines() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current === guidelines.length - 1 ? 0 : current + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {guidelines.map((guideline, index) => (
            <div key={index} className={cn("min-w-full p-6 flex flex-col space-y-4", guideline.background)}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{guideline.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {index + 1}/{guidelines.length}
                </span>
              </div>
              <ul className="space-y-2">
                {guideline.content.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {guidelines.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-gray-300",
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

