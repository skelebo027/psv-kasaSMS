"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  BarChart3,
  Bell,
  Check,
  Copy,
  Database,
  Grid,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserNav } from "@/components/user-nav"

export default function ShortCodesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)

  const shortCodes = [
    {
      id: 1,
      code: "*123#",
      service: "Banking Service",
      status: "Active",
      type: "Dedicated",
      provider: "MTN",
      expiryDate: "Dec 31, 2025",
    },
    {
      id: 2,
      code: "*456#",
      service: "Customer Support",
      status: "Active",
      type: "Shared",
      provider: "Vodafone",
      expiryDate: "Jun 30, 2026",
    },
    {
      id: 3,
      code: "*789#",
      service: "Product Catalog",
      status: "Inactive",
      type: "Dedicated",
      provider: "AirtelTigo",
      expiryDate: "Mar 15, 2025",
    },
    {
      id: 4,
      code: "*321#",
      service: "Order Tracking",
      status: "Active",
      type: "Dedicated",
      provider: "MTN",
      expiryDate: "Sep 30, 2025",
    },
    {
      id: 5,
      code: "*654#",
      service: "Feedback Survey",
      status: "Pending",
      type: "Shared",
      provider: "Vodafone",
      expiryDate: "Jan 15, 2026",
    },
  ]

  const filteredShortCodes = shortCodes.filter(
    (code) =>
      code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.provider.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
              href="/dashboard/ussd"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              USSD Platform
            </Link>
            <Link
              href="/dashboard/ussd/shortcodes"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Short Codes
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="h-5 w-5 cursor-pointer" />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/dashboard/ussd">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Grid className="h-5 w-5" />
                USSD Services
              </Button>
            </Link>
            <Link href="/dashboard/ussd/create">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Plus className="h-5 w-5" />
                Create Service
              </Button>
            </Link>
            <Link href="/dashboard/ussd/analytics">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics
              </Button>
            </Link>
            <Link href="/dashboard/ussd/shortcodes">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
                <Phone className="h-5 w-5" />
                Short Codes
              </Button>
            </Link>
            <Link href="/dashboard/ussd/integrations">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Database className="h-5 w-5" />
                Integrations
              </Button>
            </Link>
            <Link href="/dashboard/ussd/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">USSD Short Codes</h1>
              <p className="text-sm text-muted-foreground">Manage your USSD short codes and their assignments.</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Request New Short Code
            </Button>
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Information</AlertTitle>
            <AlertDescription>
              Short codes are assigned by mobile network operators and may take 2-4 weeks for approval. Ensure your
              service complies with all regulatory requirements before requesting a short code.
            </AlertDescription>
          </Alert>
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active Short Codes</TabsTrigger>
              <TabsTrigger value="pending">Pending Requests</TabsTrigger>
              <TabsTrigger value="all">All Short Codes</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Short Codes</CardTitle>
                  <CardDescription>Short codes that are currently active and assigned to services.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-64">
                      <Input
                        placeholder="Search short codes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Providers</SelectItem>
                          <SelectItem value="mtn">MTN</SelectItem>
                          <SelectItem value="vodafone">Vodafone</SelectItem>
                          <SelectItem value="airteltigo">AirtelTigo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Short Code</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShortCodes
                        .filter((code) => code.status === "Active")
                        .map((code) => (
                          <TableRow key={code.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {code.code}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(code.code)}
                                >
                                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{code.service}</TableCell>
                            <TableCell>{code.type}</TableCell>
                            <TableCell>{code.provider}</TableCell>
                            <TableCell>{code.expiryDate}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {code.status}
                              </span>
                            </TableCell>
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
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                                  <DropdownMenuItem>Renew Short Code</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Short Code Requests</CardTitle>
                  <CardDescription>
                    Short code requests that are awaiting approval from mobile network operators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Short Code</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Requested Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShortCodes
                        .filter((code) => code.status === "Pending")
                        .map((code) => (
                          <TableRow key={code.id}>
                            <TableCell className="font-medium">REQ-{code.id.toString().padStart(5, "0")}</TableCell>
                            <TableCell>{code.code}</TableCell>
                            <TableCell>{code.service}</TableCell>
                            <TableCell>{code.provider}</TableCell>
                            <TableCell>May 10, 2025</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                {code.status}
                              </span>
                            </TableCell>
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
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Check Status</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Cancel Request</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Short Codes</CardTitle>
                  <CardDescription>Complete list of all your short codes and their current status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-64">
                      <Input
                        placeholder="Search short codes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Short Code</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShortCodes.map((code) => (
                        <TableRow key={code.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {code.code}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(code.code)}
                              >
                                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{code.service}</TableCell>
                          <TableCell>{code.type}</TableCell>
                          <TableCell>{code.provider}</TableCell>
                          <TableCell>{code.expiryDate}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                code.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : code.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {code.status}
                            </span>
                          </TableCell>
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
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                                {code.status === "Active" && <DropdownMenuItem>Renew Short Code</DropdownMenuItem>}
                                {code.status === "Pending" && <DropdownMenuItem>Check Status</DropdownMenuItem>}
                                {code.status === "Inactive" && <DropdownMenuItem>Reactivate</DropdownMenuItem>}
                                <DropdownMenuSeparator />
                                {code.status === "Active" ? (
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                ) : code.status === "Pending" ? (
                                  <DropdownMenuItem className="text-red-600">Cancel Request</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
