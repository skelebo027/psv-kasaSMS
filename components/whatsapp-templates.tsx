"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Trash2, FileText, CheckCircle, XCircle, PlusCircle } from "lucide-react"

interface WhatsAppTemplate {
  id: string
  name: string
  category: string
  language: string
  status: "approved" | "pending" | "rejected"
  content: string
  parameters: string[]
}

export function WhatsAppTemplates() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<WhatsAppTemplate | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    language: "en",
    content: "",
    parameters: "",
  })

  const handleCreateTemplate = () => {
    const newTemplate: WhatsAppTemplate = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      language: formData.language,
      status: "pending", // New templates are always pending approval
      content: formData.content,
      parameters: formData.parameters
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    }
    setTemplates([...templates, newTemplate])
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEditTemplate = (template: WhatsAppTemplate) => {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      category: template.category,
      language: template.language,
      content: template.content,
      parameters: template.parameters.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleUpdateTemplate = () => {
    if (editingTemplate) {
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id
            ? {
                ...t,
                name: formData.name,
                category: formData.category,
                language: formData.language,
                content: formData.content,
                parameters: formData.parameters
                  .split(",")
                  .map((p) => p.trim())
                  .filter(Boolean),
                status: "pending", // Any edit requires re-approval
              }
            : t,
        ),
      )
      setIsDialogOpen(false)
      setEditingTemplate(null)
      resetForm()
    }
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      language: "en",
      content: "",
      parameters: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <FileText className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>Manage your pre-approved WhatsApp message templates.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1" onClick={() => setEditingTemplate(null)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Create Template</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingTemplate ? "Edit Template" : "Create New Template"}</DialogTitle>
              <DialogDescription>
                {editingTemplate
                  ? "Update your WhatsApp message template."
                  : "Design a new WhatsApp message template for approval."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="e.g., Welcome_Message"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Marketing, Utility"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  placeholder="e.g., en, es, fr"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Your message content. Use {{1}}, {{2}} for parameters."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  Use `{"{{1}}"}`, `{"{{2}}"}`, etc. for dynamic parameters.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parameters">Parameters (comma-separated)</Label>
                <Input
                  id="parameters"
                  placeholder="e.g., customer_name, order_id"
                  value={formData.parameters}
                  onChange={(e) => setFormData({ ...formData, parameters: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  List the names of your parameters, e.g., `customer_name, order_id`.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}>
                {editingTemplate ? "Update Template" : "Submit for Approval"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 border border-dashed rounded-lg text-muted-foreground">
            <p>No message templates found.</p>
            <p>Click "Create Template" to add your first template.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>{template.language.toUpperCase()}</TableCell>
                  <TableCell>{getStatusBadge(template.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {template.content}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
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
  )
}
