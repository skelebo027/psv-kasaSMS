"use client"

import { useState } from "react"
import { BarChart3, Briefcase, CreditCard, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // In a live system, this data would be fetched from an real API.
  // For now, we display empty states.
  const totalRevenue = 0
  const totalRevenueChange = "No data available"
  const activeClients = 0
  const activeClientsChange = "No new clients this month"
  const messagesSent = 0
  const messagesSentChange = "No messages sent yet"
  const commission = 0
  const commissionChange = "No commission earned yet"

  const recentClients: { name: string; addedOn: string; amount: string }[] = [] // Empty array for no mock data
  const serviceStatus = [
    { name: "SMS Service", icon: MessageSquare, color: "purple", status: "Active" },
    { name: "Voice Service", icon: "Phone", color: "teal", status: "Active" }, // Using string for icon to map later
    { name: "Email Service", icon: "Mail", color: "blue", status: "Active" },
    { name: "WhatsApp Service", icon: "MessageCircle", color: "green", status: "Active" },
    { name: "USSD Service", icon: "BookOpen", color: "yellow", status: "Active" },
  ]

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Phone":
        return (
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )
      case "Mail":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        )
      case "MessageCircle":
        return (
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )
      case "BookOpen":
        return (
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
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reseller Dashboard</h1>
        <Tabs defaultValue="overview" className="w-[400px]" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{totalRevenueChange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">{activeClientsChange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesSent}</div>
            <p className="text-xs text-muted-foreground">{messagesSentChange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${commission.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{commissionChange}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Your revenue and commission over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2 text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Revenue chart will appear here</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>No recent clients to display.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentClients.length > 0 ? (
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
                      <Users className="h-5 w-5 text-purple-700" />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{client.name}</p>
                      <p className="text-sm text-muted-foreground">Added on {client.addedOn}</p>
                    </div>
                    <div className="ml-auto font-medium">{client.amount}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-sm font-medium">No recent clients</p>
                  <p className="text-xs">New clients will appear here.</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-transparent">
              View All Clients
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button className="w-full bg-purple-500 hover:bg-purple-600">
              <Users className="mr-2 h-4 w-4" />
              Add New Client
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <MessageSquare className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <CreditCard className="mr-2 h-4 w-4" />
              Purchase Credits
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceStatus.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-sm font-medium">No service status available</p>
                  <p className="text-xs">Service health will be displayed here.</p>
                </div>
              </div>
            ) : (
              serviceStatus.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {typeof service.icon === "string" ? (
                      getServiceIcon(service.icon)
                    ) : (
                      <service.icon className={`h-5 w-5 text-${service.color}-500`} />
                    )}
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
            <CardTitle>Reseller Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">No Plan Selected</p>
                  <p className="text-sm text-muted-foreground">Please select a plan</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">N/A</p>
                  <p className="text-sm text-muted-foreground">Next billing: N/A</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Features:</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
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
                      className="mr-2 h-4 w-4 text-gray-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                    No features available
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
