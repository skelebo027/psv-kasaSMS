"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, MessageSquare, Phone, Mail, MessageCircle, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  name: string
  description: string
  status: "Active" | "Inactive"
  basePrice: number
  resellerPrice: number
  icon: string // Using string to map to Lucide icons
}

export default function ResellerServicesClientPage() {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>([]) // Initialize as empty

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "MessageSquare":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "Phone":
        return <Phone className="h-5 w-5 text-teal-500" />
      case "Mail":
        return <Mail className="h-5 w-5 text-blue-500" />
      case "MessageCircle":
        return <MessageCircle className="h-5 w-5 text-green-500" />
      case "BookOpen":
        return <BookOpen className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  const handleToggleStatus = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, status: service.status === "Active" ? "Inactive" : "Active" } : service,
      ),
    )
    toast({
      title: "Service Status Updated",
      description: "Service status has been toggled.",
    })
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
    toast({
      title: "Service Deleted",
      description: "Service has been removed.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
          <p className="text-muted-foreground">Manage the messaging services you offer to your clients.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
          <CardDescription>Configure and manage the services your clients can access.</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed text-muted-foreground">
              <div className="flex flex-col items-center gap-2 text-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">No services configured.</div>
                <div className="text-xs">Add your first service to get started.</div>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Your Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {getServiceIcon(service.icon)}
                      {service.name}
                    </TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      <Switch
                        checked={service.status === "Active"}
                        onCheckedChange={() => handleToggleStatus(service.id)}
                      />
                      <span className="ml-2 text-sm text-muted-foreground">{service.status}</span>
                    </TableCell>
                    <TableCell>GH₵ {service.basePrice.toFixed(2)}</TableCell>
                    <TableCell>GH₵ {service.resellerPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
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
          <CardTitle>Service Pricing Configuration</CardTitle>
          <CardDescription>Set your pricing for each service.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-markup">Default Markup Percentage (%)</Label>
            <Input id="default-markup" type="number" placeholder="e.g., 20" />
            <p className="text-xs text-muted-foreground">
              This percentage will be applied to the base price of new services.
            </p>
          </div>
          <Button className="w-full">Save Default Markup</Button>
        </CardContent>
      </Card>
    </div>
  )
}
