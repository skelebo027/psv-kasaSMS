"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BookOpen, Code, MessageSquare, Phone, Mail, Webhook, CreditCard, Search } from "lucide-react"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-gray-600">Learn how to use KasaSMS platform features</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Getting Started</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Platform overview and quick start guides</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Reference</CardTitle>
            <Code className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Complete API documentation and examples</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tutorials</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Step-by-step guides for common tasks</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FAQs</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Answers to frequently asked questions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sms" className="space-y-4">
        <TabsList className="grid grid-cols-5 md:w-[600px]">
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                SMS Messaging
              </CardTitle>
              <CardDescription>Learn how to send SMS messages through KasaSMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  KasaSMS provides a robust platform for sending SMS messages to recipients worldwide. Our SMS service
                  offers high deliverability, competitive rates, and comprehensive delivery reporting.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Sending SMS</h3>
                <p className="text-sm text-muted-foreground">
                  You can send SMS messages through our web interface or API. Messages can be sent to individual numbers
                  or to groups of contacts.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Example API Request</h4>
                  <pre className="text-xs overflow-x-auto">
                    {`POST /api/v1/sms/send
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "to": ["+233201234567", "+233241234567"],
  "from": "KasaSMS",
  "message": "Hello from KasaSMS!"
}`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">SMS Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Create reusable SMS templates with placeholders for personalized messaging. Templates can be managed
                  through the dashboard or API.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Delivery Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Track the delivery status of your SMS messages in real-time. Delivery reports can be accessed through
                  the dashboard or via webhooks.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  SMS pricing is based on the destination country and volume. Our standard rate for Ghana is GH₵ 0.03 per
                  message.
                </p>
                <Button variant="outline" className="mt-2">
                  View Full Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-500" />
                Voice Messaging
              </CardTitle>
              <CardDescription>Learn how to send voice messages through KasaSMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Voice messaging allows you to send voice calls with pre-recorded or text-to-speech messages to your
                  contacts. This is ideal for important announcements or when SMS isn't sufficient.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Text-to-Speech</h3>
                <p className="text-sm text-muted-foreground">
                  Convert text to natural-sounding speech in multiple languages. Our system supports English, Twi, Ga, and
                  French.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Example API Request</h4>
                  <pre className="text-xs overflow-x-auto">
                    {`POST /api/v1/voice/send
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "to": ["+233201234567"],
  "text": "Hello, this is an important message from KasaSMS.",
  "voice": "female",
  "language": "en",
  "speed": "normal"
}`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Call Flow</h3>
                <p className="text-sm text-muted-foreground">
                  Create interactive voice responses (IVR) with our call flow builder. Design call flows with menus,
                  options, and branching logic.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Voice messaging is priced at GH₵ 0.60 per minute. Charges are rounded up to the nearest minute.
                </p>
                <Button variant="outline" className="mt-2">
                  View Full Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-500" />
                Email Marketing
              </CardTitle>
              <CardDescription>Learn how to send email campaigns through KasaSMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  KasaSMS provides email marketing capabilities for sending newsletters, promotional content, and
                  transactional emails to your contacts.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Email Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Create beautiful, responsive email templates using our drag-and-drop editor or HTML editor. Templates
                  can include dynamic content and personalization.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Campaign Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track open rates, click-through rates, and other key metrics for your email campaigns. Use these
                  insights to optimize your future campaigns.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Email pricing is GH₵ 0.12 per email sent. Volume discounts are available for high-volume senders.
                </p>
                <Button variant="outline" className="mt-2">
                  View Full Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                WhatsApp Messaging
              </CardTitle>
              <CardDescription>Learn how to send WhatsApp messages through KasaSMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  KasaSMS integrates with the WhatsApp Business API to enable you to send messages to your customers on
                  WhatsApp. This includes template messages and session messages.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">WhatsApp Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage WhatsApp message templates that comply with WhatsApp's guidelines. Templates must be
                  approved before they can be used.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Example API Request</h4>
                  <pre className="text-xs overflow-x-auto">
                    {`POST /api/v1/whatsapp/send
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "to": "233201234567",
  "template": {
    "name": "appointment_reminder",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "John"
          },
          {
            "type": "text",
            "text": "2023-01-15 14:30"
          }
        ]
      }
    ]
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Interactive Messages</h3>
                <p className="text-sm text-muted-foreground">
                  Send interactive messages with buttons, lists, and other UI elements to enhance user engagement.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  WhatsApp messaging is priced at GH₵ 0.50 per conversation. A conversation includes all messages sent
                  within a 24-hour session.
                </p>
                <Button variant="outline" className="mt-2">
                  View Full Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-orange-500" />
                API Reference
              </CardTitle>
              <CardDescription>Learn how to integrate with KasaSMS API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  All API requests require authentication using an API key. You can generate API keys in the dashboard
                  under API settings.
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Authentication Example</h4>
                  <pre className="text-xs overflow-x-auto">
                    {`// Using Authorization header
Authorization: Bearer YOUR_API_KEY

// Using query parameter
https://api.kasasms.com/v1/sms/send?api_key=YOUR_API_KEY`}
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">API Endpoints</h3>
                <p className="text-sm text-muted-foreground">
                  KasaSMS API provides endpoints for all messaging services, contact management, and account operations.
                </p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Base URL:</span> https://api.kasasms.com/v1
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">SMS Endpoints:</span> /sms/send, /sms/status, /sms/history
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Voice Endpoints:</span> /voice/send, /voice/status
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">WhatsApp Endpoints:</span> /whatsapp/send, /whatsapp/templates
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email Endpoints:</span> /email/send, /email/templates
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Contacts Endpoints:</span> /contacts, /contacts/groups
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Rate Limits</h3>
                <p className="text-sm text-muted-foreground">
                  API requests are subject to rate limiting to ensure fair usage. The default limit is 100 requests per
                  minute.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">SDKs & Libraries</h3>
                <p className="text-sm text-muted-foreground">
                  We provide official SDKs for popular programming languages to make integration easier.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    PHP SDK
                  </Button>
                  <Button variant="outline" size="sm">
                    Node.js SDK
                  </Button>
                  <Button variant="outline" size="sm">
                    Python SDK
                  </Button>
                  <Button variant="outline" size="sm">
                    Java SDK
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5 text-orange-500" />
              Webhooks
            </CardTitle>
            <CardDescription>Receive real-time event notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Webhooks allow your application to receive real-time notifications when events occur in your KasaSMS
              account. Configure webhooks to receive delivery reports, incoming messages, and more.
            </p>
            <Button variant="outline">View Webhook Documentation</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-orange-500" />
              Billing & Pricing
            </CardTitle>
            <CardDescription>Understand our pricing structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              KasaSMS offers transparent, pay-as-you-go pricing with no hidden fees. Learn about our pricing structure,
              volume discounts, and billing cycles.
            </p>
            <Button variant="outline">View Pricing Details</Button>
          </CardContent>
        </Card>
      \
