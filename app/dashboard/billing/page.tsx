"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DollarSign, CreditCard, History, FileText } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Billing & Payments</h2>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>Your current account balance for services.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold flex items-center">
              <DollarSign className="h-8 w-8 mr-2" />
              {"0.00"}
            </div>
            <Button>Add Funds</Button>
          </CardContent>
        </Card>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" /> Payment Methods
              </CardTitle>
              <CardDescription>Manage your saved payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No payment methods saved.</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="mr-2 h-5 w-5" /> Transaction History
              </CardTitle>
              <CardDescription>View your past transactions and payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No transactions to display.</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Invoices
              </CardTitle>
              <CardDescription>Access your monthly invoices and billing statements.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No invoices available.</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                View Invoices
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Billing Preferences</CardTitle>
            <CardDescription>Configure your billing and notification settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Billing preferences are not yet configured.</p>
            <Button variant="outline" className="mt-4 bg-transparent" disabled>
              Manage Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
