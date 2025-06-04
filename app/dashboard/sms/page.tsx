"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Clock, Download, MessageSquare, Plus, Upload, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SMSPage() {
  const [messageText, setMessageText] = useState("")
  const [characterCount, setCharacterCount] = useState(0)
  const [messageCount, setMessageCount] = useState(1)

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setMessageText(text)
    setCharacterCount(text.length)

    // Calculate SMS segments (1 SMS = 160 characters)
    const segments = Math.ceil(text.length / 160) || 1
    setMessageCount(segments)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 mr-4">
            <MessageSquare className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">KasaSMS</span>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link href="/dashboard/sms" className="text-sm font-medium transition-colors hover:text-primary">
              Bulk SMS
            </Link>
            <Link
              href="/dashboard/campaigns"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Campaigns
            </Link>
            <Link
              href="/dashboard/contacts"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contacts
            </Link>
          </nav>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/dashboard/sms">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageSquare className="h-5 w-5" />
                Send SMS
              </Button>
            </Link>
            <Link href="/dashboard/sms/campaigns">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Clock className="h-5 w-5" />
                Scheduled
              </Button>
            </Link>
            <Link href="/dashboard/sms/history">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <ArrowRight className="h-5 w-5" />
                Sent Messages
              </Button>
            </Link>
            <Link href="/dashboard/sms/templates">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Check className="h-5 w-5" />
                Templates
              </Button>
            </Link>
            <Link href="/dashboard/contacts">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-5 w-5" />
                Contacts
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Send Bulk SMS</h1>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> New Campaign
            </Button>
          </div>
          <Tabs defaultValue="compose" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compose">Compose Message</TabsTrigger>
              <TabsTrigger value="recipients">Recipients</TabsTrigger>
              <TabsTrigger value="schedule">Schedule & Send</TabsTrigger>
            </TabsList>
            <TabsContent value="compose" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Your Message</CardTitle>
                  <CardDescription>
                    Create your SMS message. You can use templates or write a custom message.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="Enter campaign name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-id">Sender ID</Label>
                    <Input id="sender-id" placeholder="Enter sender ID" />
                    <p className="text-xs text-muted-foreground">
                      This is the name that will appear as the sender of your message.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message">Message</Label>
                      <div className="text-xs text-muted-foreground">
                        {characterCount} characters | {messageCount} SMS
                      </div>
                    </div>
                    <Textarea
                      id="message"
                      placeholder="Type your message here"
                      className="min-h-[150px]"
                      value={messageText}
                      onChange={handleMessageChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Insert Template Variable</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setMessageText(messageText + "{first_name}")}>
                        First Name
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setMessageText(messageText + "{last_name}")}>
                        Last Name
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setMessageText(messageText + "{company}")}>
                        Company
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMessageText(messageText + "{custom_field}")}
                      >
                        Custom Field
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Template</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">Continue to Recipients</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="recipients" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Select Recipients</CardTitle>
                  <CardDescription>Choose who will receive your message.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Method</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Card className="cursor-pointer border-2 border-orange-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Contact Groups</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Select from your saved contact groups</p>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Upload File</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Upload a CSV or Excel file with contacts</p>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Manual Entry</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Enter phone numbers manually</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-groups">Select Contact Groups</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contact groups" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customers">Customers (1,245)</SelectItem>
                        <SelectItem value="leads">Leads (890)</SelectItem>
                        <SelectItem value="subscribers">Subscribers (2,300)</SelectItem>
                        <SelectItem value="vip">VIP Customers (150)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Selected Recipients</h3>
                        <p className="text-sm text-muted-foreground">4,585 contacts selected</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Import
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Back to Compose</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">Continue to Schedule</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule & Send</CardTitle>
                  <CardDescription>Review your message and schedule when to send it.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Delivery Options</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Card className="cursor-pointer border-2 border-orange-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Send Immediately</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Send your message as soon as you submit</p>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Schedule for Later</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">Pick a date and time to send your message</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="rounded-md border p-4 space-y-4">
                    <div>
                      <h3 className="font-medium">Message Summary</h3>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Campaign Name:</p>
                          <p>May Promotion</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sender ID:</p>
                          <p>KasaSMS</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Recipients:</p>
                          <p>4,585 contacts</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Message Length:</p>
                          <p>
                            {characterCount} characters ({messageCount} SMS per recipient)
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total SMS:</p>
                          <p>{messageCount * 4585} SMS</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estimated Cost:</p>
                          <p className="font-medium text-orange-500">$229.25</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Message Preview</h3>
                      <div className="mt-2 rounded-md bg-gray-50 p-3 text-sm">
                        {messageText ||
                          "Hello {first_name}, thank you for being a valued customer of our service. We're excited to announce our new promotion starting next week. Reply YES to learn more!"}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Back to Recipients</Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">Send Campaign</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
