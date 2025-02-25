"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type {
  PassportType,
  ProcessingSpeed,
  ApplicationStatus,
  UserRole,
  ComplaintType,
  ComplaintStatus,
  DeliveryStatus,
} from "@prisma/client"

// User Actions
export async function createUser(data: {
  ghanaCardNumber: string
  email: string
  password: string
  fullName: string
  dateOfBirth: Date
  placeOfBirth: string
  phoneNumber: string
}) {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        role: "USER",
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: "Failed to create user" }
  }
}

// Application Actions
export async function createApplication(data: {
  userId: string
  applicationType: PassportType
  processingSpeed: ProcessingSpeed
  isRenewal: boolean
  previousPassportNumber?: string
  emergencyRequest: boolean
}) {
  try {
    const application = await prisma.application.create({
      data: {
        ...data,
        status: "DRAFT",
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: application }
  } catch (error) {
    return { success: false, error: "Failed to create application" }
  }
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status },
    })
    revalidatePath("/dashboard")
    revalidatePath("/admin/applications")
    return { success: true, data: application }
  } catch (error) {
    return { success: false, error: "Failed to update application status" }
  }
}

// Document Actions
export async function uploadDocument(data: {
  applicationId: string
  userId: string
  type: string
  fileUrl: string
}) {
  try {
    const document = await prisma.document.create({
      data: {
        ...data,
        status: "PENDING",
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: document }
  } catch (error) {
    return { success: false, error: "Failed to upload document" }
  }
}

// Payment Actions
export async function createPayment(data: {
  applicationId: string
  amount: number
  method: string
  transactionId?: string
}) {
  try {
    const payment = await prisma.payment.create({
      data: {
        ...data,
        currency: "GHS",
        status: "pending",
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: payment }
  } catch (error) {
    return { success: false, error: "Failed to create payment" }
  }
}

// Appointment Actions
export async function scheduleAppointment(data: {
  applicationId: string
  type: string
  date: Date
  time: string
  location: string
}) {
  try {
    const appointment = await prisma.appointment.create({
      data: {
        ...data,
        status: "scheduled",
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: appointment }
  } catch (error) {
    return { success: false, error: "Failed to schedule appointment" }
  }
}

// Delivery Actions
export async function createDelivery(data: {
  applicationId: string
  address: string
  scheduledDate?: Date
  recipientName?: string
  recipientPhone?: string
}) {
  try {
    const delivery = await prisma.delivery.create({
      data: {
        ...data,
        status: "PENDING",
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: delivery }
  } catch (error) {
    return { success: false, error: "Failed to create delivery" }
  }
}

export async function updateDeliveryStatus(id: string, status: DeliveryStatus) {
  try {
    const delivery = await prisma.delivery.update({
      where: { id },
      data: { status },
    })
    revalidatePath("/dashboard")
    return { success: true, data: delivery }
  } catch (error) {
    return { success: false, error: "Failed to update delivery status" }
  }
}

// Complaint Actions
export async function submitComplaint(data: {
  userId: string
  type: ComplaintType
  description: string
}) {
  try {
    const complaint = await prisma.complaint.create({
      data: {
        ...data,
        status: "SUBMITTED",
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: complaint }
  } catch (error) {
    return { success: false, error: "Failed to submit complaint" }
  }
}

export async function updateComplaintStatus(id: string, status: ComplaintStatus, resolution?: string) {
  try {
    const complaint = await prisma.complaint.update({
      where: { id },
      data: {
        status,
        resolution,
        resolvedAt: status === "RESOLVED" ? new Date() : undefined,
      },
    })
    revalidatePath("/dashboard")
    return { success: true, data: complaint }
  } catch (error) {
    return { success: false, error: "Failed to update complaint status" }
  }
}

// Admin Actions
export async function assignRole(userId: string, role: UserRole) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    })
    revalidatePath("/admin/users")
    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: "Failed to assign role" }
  }
}

// Audit Log Actions
export async function createAuditLog(data: {
  userId: string
  action: string
  details?: string
  ipAddress?: string
  userAgent?: string
}) {
  try {
    const auditLog = await prisma.auditLog.create({
      data,
    })
    return { success: true, data: auditLog }
  } catch (error) {
    return { success: false, error: "Failed to create audit log" }
  }
}

