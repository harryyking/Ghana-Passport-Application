"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

interface PaymentProcessingProps {
  isRenewal?: boolean
}

export function PaymentProcessing({ isRenewal = false }: PaymentProcessingProps) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [feeType, setFeeType] = useState("")

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!paymentMethod) {
      setError("Please select a payment method")
      return
    }

    if (!amount || isNaN(Number(amount))) {
      setError("Please enter a valid amount")
      return
    }

    try {
      // Here you would integrate with your payment gateway
      console.log(`Processing ${amount} GHS payment via ${paymentMethod}`)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess("Payment processed successfully")
    } catch (error) {
      setError("Payment failed. Please try again.")
    }
  }

  return (
    <Card className="border rounded-sm">
      <CardHeader>
        <CardTitle>{isRenewal ? "Renewal Payment Processing" : "Payment Processing"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-4">
            <Label>Select Payment Method</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                className={`border rounded-sm p-4 cursor-pointer hover:border-primary transition-colors ${
                  paymentMethod === "card" ? "border-primary bg-primary/5" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex gap-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1294-61tefkr0xfvcZTrGstFBRh6lTKzORA.png"
                    alt="Payment Methods"
                    width={300}
                    height={50}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div
                className={`border rounded-sm p-4 cursor-pointer hover:border-primary transition-colors ${
                  paymentMethod === "momo" ? "border-primary bg-primary/5" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("momo")}
              >
                <div className="text-center">
                  <p className="font-medium">Mobile Money</p>
                  <p className="text-sm text-gray-500">MTN, Vodafone, AirtelTigo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select Fee Type</Label>
            <RadioGroup onValueChange={(value) => setFeeType(value)} value={feeType} className="border rounded-sm p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard">Standard Fee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express">Express Fee</Label>
              </div>
              {isRenewal && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="renewal" id="renewal" />
                  <Label htmlFor="renewal">Renewal Fee</Label>
                </div>
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (GHS)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="rounded-sm"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 rounded-sm">
            Process Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

