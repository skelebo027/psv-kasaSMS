"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, Check, Copy, Eye, EyeOff, FileText, Key, MessageSquare, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function APIPage() {
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [apiKey, setApiKey] = useState("pk_live_48845806e60e93ee34d48389f9a5a1a1696a1c6c")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const regenerateKey = () => {
    // In a real app, this would call an API to regenerate the key
    setApiKey("pk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
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
            <Link
              href="/dashboard/sms"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Bulk SMS
            </Link>
            <Link href="/dashboard/api" className="text-sm font-medium transition-colors hover:text-primary">
              API
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
              <Button variant="ghost" className="w-full justify-start gap-2">
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">API Management</h1>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Generate New Key
            </Button>
          </div>
          <Tabs defaultValue="keys" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="keys">API Keys</TabsTrigger>
              <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
              <TabsTrigger value="integration">Integration Examples</TabsTrigger>
            </TabsList>
            <TabsContent value="keys" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Your API keys carry many privileges. Be sure to keep them secure and never share them in publicly
                  accessible areas.
                </AlertDescription>
              </Alert>
              <Card>
                <CardHeader>
                  <CardTitle>Your API Keys</CardTitle>
                  <CardDescription>Use these keys to authenticate your API requests.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Live API Key</Label>
                    <div className="flex">
                      <div className="relative flex-1">
                        <Input
                          id="api-key"
                          value={showKey ? apiKey : "•".repeat(apiKey.length)}
                          readOnly
                          className="pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowKey(!showKey)}
                        >
                          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button variant="outline" className="ml-2" onClick={copyToClipboard}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" className="ml-2" onClick={regenerateKey}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">This key is used for production environments.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="test-api-key">Test API Key</Label>
                    <div className="flex">
                      <div className="relative flex-1">
                        <Input
                          id="test-api-key"
                          value={showKey ? "tk_test_3a4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u" : "•".repeat(40)}
                          readOnly
                          className="pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowKey(!showKey)}
                        >
                          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button variant="outline" className="ml-2" onClick={() => {}}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="ml-2" onClick={() => {}}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This key is used for testing environments. No real messages will be sent.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>API Access Settings</CardTitle>
                  <CardDescription>Configure how your API keys can be used.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ip-restrictions">IP Restrictions</Label>
                    <Input id="ip-restrictions" placeholder="Enter IP addresses (comma separated)" />
                    <p className="text-xs text-muted-foreground">Leave blank to allow access from any IP address.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowed-services">Allowed Services</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="allowed-services">
                        <SelectValue placeholder="Select services" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        <SelectItem value="sms">SMS Only</SelectItem>
                        <SelectItem value="voice">Voice Only</SelectItem>
                        <SelectItem value="email">Email Only</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-orange-500 hover:bg-orange-600">Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="usage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage</CardTitle>
                  <CardDescription>Monitor your API usage and limits.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">SMS API Calls</h3>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[45%] rounded-full bg-orange-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>45,000 / 100,000 calls</span>
                        <span>45% used</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Voice API Calls</h3>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[20%] rounded-full bg-teal-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>2,000 / 10,000 calls</span>
                        <span>20% used</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Email API Calls</h3>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[65%] rounded-full bg-blue-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>65,000 / 100,000 calls</span>
                        <span>65% used</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">WhatsApp API Calls</h3>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-[15%] rounded-full bg-green-500"></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>1,500 / 10,000 calls</span>
                        <span>15% used</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Rate Limits</h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>SMS API</span>
                        <span>100 requests/second</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Voice API</span>
                        <span>20 requests/second</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email API</span>
                        <span>50 requests/second</span>
                      </div>
                      <div className="flex justify-between">
                        <span>WhatsApp API</span>
                        <span>10 requests/second</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Download Usage Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="integration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Examples</CardTitle>
                  <CardDescription>Code examples to help you integrate with our API.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Send SMS Example</Label>
                    <div className="rounded-md bg-gray-900 p-4 text-sm text-white">
                      <pre className="overflow-x-auto">
                        {`// Using fetch API
fetch('https://api.kasasms.com/v1/sms/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    to: '+233123456789',
    from: 'KasaSMS',
    message: 'Hello from KasaSMS API!'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Send Bulk SMS Example</Label>
                    <div className="rounded-md bg-gray-900 p-4 text-sm text-white">
                      <pre className="overflow-x-auto">
                        {`// Using fetch API
fetch('https://api.kasasms.com/v1/sms/bulk', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    from: 'KasaSMS',
    message: 'Hello from KasaSMS API!',
    recipients: [
      '+233123456789',
      '+233987654321',
      '+233567891234'
    ]
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Check Balance Example</Label>
                    <div className="rounded-md bg-gray-900 p-4 text-sm text-white">
                      <pre className="overflow-x-auto">
                        {`// Using fetch API
fetch('https://api.kasasms.com/v1/account/balance', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Full Documentation</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
