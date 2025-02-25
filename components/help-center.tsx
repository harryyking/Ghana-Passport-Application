"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, Mail, MessageSquare } from "lucide-react"

const faqs = [
  {
    question: "How long does passport processing take?",
    answer:
      "Standard processing takes 15 working days. Express service is available for 5 working days at an additional fee.",
  },
  {
    question: "What are the passport photo requirements?",
    answer: "Photos must be 35mm x 45mm, taken against a white background, and not older than 6 months.",
  },
  {
    question: "Can I track my passport application?",
    answer: "Yes, you can track your application status through this portal using your application number.",
  },
]

export function HelpCenter() {
  const [activeTab, setActiveTab] = useState<"faq" | "contact" | "ai">("faq")
  const [query, setQuery] = useState("")
  const [conversation, setConversation] = useState<{ role: "user" | "ai"; content: string }[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setConversation((prev) => [...prev, { role: "user", content: query }])
    // Simulate AI response
    const aiResponse = await simulateAIResponse(query)
    setConversation((prev) => [...prev, { role: "ai", content: aiResponse }])
    setQuery("")
  }

  const simulateAIResponse = async (query: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return `Here's some information about "${query}" related to passport services...`
  }

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle>Help Center</CardTitle>
        <div className="flex gap-2 mt-2">
          <Button variant={activeTab === "faq" ? "default" : "outline"} onClick={() => setActiveTab("faq")}>
            FAQs
          </Button>
          <Button variant={activeTab === "contact" ? "default" : "outline"} onClick={() => setActiveTab("contact")}>
            Contact
          </Button>
          <Button variant={activeTab === "ai" ? "default" : "outline"} onClick={() => setActiveTab("ai")}>
            AI Assistant
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "faq" && (
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-gray-500">+233 XX XXX XXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-500">support@passports.gov.gh</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-gray-500">Available 9 AM - 5 PM GMT</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="space-y-4">
            <ScrollArea className="h-[300px] pr-4">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 p-3 rounded-lg ${
                    message.role === "ai" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <strong>{message.role === "ai" ? "AI: " : "You: "}</strong>
                  {message.content}
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about passport services..."
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

