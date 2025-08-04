"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Send, TrendingUp, DollarSign } from "lucide-react"

export default function EmailPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [recipients, setRecipients] = useState("")
  const [senderName, setSenderName] = useState("KasaSMS")
  const [senderEmail, setSenderEmail] = useState("noreply@kasasms.com")

  const recipientCount = recipients.split("\n").filter((r) => r.trim()).length
  const estimatedCost = recipientCount * 0.12 // GH₵ 0.12 per email

  const handleSendEmail = () => {
    console.log("Sending email:", { subject, message, recipients, senderName, senderEmail })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email Marketing</h1>
          <p className="text-gray-600">Create and send email campaigns</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Balance: GH₵ 1,250.50</Badge>
        </div>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Composer
                </CardTitle>
                <CardDescription>Create your email campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input id="senderName" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input
                    id="subject"
                    placeholder="Enter email subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Email Content</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your email content here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                  />
                  <p className="text-sm text-muted-foreground">Characters: {message.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recipients & Delivery</CardTitle>
                <CardDescription>Manage recipients and send settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients">Email Addresses</Label>
                  <Textarea
                    id="recipients"
                    placeholder="Enter email addresses (one per line)&#10;user1@example.com&#10;user2@example.com"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    rows={6}
                  />
                  <p className="text-sm text-muted-foreground">Recipients: {recipientCount}</p>
                </div>

                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Cost Estimate</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Recipients:</span>
                      <span>{recipientCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate per email:</span>
                      <span>GH₵ 0.12</span>
                    </div>
                    <div className="flex justify-between font-medium col-span-2 pt-2 border-t">
                      <span>Total Cost:</span>
                      <span>GH₵ {estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSendEmail}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={!subject || !message || !recipients}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Email Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Pre-designed email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Welcome Email</h4>
                  <p className="text-sm text-muted-foreground">Welcome new customers</p>
                  <Button variant="outline" className="mt-2 w-full">
                    Use Template
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Newsletter</h4>
                  <p className="text-sm text-muted-foreground">Monthly newsletter template</p>
                  <Button variant="outline" className="mt-2 w-full">
                    Use Template
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Promotion</h4>
                  <p className="text-sm text-muted-foreground">Promotional email template</p>
                  <Button variant="outline" className="mt-2 w-full">
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Your email campaign history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Welcome Series</h4>
                    <p className="text-sm text-muted-foreground">Sent to 1,234 recipients</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Monthly Newsletter</h4>
                    <p className="text-sm text-muted-foreground">Sent to 2,456 recipients</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">Industry average: 21%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ 1,481.40</div>
            <p className="text-xs text-muted-foreground">Email campaign costs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
