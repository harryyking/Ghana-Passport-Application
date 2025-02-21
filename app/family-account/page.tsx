"use client"

import { Header } from "@/components/header"
import { FamilyAccountManagement } from "@/components/family-account-management"

export default function FamilyAccountPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Family Account Management</h1>
        <FamilyAccountManagement />
      </main>
    </div>
  )
}

