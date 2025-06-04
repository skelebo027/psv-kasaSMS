"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Settings, Activity } from "lucide-react"

interface Gateway {
  id: string
  name: string
  type: string
  status: "active" | "inactive" | "maintenance"
  host: string
  port: number
  username: string
  balance: number
  lastUsed: string
}

export default function GatewaysPage() {
  const [gateways, setGateways] = useState<Gateway[]>([
    {
      id: "1",
      name: "Npontu Technologies SMS",
      type: "SMS",
      status: "active",
      host: "eme.npontutechnologies.com",
      port: 62143,
      username: "skelebo@gmail.com",
      balance: 2450.5,
      lastUsed: "2024-01-15 14:30",
    },
    {
      id: "2",
      name: "WhatsApp Business API",
      type: "WhatsApp",
      status: "active",
      host: "graph.facebook.com",
      port: 443,
      username: "business_account",
      balance: 1200.0,
      lastUsed: "2024-01-15 12:15",
    },
    {
      id: "3",
      name: "Voice Gateway",
      type: "Voice",
      status: "maintenance",
      host: "voice.provider.com",
      port: 5060,
      username: "voice_user",
      balance: 800.25,
      lastUsed: "2024-01-14 18:45",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGateway, setEditingGateway] = useState<Gateway | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "SMS",
    host: "",
    port: "",
    username: "",
    password: "",
  })

  const handleCreateGateway = () => {
    const newGateway: Gateway = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      status: "active",
      host: formData.host,
      port: Number.parseInt(formData.port),
      username: formData.username,
      balance: 0,
      lastUsed: new Date().toLocaleString(),
    }
    setGateways([...gateways, newGateway])
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEditGateway = (gateway: Gateway) => {
    setEditingGateway(gateway)
    setFormData({
      name: gateway.name,
      type: gateway.type,
      host: gateway.host,
      port: gateway.port.toString(),
      username: gateway.username,
      password: "",
    })
    setIsDialogOpen(true)
  }

  const handleUpdateGateway = () => {
    if (editingGateway) {
      setGateways(
        gateways.map((g) =>
          g.id === editingGateway.id
            ? {
                ...g,
                name: formData.name,
                type: formData.type,
                host: formData.host,
                port: Number.parseInt(formData.port),
                username: formData.username,
              }
            : g,
        ),
      )
      setIsDialogOpen(false)
      setEditingGateway(null)
      resetForm()
    }
  }

  const handleDeleteGateway = (id: string) => {
    setGateways(gateways.filter((g) => g.id !== id))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "SMS",
      host: "",
      port: "",
      username: "",
      password: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gateway Management</h1>
          <p className="text-gray-600">Manage your messaging gateways and connections</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setEditingGateway(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Gateway
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingGateway ? "Edit Gateway" : "Add New Gateway"}</DialogTitle>
              <DialogDescription>
                {editingGateway ? "Update gateway configuration" : "Configure a new messaging gateway"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Voice">Voice</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="host" className="text-right">
                  Host
                </Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">
                  Port
                </Label>
                <Input
                  id="port"
                  type="number"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={editingGateway ? handleUpdateGateway : handleCreateGateway}>
                {editingGateway ? "Update Gateway" : "Create Gateway"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gateways</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gateways.length}</div>
            <p className="text-xs text-muted-foreground">Configured gateways</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Gateways</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gateways.filter((g) => g.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <span className="text-sm">GH₵</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ {gateways.reduce((sum, g) => sum + g.balance, 0).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across all gateways</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Gateway</CardTitle>
            <Badge className="bg-green-100 text-green-800">Connected</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Npontu Technologies</div>
            <p className="text-xs text-muted-foreground">Primary SMS provider</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gateway List</CardTitle>
          <CardDescription>Manage and monitor your messaging gateways</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gateways.map((gateway) => (
                <TableRow key={gateway.id}>
                  <TableCell className="font-medium">{gateway.name}</TableCell>
                  <TableCell>{gateway.type}</TableCell>
                  <TableCell>{getStatusBadge(gateway.status)}</TableCell>
                  <TableCell>
                    {gateway.host}:{gateway.port}
                  </TableCell>
                  <TableCell>GH₵ {gateway.balance.toFixed(2)}</TableCell>
                  <TableCell>{gateway.lastUsed}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditGateway(gateway)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteGateway(gateway.id)}>
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
    </div>
  )
}
