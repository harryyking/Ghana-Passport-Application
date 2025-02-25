"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { uploadDocument } from "@/lib/actions"

type Document = {
  name: string
  file: File
  type: "pdf" | "image"
  status: "uploading" | "processing" | "verified" | "error"
  progress: number
}

const requiredDocuments = [
  { name: "Birth Certificate", id: "birthCertificate" },
  { name: "Ghana Card (Front & Back)", id: "ghanaCard" },
  { name: "Proof of Residence", id: "proofOfResidence" },
]

async function uploadFile(file: File): Promise<{ success: boolean; url?: string }> {
  // Simulate file upload
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, url: "https://example.com/uploaded-file.pdf" }
}

export function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, documentName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const uploadResult = await uploadFile(file)
    if (!uploadResult.success) {
      setError("Failed to upload document")
      return
    }

    const result = await uploadDocument({
      applicationId: "current-application-id", // This will come from props
      userId: "current-user-id", // This will come from session
      type: documentName,
      fileUrl: uploadResult.url!,
    })

    if (!result.success) {
      setError("Failed to save document")
      return
    }

    const newDocument: Document = {
      name: documentName,
      file,
      type: file.type.startsWith("image/") ? "image" : "pdf",
      status: "uploading",
      progress: 0,
    }

    setDocuments((prev) => [...prev, newDocument])
    setError("")

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      if (progress <= 100) {
        setDocuments((prev) => prev.map((doc) => (doc.name === documentName ? { ...doc, progress } : doc)))
      } else {
        clearInterval(interval)
        setDocuments((prev) =>
          prev.map((doc) => (doc.name === documentName ? { ...doc, status: "verified", progress: 100 } : doc)),
        )
      }
    }, 300)
  }

  const handleRemoveDocument = (documentName: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.name !== documentName))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {requiredDocuments.map((doc) => {
            const uploadedDoc = documents.find((d) => d.name === doc.name)
            return (
              <div key={doc.id} className="space-y-2">
                <Label htmlFor={doc.id}>{doc.name}</Label>
                <div className="relative">
                  <input
                    type="file"
                    id={doc.id}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileUpload(e, doc.name)}
                  />
                  <div className="border-2 border-dashed rounded-md p-4 text-center">
                    {uploadedDoc ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          {uploadedDoc.name}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveDocument(doc.name)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-6 w-6" />
                        <p className="text-sm">Upload {doc.name}</p>
                      </>
                    )}
                  </div>
                </div>
                {uploadedDoc && uploadedDoc.status === "uploading" && (
                  <Progress value={uploadedDoc.progress} className="h-1" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

