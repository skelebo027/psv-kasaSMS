"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, FileImage, FileText, Mic, Upload, Video } from "lucide-react"
import { WhatsAppPreview } from "./whatsapp-preview"

export function WhatsAppComposer() {
  const [date, setDate] = useState<Date>()
  const [messageType, setMessageType] = useState("text")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [scheduleMessage, setScheduleMessage] = useState(false)
  const [mediaUrl, setMediaUrl] = useState("")
  const [messageText, setMessageText] = useState("")

  const templates = [
    { id: "welcome", name: "Welcome Message" },
    { id: "order_confirmation", name: "Order Confirmation" },
    { id: "payment_reminder", name: "Payment Reminder" },
    { id: "appointment", name: "Appointment Reminder" },
    { id: "feedback", name: "Feedback Request" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Compose WhatsApp Message</CardTitle>
          <CardDescription>Create and send WhatsApp messages to your contacts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contacts</SelectItem>
                <SelectItem value="customers">Customers</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="custom">Custom Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={messageType} onValueChange={setMessageType} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-[120px]"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="template">Select Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate && (
                <div className="space-y-2">
                  <Label>Template Parameters</Label>
                  <div className="space-y-2">
                    <Input placeholder="Customer Name" />
                    <Input placeholder="Order Number" />
                    <Input placeholder="Delivery Date" />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="media" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Media Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                    <FileImage className="h-8 w-8 text-orange-500" />
                    <span>Image</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                    <Video className="h-8 w-8 text-orange-500" />
                    <span>Video</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                    <FileText className="h-8 w-8 text-orange-500" />
                    <span>Document</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                    <Mic className="h-8 w-8 text-orange-500" />
                    <span>Audio</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="media-url">Media URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="media-url"
                    placeholder="Enter URL or upload file"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="media-caption">Caption (Optional)</Label>
                <Textarea
                  id="media-caption"
                  placeholder="Add a caption to your media..."
                  className="min-h-[80px]"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="interactive" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Interactive Message Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list">List Message</SelectItem>
                    <SelectItem value="button">Button Message</SelectItem>
                    <SelectItem value="product">Product Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="header">Header Text</Label>
                <Input id="header" placeholder="Enter header text" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Body Text</Label>
                <Textarea id="body" placeholder="Enter body text" className="min-h-[80px]" />
              </div>

              <div className="space-y-2">
                <Label>Buttons</Label>
                <div className="space-y-2">
                  <Input placeholder="Button 1 Text" />
                  <Input placeholder="Button 2 Text" />
                  <Input placeholder="Button 3 Text" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Switch id="schedule" checked={scheduleMessage} onCheckedChange={setScheduleMessage} />
            <Label htmlFor="schedule">Schedule Message</Label>
          </div>

          {scheduleMessage && (
            <div className="space-y-2">
              <Label>Schedule Date & Time</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Draft</Button>
          <Button className="bg-orange-500 hover:bg-orange-600">Send Message</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Preview</CardTitle>
          <CardDescription>Preview how your message will appear to recipients.</CardDescription>
        </CardHeader>
        <CardContent>
          <WhatsAppPreview
            messageType={messageType}
            text={messageText}
            mediaUrl={mediaUrl}
            templateId={selectedTemplate}
          />
        </CardContent>
      </Card>
    </div>
  )
}
