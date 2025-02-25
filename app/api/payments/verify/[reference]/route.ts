import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { reference: string } }) {
  try {

    const { reference } = params

    // Verify payment with payment provider
    // This is a placeholder for the actual payment verification
    const verificationResult = await verifyPaymentWithProvider(reference)

    if (verificationResult.status === "success") {
      // Update payment record
      const payment = await prisma.payment.update({
        where: { transactionId: reference },
        data: {
          status: "completed",
          paidAt: new Date(),
        },
      })

      // Update application status
      await prisma.application.update({
        where: { id: payment.applicationId },
        data: {
          status: "PAYMENT_VERIFIED",
        },
      })

      return NextResponse.json({
        success: true,
        data: { status: "completed" },
      })
    }

    return NextResponse.json({
      success: false,
      data: { status: "failed" },
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Placeholder function for payment verification
async function verifyPaymentWithProvider(reference: string) {
  // Implement actual payment verification here
  return {
    status: "success",
    reference,
  }
}

