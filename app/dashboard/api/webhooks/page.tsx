"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Key, FileText, MessageSquare, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Webhook {
  id: string
  url: string
  events: string[]
  status: "active" | "inactive"
  lastTriggered: string
  createdAt: string
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null)
  const [formData, setFormData] = useState({
    url: "",
    events: [] as string[],
  })

  const availableEvents = [
    { value: "message.sent", label: "Message Sent" },
    { value: "message.delivered", label: "Message Delivered" },
    { value: "message.failed", label: "Message Failed" },
    { value: "voice.completed", label: "Voice Call Completed" },
    { value: "account.low_balance", label: "Low Balance Alert" },
  ]

  const handleCreateWebhook = () => {
    const newWebhook: Webhook = {
      id: Date.now().toString(),
      url: formData.url,
      events: formData.events,
      status: "active",
      lastTriggered: "Never",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setWebhooks([...webhooks, newWebhook])
    setIsDialogOpen(false)
    setFormData({ url: "", events: [] })
  }

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id))
  }

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(
      webhooks.map((w) => (w.id === id ? { ...w, status: w.status === "active" ? "inactive" : "active" } : w)),
    )
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
            <Link
              href="/dashboard/api"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
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
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
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
            <div className="flex items-center gap-4">
              <Link href="/dashboard/api">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to API
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Webhooks</h1>
                <p className="text-muted-foreground">Receive real-time notifications about your messages</p>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Webhook</DialogTitle>
                  <DialogDescription>
                    Configure a webhook to receive real-time notifications about your messages.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://your-app.com/webhooks/kasasms"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Events to Subscribe</Label>
                    <div className="space-y-2">
                      {availableEvents.map((event) => (
                        <div key={event.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={event.value}
                            checked={formData.events.includes(event.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, events: [...formData.events, event.value] })
                              } else {
                                setFormData({ ...formData, events: formData.events.filter((ev) => ev !== event.value) })
                              }
                            }}
                          />
                          <Label htmlFor={event.value} className="text-sm">
                            {event.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateWebhook} disabled={!formData.url || formData.events.length === 0}>
                    Create Webhook
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Webhooks</CardTitle>
              <CardDescription>Manage your webhook endpoints and monitor their status.</CardDescription>
            </CardHeader>
            <CardContent>
              {webhooks.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto text-muted-foreground mb-4"
                  >
                    <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
                    <path d="m6 17 3.13-5.78c.53-.97.43-2.22-.26-3.07A4 4 0 0 1 17 6.05" />
                    <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">No webhooks configured</h3>
                  <p className="text-muted-foreground mb-4">
                    Set up webhooks to receive real-time notifications about your messages.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Webhook
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Triggered</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhooks.map((webhook) => (
                      <TableRow key={webhook.id}>
                        <TableCell className="font-mono text-sm">{webhook.url}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="outline" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {webhook.status === "active" ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="capitalize">{webhook.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{webhook.lastTriggered}</TableCell>
                        <TableCell>{webhook.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => toggleWebhookStatus(webhook.id)}>
                              {webhook.status === "active" ? "Disable" : "Enable"}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteWebhook(webhook.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Testing</CardTitle>
              <CardDescription>Test your webhook endpoints to ensure they're working correctly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="test-webhook">Select Webhook</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a webhook to test" />
                    </SelectTrigger>
                    <SelectContent>
                      {webhooks.map((webhook) => (
                        <SelectItem key={webhook.id} value={webhook.id}>
                          {webhook.url}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="test-event">Test Event</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableEvents.map((event) => (
                        <SelectItem key={event.value} value={event.value}>
                          {event.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600" disabled={webhooks.length === 0}>
                Send Test Event
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
