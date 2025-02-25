const SMS_API_KEY = process.env.SMS_API_KEY

export async function sendSMS(to: string, message: string) {
  try {
    const response = await fetch("https://api.sms-gateway.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SMS_API_KEY}`,
      },
      body: JSON.stringify({
        to,
        message,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send SMS")
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to send SMS:", error)
    return { success: false, error: "Failed to send SMS" }
  }
}

export function generateVerificationSMS(code: string) {
  return `Your Ghana Passport verification code is: ${code}. Valid for 10 minutes.`
}

export function generateApplicationStatusSMS(status: string, applicationId: string) {
  return `Your passport application (${applicationId}) status is now: ${status}. Visit our portal for more details.`
}

