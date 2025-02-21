"use client"

import { Header } from "@/components/header"
import { TravelAdvisory } from "@/components/travel-advisory"

export default function TravelAdvisoryPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Travel Advisory</h1>
        <TravelAdvisory />
      </main>
    </div>
  )
}

