import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

export function generateVerificationEmail(token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  return {
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  }
}

export function generateApplicationStatusEmail(status: string, applicationId: string) {
  const statusUrl = `${process.env.NEXT_PUBLIC_APP_URL}/track-applications/${applicationId}`

  return {
    subject: `Passport Application Status Update: ${status}`,
    html: `
      <h1>Your passport application status has been updated</h1>
      <p>Your application status is now: ${status}</p>
      <p>Click the link below to view more details:</p>
      <a href="${statusUrl}">${statusUrl}</a>
    `,
  }
}

