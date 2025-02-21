"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, FileText } from "lucide-react"

type Document = {
  name: string
  file: File
  type: "pdf" | "image"
}

export function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [error, setError] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB")
        return
      }

      const fileType = file.type.startsWith("image/") ? "image" : "pdf"
      if (fileType !== "image" && fileType !== "pdf") {
        setError("Only PDF and image files are allowed")
        return
      }

      setDocuments((prev) => [...prev, { name: file.name, file, type: fileType }])
      setError("")
    }
  }

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const renderPreview = (doc: Document) => {
    if (doc.type === "pdf") {
      return <FileText className="h-8 w-8 text-blue-500" />
    } else {
      return (
        <div className="relative h-20 w-20">
          <img
            src={URL.createObjectURL(doc.file) || "/placeholder.svg"}
            alt={doc.name}
            className="h-full w-full object-cover rounded"
          />
        </div>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fileUpload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 5MB)</p>
              </div>
            </Label>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <div className="flex items-center space-x-2">
                  {renderPreview(doc)}
                  <span>{doc.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveDocument(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

