"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, BarChart3, Code, Users, Settings, ListChecks } from "lucide-react"
import Link from "next/link"

export default function USSDPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Empty arrays for mock data removal
  const ussdStatistics = {
    totalServices: 0,
    activeServices: 0,
    totalRequests: 0,
    successfulRequests: 0,
  }

  const ussdShortcodes: { id: string; shortcode: string; serviceName: string; status: string; created: string }[] = []

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">USSD Management</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/ussd/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New USSD Service
            </Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="shortcodes">
            <Code className="mr-2 h-4 w-4" /> Shortcodes
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Users className="mr-2 h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Services</CardTitle>
                <ListChecks className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ussdStatistics.totalServices}</div>
                <p className="text-xs text-muted-foreground">Number of USSD services created</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                <ListChecks className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ussdStatistics.activeServices}</div>
                <p className="text-xs text-muted-foreground">Currently running services</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ussdStatistics.totalRequests}</div>
                <p className="text-xs text-muted-foreground">Total USSD requests received</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Requests</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ussdStatistics.successfulRequests}</div>
                <p className="text-xs text-muted-foreground">Requests completed without error</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>USSD Service Performance</CardTitle>
              <CardDescription>Overview of your USSD service performance.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">No performance data available</p>
                  <p className="text-xs">Performance metrics will appear here once services are active.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shortcodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Managed USSD Shortcodes</CardTitle>
              <CardDescription>List of all your USSD shortcodes and their associated services.</CardDescription>
            </CardHeader>
            <CardContent>
              {ussdShortcodes.length > 0 ? (
                <div className="overflow-x-auto">{/* Table for shortcodes would go here */}</div>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Code className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">No USSD shortcodes found</p>
                    <p className="text-xs">Create a new USSD service to get started.</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/ussd/create">
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Shortcode
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USSD Analytics</CardTitle>
              <CardDescription>Detailed analytics for your USSD services.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">No analytics data available</p>
                  <p className="text-xs">Analytics will appear here once services are active.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USSD Settings</CardTitle>
              <CardDescription>Configure global settings for your USSD services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">No settings configured</p>
                  <p className="text-xs">Settings options will be available here.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
