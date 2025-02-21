"use client"

import { Header } from "@/components/header"
import { PreferredDeliverySlots } from "@/components/preferred-delivery-slots"

export default function DeliverySchedulePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Preferred Delivery Schedule</h1>
        <PreferredDeliverySlots />
      </main>
    </div>
  )
}

