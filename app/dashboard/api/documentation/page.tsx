"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Book, Code, Copy, ExternalLink, FileText, Key, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function APIDocumentationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const smsExample = `// Send SMS using KasaSMS API
const response = await fetch('https://api.kasasms.com/v1/sms/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    to: '+233123456789',
    from: 'KasaSMS',
    message: 'Hello from KasaSMS API!'
  })
});

const result = await response.json();
console.log(result);`

  const bulkSmsExample = `// Send Bulk SMS
const response = await fetch('https://api.kasasms.com/v1/sms/bulk', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    from: 'KasaSMS',
    message: 'Bulk message to multiple recipients',
    recipients: [
      '+233123456789',
      '+233987654321',
      '+233567891234'
    ]
  })
});`

  const balanceExample = `// Check Account Balance
const response = await fetch('https://api.kasasms.com/v1/account/balance', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const balance = await response.json();
console.log('Balance:', balance.amount);`

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
            <Link
              href="/dashboard/sms"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Bulk SMS
            </Link>
            <Link
              href="/dashboard/api"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              API
            </Link>
            <Link
              href="/dashboard/api/documentation"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Documentation
            </Link>
            <Link
              href="/dashboard/billing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Billing
            </Link>
          </nav>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/dashboard/api">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </Button>
            </Link>
            <Link href="/dashboard/api/documentation">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
                <FileText className="h-5 w-5" />
                Documentation
              </Button>
            </Link>
            <Link href="/dashboard/api/webhooks">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
                  <path d="m6 17 3.13-5.78c.53-.97.43-2.22-.26-3.07A4 4 0 0 1 17 6.05" />
                  <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
                </svg>
                Webhooks
              </Button>
            </Link>
            <Link href="/dashboard/api/logs">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2H2v10h10V2Z" />
                  <path d="M12 12H2v10h10V12Z" />
                  <path d="M22 2h-10v20h10V2Z" />
                </svg>
                API Logs
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/api">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to API
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">API Documentation</h1>
              <p className="text-muted-foreground">Complete guide to using the KasaSMS API</p>
            </div>
          </div>

          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="sms">SMS API</TabsTrigger>
              <TabsTrigger value="voice">Voice API</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Getting Started
                  </CardTitle>
                  <CardDescription>
                    Welcome to the KasaSMS API. This guide will help you get started with sending messages
                    programmatically.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Base URL</h3>
                    <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">https://api.kasasms.com/v1</div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>
                        Get your API key from the{" "}
                        <Link href="/dashboard/api" className="text-orange-500 hover:underline">
                          API Keys
                        </Link>{" "}
                        section
                      </li>
                      <li>Make your first API call using the examples below</li>
                      <li>Check the response and handle any errors</li>
                      <li>Integrate into your application</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Response Format</h3>
                    <p className="text-sm text-muted-foreground mb-2">All API responses are in JSON format:</p>
                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm">
                      <pre>{`{
  "success": true,
  "message": "SMS sent successfully",
  "data": {
    "message_id": "msg_123456789",
    "status": "sent",
    "cost": 0.03
  }
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>All API requests require authentication using your API key.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">API Key Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Include your API key in the Authorization header of every request:
                    </p>
                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm relative">
                      <pre>{`Authorization: Bearer YOUR_API_KEY`}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white hover:bg-gray-700"
                        onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY", "auth")}
                      >
                        {copiedCode === "auth" ? "✓" : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Error Responses</h3>
                    <p className="text-sm text-muted-foreground mb-2">Authentication errors return:</p>
                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm">
                      <pre>{`{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid API key"
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sms" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>SMS API</CardTitle>
                  <CardDescription>Send single and bulk SMS messages using our API.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        POST
                      </Badge>
                      <code className="text-sm">/sms/send</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Send a single SMS message</p>

                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm relative">
                      <pre>{smsExample}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white hover:bg-gray-700"
                        onClick={() => copyToClipboard(smsExample, "sms")}
                      >
                        {copiedCode === "sms" ? "✓" : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        POST
                      </Badge>
                      <code className="text-sm">/sms/bulk</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Send SMS to multiple recipients</p>

                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm relative">
                      <pre>{bulkSmsExample}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white hover:bg-gray-700"
                        onClick={() => copyToClipboard(bulkSmsExample, "bulk")}
                      >
                        {copiedCode === "bulk" ? "✓" : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        GET
                      </Badge>
                      <code className="text-sm">/account/balance</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Check your account balance</p>

                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm relative">
                      <pre>{balanceExample}</pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-white hover:bg-gray-700"
                        onClick={() => copyToClipboard(balanceExample, "balance")}
                      >
                        {copiedCode === "balance" ? "✓" : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voice" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Voice API</CardTitle>
                  <CardDescription>Send voice messages using text-to-speech or audio files.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        POST
                      </Badge>
                      <code className="text-sm">/voice/send</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Send a voice message</p>

                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm">
                      <pre>{`const response = await fetch('https://api.kasasms.com/v1/voice/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    to: '+233123456789',
    text: 'Hello, this is a voice message from KasaSMS',
    voice: 'female',
    language: 'en'
  })
});`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>Receive real-time notifications about message delivery status.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Webhook Events</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>
                        <code>message.sent</code> - Message was sent successfully
                      </li>
                      <li>
                        <code>message.delivered</code> - Message was delivered to recipient
                      </li>
                      <li>
                        <code>message.failed</code> - Message delivery failed
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Webhook Payload</h3>
                    <div className="bg-gray-900 text-white p-4 rounded-md text-sm">
                      <pre>{`{
  "event": "message.delivered",
  "message_id": "msg_123456789",
  "to": "+233123456789",
  "status": "delivered",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Configure your webhook URL in the{" "}
                      <Link href="/dashboard/api/webhooks" className="text-orange-500 hover:underline">
                        Webhooks
                      </Link>{" "}
                      section.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Get support and additional resources for using the KasaSMS API.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Code className="h-8 w-8 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">SDKs & Libraries</h3>
                    <p className="text-sm text-muted-foreground">Official SDKs for popular languages</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <MessageSquare className="h-8 w-8 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Support</h3>
                    <p className="text-sm text-muted-foreground">Get help from our team</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
