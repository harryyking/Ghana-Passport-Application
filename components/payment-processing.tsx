"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createPayment } from "@/lib/actions"
import { initializePayment } from "@/lib/payment"

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

    const paymentInit = await initializePayment({
      amount: 150.0, // This will come from props based on passport type
      currency: "GHS",
      method: "card", // This will come from form state
      applicationId: "current-application-id", // This will come from props
      description: "Passport Application Fee",
    })

    if (!paymentInit.success) {
      setError("Payment initialization failed")
      return
    }

    const result = await createPayment({
      applicationId: "current-application-id", // This will come from props
      amount: 150.0,
      method: "card",
      transactionId: paymentInit.data.reference,
    })

    if (!result.success) {
      setError("Payment failed")
      return
    }

    setSuccess("Payment processed successfully")
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#CE1126] to-[#006B3F] p-0.5 rounded-xl">
                <div className="bg-white p-4 rounded-xl">
                  <Label className="text-sm font-medium mb-2 block">Card Number</Label>
                  <Input
                    placeholder="0000 0000 0000 0000"
                    className="border-0 bg-gray-50 h-12"
                    pattern="[0-9\s]{13,19}"
                    maxLength={19}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-[#CE1126] to-[#006B3F] p-0.5 rounded-xl">
                  <div className="bg-white p-4 rounded-xl">
                    <Label className="text-sm font-medium mb-2 block">Expiry Date</Label>
                    <Input placeholder="MM/YY" className="border-0 bg-gray-50 h-12" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#CE1126] to-[#006B3F] p-0.5 rounded-xl">
                  <div className="bg-white p-4 rounded-xl">
                    <Label className="text-sm font-medium mb-2 block">CVV</Label>
                    <Input placeholder="123" className="border-0 bg-gray-50 h-12" maxLength={4} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#CE1126] to-[#006B3F] p-0.5 rounded-xl">
                <div className="bg-white p-4 rounded-xl">
                  <h3 className="font-semibold mb-4">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Application Fee</span>
                      <span>GH₵100.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>GH₵50.00</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>GH₵150.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 bg-[#CE1126] hover:bg-[#CE1126]/90">
                Pay Now
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

