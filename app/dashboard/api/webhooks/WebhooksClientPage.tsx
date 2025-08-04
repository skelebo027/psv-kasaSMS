"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, CheckCircle, XCircle, Clock, PlusCircle } from "lucide-react"

interface WebhookEndpoint {
  id: string
  name: string
  url: string
  events: string[]
  status: "active" | "inactive" | "failed"
  lastTriggered: string
  successRate: number
}

export default function WebhooksClientPage() {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState<WebhookEndpoint | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    events: [] as string[],
  })

  const availableEvents = [
    "sms.sent",
    "sms.delivered",
    "sms.failed",
    "whatsapp.sent",
    "whatsapp.delivered",
    "whatsapp.read",
    "voice.completed",
    "voice.failed",
    "email.sent",
    "email.delivered",
    "email.bounced",
  ]

  const handleCreateWebhook = () => {
    const newWebhook: WebhookEndpoint = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url,
      events: formData.events,
      status: "active",
      lastTriggered: "Never",
      successRate: 100,
    }

    setWebhooks([...webhooks, newWebhook])
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEditWebhook = (webhook: WebhookEndpoint) => {
    setEditingWebhook(webhook)
    setFormData({
      name: webhook.name,
      url: webhook.url,
      events: webhook.events,
    })
    setIsDialogOpen(true)
  }

  const handleUpdateWebhook = () => {
    if (editingWebhook) {
      setWebhooks(
        webhooks.map((w) =>
          w.id === editingWebhook.id
            ? {
                ...w,
                name: formData.name,
                url: formData.url,
                events: formData.events,
              }
            : w,
        ),
      )
      setIsDialogOpen(false)
      setEditingWebhook(null)
      resetForm()
    }
  }

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id))
  }

  const handleTestWebhook = (webhook: WebhookEndpoint) => {
    // Simulate webhook test
    alert(`Testing webhook: ${webhook.name}`)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      url: "",
      events: [],
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
        <p className="text-muted-foreground">
          Configure webhooks to receive real-time notifications for events like message delivery reports and incoming
          messages.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Your Webhooks</CardTitle>
            <CardDescription>Manage your webhook endpoints.</CardDescription>
          </div>
          <Button size="sm" className="h-8 gap-1" onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Webhook</span>
          </Button>
        </CardHeader>
        <CardContent>
          {webhooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 border border-dashed rounded-lg text-muted-foreground">
              <p>No webhooks configured.</p>
              <p>Click "Add Webhook" to set up a new notification endpoint.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">{webhook.name}</TableCell>
                    <TableCell>{webhook.url}</TableCell>
                    <TableCell>{webhook.events.join(", ")}</TableCell>
                    <TableCell>{getStatusBadge(webhook.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditWebhook(webhook)}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteWebhook(webhook.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setEditingWebhook(null)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Webhook
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingWebhook ? "Edit Webhook" : "Add New Webhook"}</DialogTitle>
            <DialogDescription>
              {editingWebhook ? "Update webhook configuration" : "Create a new webhook endpoint"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Webhook Name</Label>
              <Input
                id="name"
                placeholder="e.g., SMS Delivery Notifications"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Endpoint URL</Label>
              <Input
                id="url"
                placeholder="https://your-app.com/webhooks/kasasms"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Events to Subscribe</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {availableEvents.map((event) => (
                  <label key={event} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.events.includes(event)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            events: [...formData.events, event],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            events: formData.events.filter((e) => e !== event),
                          })
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{event}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editingWebhook ? handleUpdateWebhook : handleCreateWebhook}>
              {editingWebhook ? "Update" : "Create"} Webhook
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
