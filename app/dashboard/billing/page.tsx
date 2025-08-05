"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, FileText, MessageSquare, Wallet, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BillingPage() {
  const [paymentMethod, setPaymentMethod] = useState("bank")

  // Placeholder for dynamic data - in a real app, this would come from an API
  const currentBalance = 0
  const monthlySpending = 0
  const smsCredits = 0
  const nextBillingDate = "N/A"
  const currentPlan = "No Plan"
  const planPrice = "N/A"
  const nextBillingInfo = "N/A"
  const paymentMethodDetails = { type: "N/A", last4: "N/A" }
  const billingAddress = {
    name: "N/A",
    company: "N/A",
    street: "N/A",
    city: "N/A",
    country: "N/A",
  }

  const recentTransactions: { date: string; description: string; amount: number; status: string }[] = []
  const transactionHistory: {
    date: string
    transactionId: string
    description: string
    type: string
    amount: number
    status: string
  }[] = []
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
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Billing</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Payment Method</span>
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                    <span className="text-muted-foreground text-sm">$0.00</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$0.00</div>
                    <p className="text-xs text-muted-foreground">No outstanding balance.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
                    <span className="text-muted-foreground text-sm">N/A</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">N/A</div>
                    <p className="text-xs text-muted-foreground">No recent payments.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
                    <span className="text-muted-foreground text-sm">N/A</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">N/A</div>
                    <p className="text-xs text-muted-foreground">No upcoming payments.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>No recent invoices to display.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-8">No recent invoices.</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="payment-methods" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>No payment methods added yet.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground py-8">
                    No payment methods found. Add a new payment method to get started.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="invoices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>No invoices available.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground py-8">No invoices to display.</div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>No transactions available.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground py-8">No transactions to display.</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
