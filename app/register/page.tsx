"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/header"
import Image from "next/image"

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

export default function RegisterPage() {
  const [ghanaCardNumber, setGhanaCardNumber] = useState("GHA-")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const { register } = useAuth()

  const handleGhanaCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    if (value === "") {
      setGhanaCardNumber("GHA-")
      setError("")
      return
    }

    // Format: GHA-000000000-0
    const regex = /^GHA-\d{0,9}(-\d{0,1})?$/
    if (regex.test(value)) {
      setGhanaCardNumber(value)
      setError("")
    } else {
      setError("Invalid Ghana Card number format")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const cardRegex = /^GHA-\d{9}-\d{1}$/
    if (!cardRegex.test(ghanaCardNumber)) {
      setError("Invalid Ghana Card number format (GHA-000000000-0)")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    try {
      await register(ghanaCardNumber, password, fullName, dateOfBirth, phoneNumber)
      router.push("/login")
    } catch (error) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] relative overflow-hidden">
      {/* Floating Adinkra Symbols - Only animate when not focused */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${isFocused ? "opacity-0" : "opacity-100"}`}
      >
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
      <main className="container mx-auto px-4 py-8 relative">
        <Card className="mx-auto max-w-md backdrop-blur-sm bg-white/90">
          <CardHeader className="space-y-1 text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0915-O1ZIx8pIjNk8OsGf7fyoqFMV27J9Tx.jpeg"
              alt="Ghana.GOV Logo"
              width={150}
              height={50}
              className="mx-auto mb-4"
            />
            <CardTitle className="text-2xl">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleRegister}
              className="space-y-4"
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                // Only unfocus if the next active element is not in the form
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIsFocused(false)
                }
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="ghanaCardNumber">Ghana Card Number</Label>
                <Input
                  id="ghanaCardNumber"
                  value={ghanaCardNumber}
                  onChange={handleGhanaCardChange}
                  className={error ? "border-red-500" : ""}
                  placeholder="GHA-000000000-0"
                  required
                />
                <p className="text-xs text-gray-500">Format: GHA-000000000-0</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+233 XX XXX XXXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Register
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-green-600 hover:underline">
                Already have an account? Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

