"use client"

import type React from "react"

import { createContext, useState, useContext, ReactNode } from "react"

interface User {
  ghanaCardNumber: ReactNode
  photoUrl: string
  id: string
  name: string
  role: "user" | "admin"
  region?: string // For admin users
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isAdminLoggedIn: boolean
  login: (ghanaCardNumber: string, password: string, twoFactorCode?: string) => Promise<void>
  adminLogin: (email: string, password: string, twoFactorCode?: string) => Promise<void>
  logout: () => void
  checkRenewalEligibility: () => { isEligible: boolean; daysUntilExpiry: number }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (ghanaCardNumber: string, password: string, twoFactorCode?: string) => {
    // In a real app, you would validate credentials and fetch user data here
    // For now, we'll simulate a successful login
    setUser({
      id: "1",
      name: "John Doe",
      role: "user",
      photoUrl: '',
      ghanaCardNumber: 'GHA-7345432-0'
    })
  }

  const adminLogin = async (email: string, password: string, twoFactorCode?: string) => {
    // In a real app, you would validate admin credentials and fetch admin data here
    // For now, we'll simulate a successful admin login
    setUser({
      id: "admin1",
      name: "Admin User",
      role: "admin",
      ghanaCardNumber: 'GHA-233455-0',
      photoUrl: '',
      region: "Greater Accra",
    })
  }

  const logout = () => {
    setUser(null)
  }

  const checkRenewalEligibility = () => {
    // In a real app, you would check the user's passport expiry date
    // For now, we'll simulate a passport that's eligible for renewal
    const daysUntilExpiry = 180 // 6 months
    const isEligible = daysUntilExpiry <= 365 // Eligible if expiring within a year

    return { isEligible, daysUntilExpiry }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user && user.role === "user",
        isAdminLoggedIn: !!user && user.role === "admin",
        login,
        adminLogin,
        logout,
        checkRenewalEligibility,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

