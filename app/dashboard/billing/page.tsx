"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp, CreditCard, Download, FileText, MessageSquare, Plus, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BillingPage() {
  const [paymentMethod, setPaymentMethod] = useState("bank")

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
            <Link href="/dashboard/billing" className="text-sm font-medium transition-colors hover:text-primary">
              Billing
            </Link>
          </nav>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/dashboard/billing">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CreditCard className="h-5 w-5" />
                Billing Overview
              </Button>
            </Link>
            <Link href="/dashboard/billing/payment-methods">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Wallet className="h-5 w-5" />
                Payment Methods
              </Button>
            </Link>
            <Link href="/dashboard/billing/invoices">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="h-5 w-5" />
                Invoices & Receipts
              </Button>
            </Link>
            <Link href="/dashboard/billing/tax">
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
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                Tax Information
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Billing & Payments</h1>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Add Credits
            </Button>
          </div>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="add-credits">Add Credits</TabsTrigger>
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
                    <div className="text-2xl font-bold">$345.00</div>
                    <p className="text-xs text-muted-foreground">Available for services</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,245.00</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">SMS Credits</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,450</div>
                    <p className="text-xs text-muted-foreground">Approx. $172.50 value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">May 28, 2025</div>
                    <p className="text-xs text-muted-foreground">Business Plan - $149.00</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Billing Summary</CardTitle>
                  <CardDescription>Your billing and payment information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Current Plan</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Business Plan</p>
                        <p className="text-sm text-muted-foreground">Billed monthly</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$149.00/month</p>
                        <p className="text-sm text-muted-foreground">Next billing: May 28, 2025</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Change Plan
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel Plan
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Mobile Money</p>
                          <p className="text-sm text-muted-foreground">+233 XX XXX XXXX</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Billing Address</h3>
                    <div className="mt-2">
                      <p>John Doe</p>
                      <p>KasaSMS Inc.</p>
                      <p>123 Main Street</p>
                      <p>Accra, Ghana</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
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
                      <TableRow>
                        <TableCell>May 12, 2025</TableCell>
                        <TableCell>SMS Credits Purchase</TableCell>
                        <TableCell className="font-medium">$49.00</TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 8, 2025</TableCell>
                        <TableCell>Voice Credits Purchase</TableCell>
                        <TableCell className="font-medium">$29.00</TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 1, 2025</TableCell>
                        <TableCell>Monthly Subscription</TableCell>
                        <TableCell className="font-medium">$149.00</TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 15, 2025</TableCell>
                        <TableCell>SMS Credits Purchase</TableCell>
                        <TableCell className="font-medium">$99.00</TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 1, 2025</TableCell>
                        <TableCell>Monthly Subscription</TableCell>
                        <TableCell className="font-medium">$149.00</TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="add-credits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Credits to Your Account</CardTitle>
                  <CardDescription>
                    Purchase credits to use for SMS, voice, email, and WhatsApp messaging.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="credit-type">Select Credit Type</Label>
                    <Select defaultValue="sms">
                      <SelectTrigger id="credit-type">
                        <SelectValue placeholder="Select credit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS Credits</SelectItem>
                        <SelectItem value="voice">Voice Minutes</SelectItem>
                        <SelectItem value="email">Email Credits</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp Credits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credit-amount">Amount</Label>
                    <Select defaultValue="1000">
                      <SelectTrigger id="credit-amount">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">500 Credits - $25.00</SelectItem>
                        <SelectItem value="1000">1,000 Credits - $49.00</SelectItem>
                        <SelectItem value="5000">5,000 Credits - $225.00</SelectItem>
                        <SelectItem value="10000">10,000 Credits - $400.00</SelectItem>
                        <SelectItem value="custom">Custom Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Card
                        className={`cursor-pointer ${paymentMethod === "bank" ? "border-2 border-orange-500" : ""}`}
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
                        className={`cursor-pointer ${paymentMethod === "mobile" ? "border-2 border-orange-500" : ""}`}
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
                        className={`cursor-pointer ${paymentMethod === "paystack" ? "border-2 border-orange-500" : ""}`}
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
                            <span className="font-medium">Bank Name:</span> Ghana Commercial Bank
                          </p>
                          <p>
                            <span className="font-medium">Account Name:</span> KasaSMS Ltd
                          </p>
                          <p>
                            <span className="font-medium">Account Number:</span> 1234567890
                          </p>
                          <p>
                            <span className="font-medium">Branch:</span> Accra Main
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Please include your account ID in the transfer reference.
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
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Complete Purchase</Button>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>May 12, 2025</TableCell>
                        <TableCell className="font-mono text-xs">TXN-12345678</TableCell>
                        <TableCell>SMS Credits Purchase</TableCell>
                        <TableCell>Credit Purchase</TableCell>
                        <TableCell className="font-medium text-green-600">
                          <div className="flex items-center">
                            <ArrowDown className="mr-1 h-4 w-4" />
                            $49.00
                          </div>
                        </TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 8, 2025</TableCell>
                        <TableCell className="font-mono text-xs">TXN-12345677</TableCell>
                        <TableCell>Voice Credits Purchase</TableCell>
                        <TableCell>Credit Purchase</TableCell>
                        <TableCell className="font-medium text-green-600">
                          <div className="flex items-center">
                            <ArrowDown className="mr-1 h-4 w-4" />
                            $29.00
                          </div>
                        </TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 1, 2025</TableCell>
                        <TableCell className="font-mono text-xs">TXN-12345676</TableCell>
                        <TableCell>Monthly Subscription</TableCell>
                        <TableCell>Subscription</TableCell>
                        <TableCell className="font-medium text-green-600">
                          <div className="flex items-center">
                            <ArrowDown className="mr-1 h-4 w-4" />
                            $149.00
                          </div>
                        </TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 20, 2025</TableCell>
                        <TableCell className="font-mono text-xs">TXN-12345675</TableCell>
                        <TableCell>Refund - Unused Credits</TableCell>
                        <TableCell>Refund</TableCell>
                        <TableCell className="font-medium text-red-600">
                          <div className="flex items-center">
                            <ArrowUp className="mr-1 h-4 w-4" />
                            $25.00
                          </div>
                        </TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 15, 2025</TableCell>
                        <TableCell className="font-mono text-xs">TXN-12345674</TableCell>
                        <TableCell>SMS Credits Purchase</TableCell>
                        <TableCell>Credit Purchase</TableCell>
                        <TableCell className="font-medium text-green-600">
                          <div className="flex items-center">
                            <ArrowDown className="mr-1 h-4 w-4" />
                            $99.00
                          </div>
                        </TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 1, 2025</TableCell>
                        <TableCell className="font-mono text-xs">TXN-12345673</TableCell>
                        <TableCell>Monthly Subscription</TableCell>
                        <TableCell>Subscription</TableCell>
                        <TableCell className="font-medium text-green-600">
                          <div className="flex items-center">
                            <ArrowDown className="mr-1 h-4 w-4" />
                            $149.00
                          </div>
                        </TableCell>
                        <TableCell className="text-green-500">Completed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="flex items-center justify-center">
                    <Button variant="outline" size="sm" className="mx-1">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1 bg-gray-100">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
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
                      <TableRow>
                        <TableCell>May 12, 2025</TableCell>
                        <TableCell className="font-mono text-xs">INV-20250512</TableCell>
                        <TableCell>Receipt</TableCell>
                        <TableCell>SMS Credits Purchase</TableCell>
                        <TableCell className="font-medium">$49.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 8, 2025</TableCell>
                        <TableCell className="font-mono text-xs">INV-20250508</TableCell>
                        <TableCell>Receipt</TableCell>
                        <TableCell>Voice Credits Purchase</TableCell>
                        <TableCell className="font-medium">$29.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 1, 2025</TableCell>
                        <TableCell className="font-mono text-xs">INV-20250501</TableCell>
                        <TableCell>Invoice</TableCell>
                        <TableCell>Monthly Subscription - May 2025</TableCell>
                        <TableCell className="font-medium">$149.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 1, 2025</TableCell>
                        <TableCell className="font-mono text-xs">RCT-20250501</TableCell>
                        <TableCell>Receipt</TableCell>
                        <TableCell>Monthly Subscription - May 2025</TableCell>
                        <TableCell className="font-medium">$149.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 15, 2025</TableCell>
                        <TableCell className="font-mono text-xs">INV-20250415</TableCell>
                        <TableCell>Receipt</TableCell>
                        <TableCell>SMS Credits Purchase</TableCell>
                        <TableCell className="font-medium">$99.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 1, 2025</TableCell>
                        <TableCell className="font-mono text-xs">INV-20250401</TableCell>
                        <TableCell>Invoice</TableCell>
                        <TableCell>Monthly Subscription - April 2025</TableCell>
                        <TableCell className="font-medium">$149.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Apr 1, 2025</TableCell>
                        <TableCell className="font-mono text-xs">RCT-20250401</TableCell>
                        <TableCell>Receipt</TableCell>
                        <TableCell>Monthly Subscription - April 2025</TableCell>
                        <TableCell className="font-medium">$149.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="flex items-center justify-center">
                    <Button variant="outline" size="sm" className="mx-1">
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1 bg-gray-100">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
                      3
                    </Button>
                    <Button variant="outline" size="sm" className="mx-1">
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
