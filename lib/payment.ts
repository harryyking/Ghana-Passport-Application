export type PaymentMethod = "momo" | "card" | "bank-transfer"

interface PaymentDetails {
  amount: number
  currency: string
  method: PaymentMethod
  applicationId: string
  description: string
}

export async function initializePayment(details: PaymentDetails) {
  try {
    const response = await fetch("/api/payments/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })

    if (!response.ok) {
      throw new Error("Failed to initialize payment")
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Failed to initialize payment:", error)
    return { success: false, error: "Failed to initialize payment" }
  }
}

export async function verifyPayment(reference: string) {
  try {
    const response = await fetch(`/api/payments/verify/${reference}`)

    if (!response.ok) {
      throw new Error("Failed to verify payment")
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Failed to verify payment:", error)
    return { success: false, error: "Failed to verify payment" }
  }
}

