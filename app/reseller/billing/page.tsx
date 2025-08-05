"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  CreditCard,
  Download,
  FileText,
  Globe,
  MessageSquare,
  Palette,
  Percent,
  Plus,
  Settings,
  Users,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserNav } from "@/components/user-nav"
import { ResellerNav } from "@/components/reseller-nav"

export default function ResellerBillingPage() {
  const [paymentMethod, setPaymentMethod] = useState("bank")

  // Placeholder for dynamic data - in a real app, this would come from an API
  const currentBalance = 0
  const monthlySpending = 0
  const commissionEarned = 0
  const nextBillingDate = "N/A"

  const recentTransactions: { date: string; description: string; amount: number; status: string }[] = []
  const invoicesAndReceipts: {
    date: string
    documentId: string
    type: string
    description: string
    amount: number
  }[] = []

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
              <Button variant="ghost" className="w-full justify-start gap-2">
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
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
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
            <h1 className="text-2xl font-bold">Reseller Billing</h1>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="mr-2 h-4 w-4" /> Add Funds
            </Button>
          </div>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${currentBalance.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">Available for services</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${monthlySpending.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">No change from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${commissionEarned.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">Total commission to date</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{nextBillingDate}</div>
                    <p className="text-xs text-muted-foreground">Reseller Plan - N/A</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment methods for reseller services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card
                      className={`cursor-pointer ${paymentMethod === "bank" ? "border-2 border-purple-500" : ""}`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Bank Transfer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">Pay via bank transfer</p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer ${paymentMethod === "mobile" ? "border-2 border-purple-500" : ""}`}
                      onClick={() => setPaymentMethod("mobile")}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Mobile Money</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">Pay via mobile money</p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer ${paymentMethod === "paystack" ? "border-2 border-purple-500" : ""}`}
                      onClick={() => setPaymentMethod("paystack")}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Paystack</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">Pay via credit/debit card</p>
                      </CardContent>
                    </Card>
                  </div>
                  {paymentMethod === "bank" && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Bank Account Details</h4>
                      <div className="rounded-md bg-gray-50 p-3 text-sm">
                        <p>
                          <span className="font-medium">Bank Name:</span> Reseller Bank
                        </p>
                        <p>
                          <span className="font-medium">Account Name:</span> YourBrandSMS Reseller
                        </p>
                        <p>
                          <span className="font-medium">Account Number:</span> 9876543210
                        </p>
                        <p>
                          <span className="font-medium">Branch:</span> Reseller Branch
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Please include your reseller ID in the transfer reference.
                        </p>
                      </div>
                    </div>
                  )}
                  {paymentMethod === "mobile" && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Mobile Money Details</h4>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-number">Mobile Number</Label>
                        <Input id="mobile-number" placeholder="Enter your mobile number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-provider">Provider</Label>
                        <Select defaultValue="mtn">
                          <SelectTrigger id="mobile-provider">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                            <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                            <SelectItem value="airtel">AirtelTigo Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {paymentMethod === "paystack" && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Card Details</h4>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input id="expiry-date" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Update Payment Method</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View all your past transactions and payments.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="transaction-filter" className="text-sm">
                        Filter:
                      </Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="transaction-filter" className="w-[180px]">
                          <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Transactions</SelectItem>
                          <SelectItem value="credits">Credit Purchases</SelectItem>
                          <SelectItem value="subscription">Subscription Payments</SelectItem>
                          <SelectItem value="refunds">Refunds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                  {recentTransactions.length === 0 ? (
                    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                      No transactions found.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentTransactions.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-green-500">{transaction.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  <div className="flex items-center justify-center">
                    <Button variant="outline" size="sm" className="mx-1 bg-transparent" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1 bg-gray-100">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1 bg-transparent" disabled>
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="invoices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices & Receipts</CardTitle>
                  <CardDescription>Download and view your invoices and receipts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="invoice-filter" className="text-sm">
                        Filter:
                      </Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="invoice-filter" className="w-[180px]">
                          <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Documents</SelectItem>
                          <SelectItem value="invoices">Invoices Only</SelectItem>
                          <SelectItem value="receipts">Receipts Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="invoice-year" className="text-sm">
                        Year:
                      </Label>
                      <Select defaultValue="2025">
                        <SelectTrigger id="invoice-year" className="w-[100px]">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {invoicesAndReceipts.length === 0 ? (
                    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                      No invoices or receipts found.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Document #</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoicesAndReceipts.map((doc, index) => (
                          <TableRow key={index}>
                            <TableCell>{doc.date}</TableCell>
                            <TableCell className="font-mono text-xs">{doc.documentId}</TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.description}</TableCell>
                            <TableCell className="font-medium">${doc.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                  <div className="flex items-center justify-center">
                    <Button variant="outline" size="sm" className="mx-1 bg-transparent" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1 bg-gray-100">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1 bg-transparent" disabled>
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
