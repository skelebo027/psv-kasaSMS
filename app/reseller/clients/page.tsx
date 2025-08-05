"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  CreditCard,
  Download,
  Edit,
  Globe,
  MessageSquare,
  MoreHorizontal,
  Palette,
  Percent,
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserNav } from "@/components/user-nav"
import { ResellerNav } from "@/components/reseller-nav"

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Initialize clients as an empty array
  const clients: {
    id: number
    name: string
    email: string
    phone: string
    status: string
    plan: string
    revenue: string
    lastActive: string
  }[] = []

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 mr-4">
            <MessageSquare className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold text-purple-500">YourBrandSMS</span>
            <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Reseller Portal</div>
          </div>
          <ResellerNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="h-5 w-5 cursor-pointer" />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/reseller">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/reseller/clients">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
                <Users className="h-5 w-5" />
                Clients
              </Button>
            </Link>
            <Link href="/reseller/services">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageSquare className="h-5 w-5" />
                Services
              </Button>
            </Link>
            <Link href="/reseller/pricing">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Percent className="h-5 w-5" />
                Pricing
              </Button>
            </Link>
            <Link href="/reseller/branding">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Palette className="h-5 w-5" />
                Branding
              </Button>
            </Link>
            <Link href="/reseller/domain">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Globe className="h-5 w-5" />
                Domain
              </Button>
            </Link>
            <Link href="/reseller/billing">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CreditCard className="h-5 w-5" />
                Billing
              </Button>
            </Link>
            <Link href="/reseller/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Client Management</h1>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Your Clients</CardTitle>
              <CardDescription>Manage your client accounts and their services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </div>
              </div>
              {filteredClients.length === 0 ? (
                <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">No clients found.</div>
                    <div className="text-xs">Add your first client to get started.</div>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{client.email}</span>
                            <span className="text-xs text-muted-foreground">{client.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              client.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {client.status}
                          </span>
                        </TableCell>
                        <TableCell>{client.plan}</TableCell>
                        <TableCell>{client.revenue}</TableCell>
                        <TableCell>{client.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                View Client
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Manage Services
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Billing History
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Client
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
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredClients.length} of {clients.length} clients
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-100">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Client Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Clients</span>
                  <span className="font-medium">{clients.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Clients</span>
                  <span className="font-medium">{clients.filter((c) => c.status === "Active").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Inactive Clients</span>
                  <span className="font-medium">{clients.filter((c) => c.status === "Inactive").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Enterprise Clients</span>
                  <span className="font-medium">{clients.filter((c) => c.plan === "Enterprise").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Business Clients</span>
                  <span className="font-medium">{clients.filter((c) => c.plan === "Business").length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Starter Clients</span>
                  <span className="font-medium">{clients.filter((c) => c.plan === "Starter").length}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Revenue</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Revenue per Client</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Highest Revenue Client</span>
                  <span className="font-medium">N/A</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Your Commission</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Client
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Bulk Message
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export Client List
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
