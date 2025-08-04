"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppPreview } from "@/components/whatsapp-preview"
import Image from "next/image"

export function WhatsAppComposer() {
  const [message, setMessage] = useState("")
  const [recipient, setRecipient] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("/placeholder.svg?height=200&width=200") // Placeholder for QR code

  const handleSendMessage = () => {
    console.log("Sending WhatsApp message:", { recipient, message, selectedTemplate, mediaUrl })
    // In a real application, you would integrate with a WhatsApp Business API here
    // to send the message and potentially generate a real QR code for connection.
    alert("Simulated message sent! (Check console for details)")
  }

  const handleGenerateQrCode = () => {
    // In a real application, this would call an API to generate a WhatsApp connection QR code.
    // For demonstration, we'll just update the placeholder.
    setQrCodeUrl(`/placeholder.svg?height=200&width=200&query=new whatsapp qr code ${Date.now()}`)
    alert("Simulated QR code generated!")
  }

  const contactGroups: { value: string; label: string }[] = [] // No mock data
  const templates: { value: string; label: string; content: string }[] = [] // No mock data

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose WhatsApp Message</CardTitle>
        <CardDescription>Send a new WhatsApp message to your contacts.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient">Recipient (Phone Number)</Label>
            <Input
              id="recipient"
              type="tel"
              placeholder="+1234567890"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-group">Contact Group (Optional)</Label>
            <Select onValueChange={(value) => setRecipient(value)}>
              <SelectTrigger id="contact-group">
                <SelectValue
                  placeholder={contactGroups.length > 0 ? "Select a contact group" : "No contact groups available"}
                />
              </SelectTrigger>
              <SelectContent>
                {contactGroups.length > 0 ? (
                  contactGroups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-groups" disabled>
                    No contact groups available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="template">Message Template (Optional)</Label>
            <Select
              onValueChange={(value) => {
                setSelectedTemplate(value)
                const template = templates.find((t) => t.value === value)
                if (template) setMessage(template.content)
              }}
            >
              <SelectTrigger id="template">
                <SelectValue placeholder={templates.length > 0 ? "Select a template" : "No templates available"} />
              </SelectTrigger>
              <SelectContent>
                {templates.length > 0 ? (
                  templates.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-templates" disabled>
                    No templates available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message Content</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="media-url">Media URL (Optional)</Label>
            <Input
              id="media-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleSendMessage}>Send Message</Button>
        </div>
        <div className="grid gap-4">
          <WhatsAppPreview message={message} mediaUrl={mediaUrl} />
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Connection QR Code</CardTitle>
              <CardDescription>Scan this QR code with your WhatsApp Business app to connect.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              {qrCodeUrl && (
                <Image
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="WhatsApp QR Code"
                  width={200}
                  height={200}
                  className="border rounded-lg"
                />
              )}
              <Button onClick={handleGenerateQrCode}>Generate New QR Code</Button>
              <p className="text-sm text-muted-foreground text-center">
                (Simulated QR code for demonstration. In a live system, this would be a dynamic QR code from WhatsApp
                Business API.)
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
