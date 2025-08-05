"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Pencil, Trash2, Send, Pause, Play } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  recipients: number
  sent: number
  delivered: number
  cost: number
  createdDate: string
  message: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]) // Initialize as empty

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "SMS",
    recipients: 0,
    message: "",
  })

  const { toast } = useToast()

  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      status: "Active", // Default to active upon creation
      recipients: formData.recipients,
      sent: formData.recipients,
      delivered: Math.floor(formData.recipients * 0.98), // 98% delivery rate
      cost: calculateCost(formData.type, formData.recipients),
      createdDate: new Date().toISOString().split("T")[0],
      message: formData.message,
    }

    setCampaigns([...campaigns, newCampaign])
    setIsCreateOpen(false)
    setFormData({ name: "", type: "SMS", recipients: 0, message: "" })

    toast({
      title: "Campaign Created",
      description: `Campaign "${newCampaign.name}" has been created and launched successfully`,
    })
  }

  const calculateCost = (type: string, recipients: number) => {
    const rates = {
      SMS: 0.03,
      Email: 0.12,
      WhatsApp: 0.5,
      Voice: 0.6,
    }
    return recipients * (rates[type as keyof typeof rates] || 0.03)
  }

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setFormData({
      name: campaign.name,
      type: campaign.type,
      recipients: campaign.recipients,
      message: campaign.message,
    })
    setIsEditOpen(true)
  }

  const handleUpdate = () => {
    if (!selectedCampaign) return

    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === selectedCampaign.id
          ? {
              ...campaign,
              ...formData,
              cost: calculateCost(formData.type, formData.recipients),
            }
          : campaign,
      ),
    )
    setIsEditOpen(false)
    setSelectedCampaign(null)
    setFormData({ name: "", type: "SMS", recipients: 0, message: "" })

    toast({
      title: "Campaign Updated",
      description: `Campaign "${formData.name}" has been updated`,
    })
  }

  const handleDelete = (campaignId: string) => {
    const campaignToDelete = campaigns.find((c) => c.id === campaignId)
    setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId))
    toast({
      title: "Campaign Deleted",
      description: `Campaign "${campaignToDelete?.name}" has been deleted`,
    })
  }

  const handleStatusChange = (campaignId: string, newStatus: string) => {
    setCampaigns(
      campaigns.map((campaign) => (campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign)),
    )

    const campaign = campaigns.find((c) => c.id === campaignId)
    toast({
      title: "Status Updated",
      description: `Campaign "${campaign?.name}" is now ${newStatus.toLowerCase()}`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground">Create and manage your messaging campaigns</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>Set up a new messaging campaign</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Message Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="SMS">SMS</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Voice">Voice</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="recipients">Recipients Count</Label>
                <Input
                  id="recipients"
                  type="number"
                  value={formData.recipients}
                  onChange={(e) => setFormData({ ...formData, recipients: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message Content</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter your message content..."
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Estimated Cost: GH₵ {calculateCost(formData.type, formData.recipients).toFixed(2)}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
          <CardDescription>Manage all your messaging campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed text-muted-foreground">
              <div className="flex flex-col items-center gap-2 text-center">
                <Send className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">No campaigns found.</div>
                <div className="text-xs">Create your first campaign to get started.</div>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{campaign.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "Active"
                            ? "default"
                            : campaign.status === "Completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                    <TableCell>{campaign.delivered.toLocaleString()}</TableCell>
                    <TableCell>GH₵ {campaign.cost.toFixed(2)}</TableCell>
                    <TableCell>{campaign.createdDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {campaign.status === "Draft" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "Active")}>
                              <Send className="mr-2 h-4 w-4" />
                              Launch
                            </DropdownMenuItem>
                          )}
                          {campaign.status === "Active" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "Paused")}>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </DropdownMenuItem>
                          )}
                          {campaign.status === "Paused" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(campaign.id, "Active")}>
                              <Play className="mr-2 h-4 w-4" />
                              Resume
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>Update campaign information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Campaign Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Message Type</Label>
              <select
                id="edit-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Voice">Voice</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-recipients">Recipients Count</Label>
              <Input
                id="edit-recipients"
                type="number"
                value={formData.recipients}
                onChange={(e) => setFormData({ ...formData, recipients: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-message">Message Content</Label>
              <Textarea
                id="edit-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter your message content..."
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Estimated Cost: GH₵ {calculateCost(formData.type, formData.recipients).toFixed(2)}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
