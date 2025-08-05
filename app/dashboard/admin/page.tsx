"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Bell, CreditCard, MessageSquare, Settings, Users, Wallet, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Placeholder for dynamic data - in a real app, this would come from an API
  const totalUsers = 0
  const activeServices = 0
  const totalRevenue = 0
  const pendingApprovals = 0

  const recentActivities: { id: string; description: string; date: string }[] = []
  const serviceHealth: { name: string; status: string; icon: string; color: string }[] = [
    { name: "SMS Gateway", status: "Operational", icon: "MessageSquare", color: "green" },
    { name: "Voice Gateway", status: "Operational", icon: "Phone", color: "green" },
    { name: "Email Service", status: "Operational", icon: "Mail", color: "green" },
  ]

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "MessageSquare":
        return <MessageSquare className="h-5 w-5" />
      case "Phone":
        return <Phone className="h-5 w-5" />
      case "Mail":
        return <Mail className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 mr-4">
            <MessageSquare className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">KasaSMS</span>
            <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Admin Portal</div>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="h-5 w-5 cursor-pointer" />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/dashboard/admin">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/admin/users">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-5 w-5" />
                Users
              </Button>
            </Link>
            <Link href="/dashboard/admin/gateways">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageSquare className="h-5 w-5" />
                Gateways
              </Button>
            </Link>
            <Link href="/dashboard/admin/api">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CreditCard className="h-5 w-5" />
                API Management
              </Button>
            </Link>
            <Link href="/dashboard/admin/billing">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Wallet className="h-5 w-5" />
                Billing
              </Button>
            </Link>
            <Link href="/dashboard/admin/tax">
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
                Tax Management
              </Button>
            </Link>
            <Link href="/dashboard/admin/security">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Security
              </Button>
            </Link>
            <Link href="/dashboard/admin/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Tabs defaultValue="overview" className="w-[400px]" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Gateways</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No active gateways</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.00</div>
                <p className="text-xs text-muted-foreground">Platform-wide earnings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Settings</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Up-to-date</div>
                <p className="text-xs text-muted-foreground">All configurations are current</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Key metrics and performance indicators.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Admin Actions</CardTitle>
                <CardDescription>No recent admin actions.</CardDescription>
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
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Configure Gateways
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Service Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {serviceHealth.length === 0 ? (
                  <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <p className="text-sm font-medium">No service health data</p>
                      <p className="text-xs">Service status will be displayed here.</p>
                    </div>
                  </div>
                ) : (
                  serviceHealth.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getServiceIcon(service.icon)}
                        <span>{service.name}</span>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full bg-${service.color}-100 px-2.5 py-0.5 text-xs font-medium text-${service.color}-800`}
                      >
                        {service.status}
                      </span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <p className="text-sm font-medium">No active alerts</p>
                    <p className="text-xs">Critical system alerts will appear here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
