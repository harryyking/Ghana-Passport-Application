"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2, Search, Eye } from "lucide-react"

interface FamilyMember {
  id: string
  name: string
  relationship: "spouse" | "child"
  identificationNumber: string
  identificationType: "ghana-card" | "birth-certificate"
  applications: Application[]
}

interface Application {
  id: string
  type: "new" | "renewal"
  status: "pending" | "processing" | "approved" | "rejected"
  submissionDate: string
}

export function FamilyAccountManagement() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [activeTab, setActiveTab] = useState<"add" | "manage">("manage")
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "" as "spouse" | "child",
    identificationNumber: "",
    identificationType: "" as "ghana-card" | "birth-certificate",
  })
  const [searchQuery, setSearchQuery] = useState("")

  // Mock applications data
  const mockApplications: Application[] = [
    {
      id: "APP123",
      type: "new",
      status: "processing",
      submissionDate: "2024-02-12",
    },
  ]

  const handleAddMember = () => {
    if (newMember.name && newMember.relationship && newMember.identificationNumber) {
      setFamilyMembers([
        ...familyMembers,
        {
          id: Date.now().toString(),
          ...newMember,
          applications: mockApplications,
        },
      ])
      setNewMember({
        name: "",
        relationship: "" as "spouse" | "child",
        identificationNumber: "",
        identificationType: "" as "ghana-card" | "birth-certificate",
      })
      setActiveTab("manage")
    }
  }

  const handleRemoveMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "processing":
        return "warning"
      case "approved":
        return "success"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const filteredMembers = familyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.identificationNumber.includes(searchQuery),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Account Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "add" | "manage")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Family Members</TabsTrigger>
            <TabsTrigger value="add">Add Family Member</TabsTrigger>
          </TabsList>

          <TabsContent value="manage">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search by name or ID number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>ID Type</TableHead>
                    <TableHead>ID Number</TableHead>
                    <TableHead>Latest Application</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell className="capitalize">{member.relationship}</TableCell>
                      <TableCell className="capitalize">{member.identificationType.replace("-", " ")}</TableCell>
                      <TableCell>{member.identificationNumber}</TableCell>
                      <TableCell>
                        {member.applications[0] && (
                          <Badge>
                            {member.applications[0].status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Applications
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleRemoveMember(member.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredMembers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No family members found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select
                  value={newMember.relationship}
                  onValueChange={(value: "spouse" | "child") => {
                    setNewMember({
                      ...newMember,
                      relationship: value,
                      identificationType: value === "spouse" ? "ghana-card" : "birth-certificate",
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newMember.relationship && (
                <div className="space-y-2">
                  <Label htmlFor="identificationNumber">
                    {newMember.relationship === "spouse" ? "Ghana Card Number" : "Birth Certificate Number"}
                  </Label>
                  <Input
                    id="identificationNumber"
                    value={newMember.identificationNumber}
                    onChange={(e) => setNewMember({ ...newMember, identificationNumber: e.target.value })}
                    placeholder={newMember.relationship === "spouse" ? "GHA-XXXXXXXXXX" : "BC-XXXXXXXXXX"}
                    required
                  />
                </div>
              )}

              <Button onClick={handleAddMember} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Family Member
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

