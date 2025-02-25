"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/header"

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

export default function LoginPage() {
  const [ghanaCardNumber, setGhanaCardNumber] = useState("GHA-")
  const [password, setPassword] = useState("")
  const [twoFactorCode, setTwoFactorCode] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleGhanaCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.startsWith("GHA-") || value === "") {
      setGhanaCardNumber(value)
      setError("")
    } else {
      setError("Ghana Card number must start with GHA-")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ghanaCardNumber.startsWith("GHA-")) {
      setError("Ghana Card number must start with GHA-")
      return
    }
    try {
      if (!showTwoFactor) {
        setShowTwoFactor(true)
      } else {
        
        router.push("/dashboard")
      }
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.")
    }
  }

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
      <main className="container mx-auto px-4 py-8 relative">
        <Card className="mx-auto max-w-md backdrop-blur-sm bg-white/90">
          <CardHeader className="space-y-1 text-center">
            <Image
              src="https://v2p87u92t0.ufs.sh/f/eqXEbyZmWEZ5P8iiKl0LCyfkmqHADbXM6QnKdWGupzhN07w2"
              alt="Coat of arms of Ghana"
              width={120}
              height={120}
              className="mx-auto mb-4"
              priority
            />
            <CardTitle className="text-2xl">Login</CardTitle>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {!showTwoFactor ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ghanaCardNumber">Ghana Card Number</Label>
                    <Input
                      id="ghanaCardNumber"
                      value={ghanaCardNumber}
                      onChange={handleGhanaCardChange}
                      className={error ? "border-red-500" : ""}
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
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="twoFactorCode">Enter 2FA Code</Label>
                  <Input
                    id="twoFactorCode"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    required
                  />
                </div>
              )}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                {showTwoFactor ? "Verify" : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

