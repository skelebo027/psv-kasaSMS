"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus, Trash } from "lucide-react"

export function WhatsAppTemplates() {
  const [activeTab, setActiveTab] = useState("all")

  const templates = [
    {
      id: "welcome",
      name: "Welcome Message",
      category: "marketing",
      status: "approved",
      language: "English",
      components: [
        { type: "header", format: "text", text: "Welcome to KasaSMS!" },
        {
          type: "body",
          text: "Hello {{1}}, welcome to KasaSMS! We're excited to have you on board. Feel free to explore our services and reach out if you have any questions.",
        },
        { type: "footer", text: "KasaSMS - Your Messaging Partner" },
      ],
    },
    {
      id: "order_confirmation",
      name: "Order Confirmation",
      category: "transactional",
      status: "approved",
      language: "English",
      components: [
        { type: "header", format: "text", text: "Order Confirmation" },
        {
          type: "body",
          text: "Hi {{1}}, your order #{{2}} has been confirmed and is being processed. Expected delivery: {{3}}. Thank you for your purchase!",
        },
        { type: "footer", text: "KasaSMS - Your Messaging Partner" },
      ],
    },
    {
      id: "payment_reminder",
      name: "Payment Reminder",
      category: "utility",
      status: "approved",
      language: "English",
      components: [
        { type: "header", format: "text", text: "Payment Reminder" },
        {
          type: "body",
          text: "Hello {{1}}, this is a friendly reminder that your payment of {{2}} is due on {{3}}. Please make your payment to avoid service interruption.",
        },
        { type: "footer", text: "KasaSMS - Your Messaging Partner" },
      ],
    },
    {
      id: "appointment",
      name: "Appointment Reminder",
      category: "utility",
      status: "pending",
      language: "English",
      components: [
        { type: "header", format: "text", text: "Appointment Reminder" },
        {
          type: "body",
          text: "Hi {{1}}, this is a reminder of your appointment scheduled for {{2}} at {{3}}. Please confirm your attendance.",
        },
        { type: "footer", text: "KasaSMS - Your Messaging Partner" },
      ],
    },
    {
      id: "feedback",
      name: "Feedback Request",
      category: "marketing",
      status: "approved",
      language: "English",
      components: [
        { type: "header", format: "text", text: "We Value Your Feedback" },
        {
          type: "body",
          text: "Hello {{1}}, thank you for using our service. We'd love to hear your feedback about your recent experience with us.",
        },
        { type: "footer", text: "KasaSMS - Your Messaging Partner" },
      ],
    },
  ]

  const filteredTemplates =
    activeTab === "all" ? templates : templates.filter((template) => template.category === activeTab)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>Create and manage your WhatsApp message templates.</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>Create a new WhatsApp message template for approval.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-name" className="text-right">
                  Name
                </Label>
                <Input id="template-name" placeholder="Enter template name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-language" className="text-right">
                  Language
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="header-type" className="text-right pt-2">
                  Header
                </Label>
                <div className="col-span-3 space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Header type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Header content" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="body-text" className="text-right pt-2">
                  Body
                </Label>
                <Textarea
                  id="body-text"
                  placeholder="Enter message body with {{parameters}}"
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="footer-text" className="text-right">
                  Footer
                </Label>
                <Input id="footer-text" placeholder="Enter footer text (optional)" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="buttons" className="text-right pt-2">
                  Buttons
                </Label>
                <div className="col-span-3 space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Button type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quick_reply">Quick Reply</SelectItem>
                      <SelectItem value="call_to_action">Call to Action</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Input placeholder="Button 1 text" />
                    <Input placeholder="Button 2 text (optional)" />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Submit for Approval</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="utility">Utility</TabsTrigger>
            <TabsTrigger value="transactional">Transactional</TabsTrigger>
          </TabsList>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {template.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {template.status === "approved" ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell>{template.language}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
