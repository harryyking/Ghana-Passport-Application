"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Video, FileText, HelpCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const timelineSteps = [
  {
    title: "Application Submission",
    description: "Fill out the online form and upload required documents",
    status: "Step 1",
  },
  {
    title: "Application Review",
    description: "Your application is reviewed for completeness and accuracy",
    status: "Step 2",
  },
  {
    title: "Payment Processing",
    description: "Pay the required fees for your passport application",
    status: "Step 3",
  },
  {
    title: "Biometric Capture",
    description: "Schedule and attend a biometric capture appointment",
    status: "Step 4",
  },
  {
    title: "Application Processing",
    description: "Your application is processed and verified",
    status: "Step 5",
  },
  {
    title: "Passport Production",
    description: "Your passport is printed and quality checked",
    status: "Step 6",
  },
  {
    title: "Delivery",
    description: "Your passport is delivered to your chosen location",
    status: "Step 7",
  },
]

export default function UserEducationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Education & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="timeline">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="timeline">Application Timeline</TabsTrigger>
                <TabsTrigger value="help">Help Center</TabsTrigger>
                <TabsTrigger value="chat">AI Chatbot</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              <TabsContent value="timeline">
                <div className="space-y-8">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        {index < timelineSteps.length - 1 && <div className="w-px h-full bg-blue-300 my-2" />}
                      </div>
                      <div className="pb-8">
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600 mb-2">{step.description}</p>
                            <Badge>{step.status}</Badge>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="help">
                <Card>
                  <CardHeader>
                    <CardTitle>Help Center</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="flex items-center justify-start space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>FAQs</span>
                      </Button>
                      <Button className="flex items-center justify-start space-x-2">
                        <Video className="h-5 w-5" />
                        <span>Video Tutorials</span>
                      </Button>
                      <Button className="flex items-center justify-start space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>User Manuals</span>
                      </Button>
                      <Button className="flex items-center justify-start space-x-2">
                        <HelpCircle className="h-5 w-5" />
                        <span>Interactive Guides</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="chat">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Chatbot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-64 bg-gray-100 rounded-md p-4 overflow-y-auto">
                        {/* Chat messages would go here */}
                        <p className="text-center text-gray-500">Chat with our AI assistant</p>
                      </div>
                      <div className="flex space-x-2">
                        <Input placeholder="Type your question..." />
                        <Button>
                          <MessageSquare className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="feedback">
                <Card>
                  <CardHeader>
                    <CardTitle>Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="feedback">Your Feedback</Label>
                        <Textarea id="feedback" placeholder="Share your thoughts or suggestions..." rows={4} />
                      </div>
                      <Button type="submit">Submit Feedback</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

