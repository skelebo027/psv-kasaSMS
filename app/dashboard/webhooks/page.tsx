"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
import { Plus, Edit, Trash2, Link, Check, AlertTriangle, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  status: "active" | "inactive" | "failed"
  secret: string
  createdAt: string
  lastTriggered: string
}

export default function WebhooksPage() {
  const { toast } = useToast()
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "1",
      name: "SMS Delivery Status",
      url: "https://example.com/webhooks/sms-status",
      events: ["sms.delivered", "sms.failed"],
      status: "active",
      secret: "whsec_8f7h3j2k1l0p9o8i7u6y5t4r3e2w1q",
      createdAt: "2024-01-10",
      lastTriggered: "2024-01-15 14:30",
    },
    {
      id: "2",
      name: "Payment Notifications",
      url: "https://example.com/webhooks/payments",
      events: ["payment.success", "payment.failed"],
      status: "active",
      secret: "whsec_9o8i7u6y5t4r3e2w1q0p9o8i7u6y5t",
      createdAt: "2024-01-12",
      lastTriggered: "2024-01-14 10:15",
    },
    {
      id: "3",
      name: "User Registrations",
      url: "https://example.com/webhooks/users",
      events: ["user.created"],
      status: "failed",
      secret: "whsec_5t4r3e2w1q0p9o8i7u6y5t4r3e2w1q",
      createdAt: "2024-01-15",
      lastTriggered: "2024-01-15 09:45",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null)
  const [webhookForm, setWebhookForm] = useState({
    name: "",
    url: "",
    events: [] as string[],
    status: "active" as "active" | "inactive" | "failed",
  })

  const availableEvents = [
    { id: "sms.delivered", name: "SMS Delivered" },
    { id: "sms.failed", name: "SMS Failed" },
    { id: "payment.success", name: "Payment Success" },
    { id: "payment.failed", name: "Payment Failed" },
    { id: "user.created", name: "User Created" },
    { id: "user.updated", name: "User Updated" },
    { id: "campaign.started", name: "Campaign Started" },
    { id: "campaign.completed", name: "Campaign Completed" },
  ]

  const handleCreateWebhook = () => {
    if (!webhookForm.name || !webhookForm.url || webhookForm.events.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one event",
        variant: "destructive",
      })
      return
    }

    const newWebhook: Webhook = {
      id: Date.now().toString(),
      name: webhookForm.name,
      url: webhookForm.url,
      events: webhookForm.events,
      status: webhookForm.status,
      secret: `whsec_${generateRandomString(32)}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastTriggered: "Never",
    }

    setWebhooks([...webhooks, newWebhook])
    setIsDialogOpen(false)
    resetForm()

    toast({
      title: "Webhook Created",
      description: `Webhook "${newWebhook.name}" has been created successfully`,
    })
  }

  const handleUpdateWebhook = () => {
    if (!editingWebhook) return

    if (!webhookForm.name || !webhookForm.url || webhookForm.events.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one event",
        variant: "destructive",
      })
      return
    }

    setWebhooks(
      webhooks.map((webhook) =>
        webhook.id === editingWebhook.id
          ? {
              ...webhook,
              name: webhookForm.name,
              url: webhookForm.url,
              events: webhookForm.events,
              status: webhookForm.status,
            }
          : webhook,
      ),
    )

    setIsDialogOpen(false)
    setEditingWebhook(null)
    resetForm()

    toast({
      title: "Webhook Updated",
      description: `Webhook "${webhookForm.name}" has been updated successfully`,
    })
  }

  const handleDeleteWebhook = (id: string) => {
    const webhookToDelete = webhooks.find((w) => w.id === id)
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id))

    toast({
      title: "Webhook Deleted",
      description: `Webhook "${webhookToDelete?.name}" has been deleted`,
    })
  }

  const handleEditWebhook = (webhook: Webhook) => {
    setEditingWebhook(webhook)
    setWebhookForm({
      name: webhook.name,
      url: webhook.url,
      events: webhook.events,
      status: webhook.status,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setWebhookForm({
      name: "",
      url: "",
      events: [],
      status: "active",
    })
  }

  const handleToggleWebhookStatus = (id: string) => {
    setWebhooks(
      webhooks.map((webhook) =>
        webhook.id === id
          ? {
              ...webhook,
              status: webhook.status === "active" ? "inactive" : "active",
            }
          : webhook,
      ),
    )

    const webhook = webhooks.find((w) => w.id === id)
    const newStatus = webhook?.status === "active" ? "inactive" : "active"

    toast({
      title: "Status Updated",
      description: `Webhook "${webhook?.name}" is now ${newStatus}`,
    })
  }

  const handleCopySecret = (secret: string) => {
    navigator.clipboard.writeText(secret)
    toast({
      title: "Secret Copied",
      description: "Webhook secret has been copied to clipboard",
    })
  }

  const generateRandomString = (length: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Webhooks</h1>
          <p className="text-gray-600">Manage webhook integrations for real-time event notifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setEditingWebhook(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingWebhook ? "Edit Webhook" : "Add New Webhook"}</DialogTitle>
              <DialogDescription>
                {editingWebhook
                  ? "Update webhook configuration"
                  : "Create a new webhook to receive real-time event notifications"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Webhook Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., SMS Delivery Status"
                  value={webhookForm.name}
                  onChange={(e) => setWebhookForm({ ...webhookForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Endpoint URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/webhook"
                  value={webhookForm.url}
                  onChange={(e) => setWebhookForm({ ...webhookForm, url: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  This URL will receive HTTP POST requests when selected events occur
                </p>
              </div>
              <div className="space-y-2">
                <Label>Events to Subscribe</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`event-${event.id}`}
                        checked={webhookForm.events.includes(event.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setWebhookForm({
                              ...webhookForm,
                              events: [...webhookForm.events, event.id],
                            })
                          } else {
                            setWebhookForm({
                              ...webhookForm,
                              events: webhookForm.events.filter((e) => e !== event.id),
                            })
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`event-${event.id}`} className="text-sm">
                        {event.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status">Active</Label>
                <Switch
                  id="status"
                  checked={webhookForm.status === "active"}
                  onCheckedChange={(checked) =>
                    setWebhookForm({ ...webhookForm, status: checked ? "active" : "inactive" })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={editingWebhook ? handleUpdateWebhook : handleCreateWebhook}>
                {editingWebhook ? "Update Webhook" : "Create Webhook"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Webhooks</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhooks.length}</div>
            <p className="text-xs text-muted-foreground">Configured integrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Webhooks</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhooks.filter((w) => w.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently receiving events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Webhooks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhooks.filter((w) => w.status === "failed").length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Endpoints</CardTitle>
          <CardDescription>Manage your webhook integrations</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Secret</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{webhook.url}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(webhook.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono">{webhook.secret.substring(0, 10)}...</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCopySecret(webhook.secret)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{webhook.lastTriggered}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleToggleWebhookStatus(webhook.id)}>
                        {webhook.status === "active" ? "Disable" : "Enable"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditWebhook(webhook)}>
                        <Edit className="h-4 w-4" />
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Documentation</CardTitle>
          <CardDescription>Learn how to use webhooks with KasaSMS</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              Webhooks allow your application to receive real-time notifications when events occur in your KasaSMS
              account. When an event occurs, we'll send an HTTP POST request to the endpoint URL you specified.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Security</h3>
            <p className="text-sm text-muted-foreground">
              Each webhook has a unique secret key that is used to sign the payload. You should verify the signature to
              ensure the webhook is coming from KasaSMS.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-xs overflow-x-auto">
                {`// Example signature verification in Node.js
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Payload Format</h3>
            <p className="text-sm text-muted-foreground">
              All webhook payloads follow a consistent format with event-specific data in the payload object.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="text-xs overflow-x-auto">
                {`{
  "id": "evt_123456789",
  "event": "sms.delivered",
  "created": "2024-01-15T14:30:00Z",
  "payload": {
    "message_id": "msg_987654321",
    "to": "+233201234567",
    "from": "KasaSMS",
    "status": "delivered",
    "delivered_at": "2024-01-15T14:29:55Z"
  }
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Best Practices</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Respond to webhook requests with a 2xx status code as quickly as possible</li>
              <li>Process webhook events asynchronously to avoid timeouts</li>
              <li>Implement retry logic for failed webhook processing</li>
              <li>Always verify the webhook signature to ensure security</li>
              <li>Set up monitoring for webhook failures</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
