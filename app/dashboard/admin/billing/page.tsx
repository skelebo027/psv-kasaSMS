"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, DollarSign, TrendingUp, Users, Download, Eye } from "lucide-react"

interface Transaction {
  id: string
  userId: string
  userName: string
  type: "payment" | "usage" | "refund"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

export default function AdminBillingPage() {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      userId: "user1",
      userName: "John Doe",
      type: "payment",
      amount: 500.0,
      description: "Account top-up via Paystack",
      date: "2024-01-15 14:30",
      status: "completed",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Jane Smith",
      type: "usage",
      amount: -45.6,
      description: "SMS campaign - 1520 messages",
      date: "2024-01-15 12:15",
      status: "completed",
    },
    {
      id: "3",
      userId: "user3",
      userName: "Bob Wilson",
      type: "payment",
      amount: 1000.0,
      description: "Monthly subscription - Business Plan",
      date: "2024-01-15 10:00",
      status: "completed",
    },
    {
      id: "4",
      userId: "user4",
      userName: "Alice Brown",
      type: "refund",
      amount: 25.0,
      description: "Failed SMS delivery refund",
      date: "2024-01-14 16:45",
      status: "pending",
    },
  ])

  const [timeRange, setTimeRange] = useState("7d")

  const totalRevenue = transactions
    .filter((t) => t.type === "payment" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalUsage = Math.abs(transactions.filter((t) => t.type === "usage").reduce((sum, t) => sum + t.amount, 0))

  const pendingAmount = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "payment":
        return <Badge className="bg-green-100 text-green-800">Payment</Badge>
      case "usage":
        return <Badge className="bg-blue-100 text-blue-800">Usage</Badge>
      case "refund":
        return <Badge className="bg-orange-100 text-orange-800">Refund</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Billing & Revenue</h1>
          <p className="text-gray-600">Monitor revenue, transactions, and billing analytics</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ {totalUsage.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From messaging services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ {pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">Paying customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
              Revenue Chart Placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Revenue by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Paystack</span>
                <span className="text-sm text-muted-foreground">GH₵ 1,250.00 (65%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mobile Money</span>
                <span className="text-sm text-muted-foreground">GH₵ 580.00 (30%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bank Transfer</span>
                <span className="text-sm text-muted-foreground">GH₵ 95.00 (5%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest billing transactions and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.userName}</TableCell>
                  <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className={transaction.amount < 0 ? "text-red-600" : "text-green-600"}>
                    GH₵ {Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
