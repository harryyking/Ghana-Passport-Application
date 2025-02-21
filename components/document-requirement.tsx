"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, FileText, Check, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { PassportType } from "./passport-type-selector"

interface Document {
  id: string
  name: string
  file: File
  status: "uploading" | "complete" | "error"
  progress: number
}

interface DocumentRequirementsProps {
  passportType: PassportType
  onDocumentsComplete: (complete: boolean) => void
}

const getRequiredDocuments = (type: PassportType) => {
  const baseDocuments = ["Passport Photo", "Ghana Card"]

  const additionalDocuments = {
    standard: ["Proof of Payment"],
    diplomatic: ["Appointment Letter", "Official Government ID", "Ministry Endorsement"],
    service: ["Employment Verification", "Official Letter from Government Department"],
    official: ["Authorization Letter", "Employment Proof", "Government ID"],
    replacement: ["Police Report", "Affidavit", "Old Passport Copy (if available)"],
  }

  return [...baseDocuments, ...additionalDocuments[type]]
}

export function DocumentRequirements({ passportType, onDocumentsComplete }: DocumentRequirementsProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const requiredDocuments = getRequiredDocuments(passportType)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const newDocument: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: documentName,
      file,
      status: "uploading",
      progress: 0,
    }

    setDocuments((prev) => [...prev, newDocument])

    // Simulate file upload
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      if (progress <= 100) {
        setDocuments((prev) => prev.map((doc) => (doc.id === newDocument.id ? { ...doc, progress } : doc)))
      } else {
        clearInterval(interval)
        setDocuments((prev) =>
          prev.map((doc) => (doc.id === newDocument.id ? { ...doc, status: "complete", progress: 100 } : doc)),
        )
        checkCompletion()
      }
    }, 300)
  }

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    checkCompletion()
  }

  const checkCompletion = () => {
    const uploadedDocuments = new Set(documents.map((doc) => doc.name))
    const isComplete = requiredDocuments.every((doc) => uploadedDocuments.has(doc))
    onDocumentsComplete(isComplete)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {requiredDocuments.map((docName) => {
            const uploadedDoc = documents.find((doc) => doc.name === docName)

            return (
              <div key={docName} className="space-y-2">
                <Label>{docName}</Label>
                {!uploadedDoc ? (
                  <div className="border-2 border-dashed rounded-lg p-4">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <Label
                        htmlFor={`file-${docName}`}
                        className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                      >
                        Click to upload or drag and drop
                      </Label>
                      <input
                        id={`file-${docName}`}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, docName)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <p className="text-xs text-gray-500">PDF, JPG, or PNG (max. 5MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{uploadedDoc.file.name}</p>
                      {uploadedDoc.status === "uploading" && (
                        <Progress value={uploadedDoc.progress} className="h-1 mt-2" />
                      )}
                    </div>
                    {uploadedDoc.status === "complete" ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : uploadedDoc.status === "error" ? (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    ) : null}
                    <Button variant="ghost" size="sm" onClick={() => removeDocument(uploadedDoc.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

