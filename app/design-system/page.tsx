"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import Image from "next/image"
import { Search, ChevronDown } from "lucide-react"

export default function DesignSystemPage() {
  const [sliderValue, setSliderValue] = useState([50])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-serif mb-8">Design System</h1>

        {/* Buttons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary Button</Button>
              <Button variant="outline">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tags & Badges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tags & Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Text Inputs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Text Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Search with Dropdown</Label>
              <div className="relative">
                <Input type="search" placeholder="Search for services..." className="pl-10 pr-4" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Standard Input</Label>
              <Input placeholder="Enter text here" />
            </div>
            <div className="space-y-2">
              <Label>Disabled Input</Label>
              <Input disabled placeholder="Disabled input" />
            </div>
          </CardContent>
        </Card>

        {/* Checkboxes & Radios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Checkboxes & Radios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Checkboxes</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" disabled checked />
                  <label
                    htmlFor="disabled"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Disabled checked
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Radio Buttons</Label>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option Two</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Slider */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Slider</CardTitle>
          </CardHeader>
          <CardContent>
            <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} className="w-[60%]" />
            <div className="mt-2">Value: {sliderValue}</div>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is a passport?</AccordionTrigger>
                <AccordionContent>
                  A passport is an official government document that certifies the holder's identity and citizenship...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How long is the process?</AccordionTrigger>
                <AccordionContent>
                  Standard processing takes 15 working days. Express service is available for 5 working days...
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all">All applications content</TabsContent>
              <TabsContent value="active">Active applications content</TabsContent>
              <TabsContent value="completed">Completed applications content</TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Profile Cards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="relative">
                <Image src="/placeholder.svg" alt="Profile" width={60} height={60} className="rounded-full" />
                <Badge className="absolute -bottom-2 -right-2">GOLD</Badge>
              </div>
              <div>
                <h3 className="font-semibold">Jane Cooper</h3>
                <p className="text-sm text-gray-500">Passport Officer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="p-4 border rounded-lg flex items-center justify-center">
                <Image src="/placeholder.svg" alt="Visa" width={60} height={40} />
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-center">
                <Image src="/placeholder.svg" alt="Mastercard" width={60} height={40} />
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-center">
                <Image src="/placeholder.svg" alt="Mobile Money" width={60} height={40} />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

