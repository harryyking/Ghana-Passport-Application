"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, CheckCircle } from "lucide-react"

export function FacialRecognition() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        // Here you would typically send the image data to your backend for verification
        // For this example, we'll simulate a successful verification after a short delay
        setTimeout(() => {
          setIsVerified(true)
          setIsCapturing(false)
          if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
            tracks.forEach((track) => track.stop())
          }
        }, 2000)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facial Recognition for Delivery Authentication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isCapturing && !isVerified && (
          <Button onClick={startCapture} className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Start Facial Recognition
          </Button>
        )}
        {isCapturing && (
          <div className="space-y-4">
            <video ref={videoRef} autoPlay className="w-full" />
            <Button onClick={captureImage} className="w-full">
              Capture Image
            </Button>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />
        {isVerified && (
          <div className="flex items-center justify-center text-green-600">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Identity Verified</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

