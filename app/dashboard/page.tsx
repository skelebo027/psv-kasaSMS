"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Phone,
  PlusCircle,
  Settings,
  Users,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { UserNav } from "@/components/user-nav"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 mr-4">
            <MessageSquare className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">KasaSMS</span>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Credits
            </Button>
            <Bell className="h-5 w-5 cursor-pointer" />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/sms">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageSquare className="h-5 w-5" />
                Bulk SMS
              </Button>
            </Link>
            <Link href="/dashboard/voice">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Phone className="h-5 w-5" />
                Voice SMS
              </Button>
            </Link>
            <Link href="/dashboard/email">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Mail className="h-5 w-5" />
                Bulk Email
              </Button>
            </Link>
            <Link href="/dashboard/whatsapp">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageSquare className="h-5 w-5" />
                WhatsApp
              </Button>
            </Link>
            <Link href="/dashboard/ussd">
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
                  <path d="M3.5 5.5 7 3.5l3.5 2 3.5-2 3.5 2v12.5l-3.5 2-3.5-2-3.5 2-3.5-2z" />
                  <path d="M7 3.5v12.5" />
                  <path d="M14 5.5v12.5" />
                  <path d="M3.5 18V5.5" />
                  <path d="M17.5 18V5.5" />
                </svg>
                USSD Platform
              </Button>
            </Link>
            <Link href="/dashboard/contacts">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-5 w-5" />
                Contacts
              </Button>
            </Link>
            <Link href="/dashboard/api">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <FileText className="h-5 w-5" />
                API Keys
              </Button>
            </Link>
            <Link href="/dashboard/billing">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CreditCard className="h-5 w-5" />
                Billing
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Tabs defaultValue="overview" className="w-[400px]" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,240</div>
                <p className="text-xs text-muted-foreground">+20% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
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
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Message Activity</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>You sent 234 messages this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New SMS Campaign
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  New Voice Campaign
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  New Email Campaign
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Account Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-orange-500" />
                    <span>SMS Credits</span>
                  </div>
                  <span className="font-medium">3,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-teal-500" />
                    <span>Voice Minutes</span>
                  </div>
                  <span className="font-medium">120</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <span>Email Credits</span>
                  </div>
                  <span className="font-medium">1,670</span>
                </div>
                <Button className="w-full">Add Credits</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">SMS Credits Purchase</p>
                    <p className="text-xs text-muted-foreground">May 12, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$49.00</p>
                    <p className="text-xs text-green-500">Completed</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Voice Credits Purchase</p>
                    <p className="text-xs text-muted-foreground">May 8, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$29.00</p>
                    <p className="text-xs text-green-500">Completed</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Monthly Subscription</p>
                    <p className="text-xs text-muted-foreground">May 1, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">$149.00</p>
                    <p className="text-xs text-green-500">Completed</p>
                  </div>
                </div>
                <Link href="/dashboard/billing">
                  <Button variant="outline" className="w-full">
                    View All Transactions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
