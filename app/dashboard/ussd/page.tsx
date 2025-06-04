import type { Metadata } from "next"
import Link from "next/link"
import { PlusCircle, BarChart3, Hash, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { USSDServicesList } from "@/components/ussd-services-list"
import { USSDStatistics } from "@/components/ussd-statistics"

export const metadata: Metadata = {
  title: "USSD Services | KasaSMS",
  description: "Create and manage USSD services for your customers",
}

export default function USSDPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">USSD Services</h1>
          <p className="text-muted-foreground">Create and manage interactive USSD services for your customers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/ussd/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Service
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="shortcodes">Shortcodes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                <div className="h-4 w-4 text-green-500 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xs font-bold">5</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registered Shortcodes</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">No change from last month</p>
              </CardContent>
            </Card>
          </div>
          <USSDServicesList />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USSD Service Analytics</CardTitle>
              <CardDescription>View detailed analytics for all your USSD services</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <USSDStatistics />
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/ussd/analytics">View Detailed Analytics</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="shortcodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USSD Shortcodes</CardTitle>
              <CardDescription>Manage your registered USSD shortcodes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="font-semibold">*123#</div>
                    <div className="text-sm text-muted-foreground">Main Banking Service</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-semibold">*456#</div>
                    <div className="text-sm text-muted-foreground">Customer Support</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-semibold">*789#</div>
                    <div className="text-sm text-muted-foreground">Product Catalog</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/ussd/shortcodes">Manage Shortcodes</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USSD Platform Settings</CardTitle>
              <CardDescription>Configure global settings for your USSD platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <div className="font-medium">Default Language</div>
                  <div className="text-sm text-muted-foreground">English (Default)</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Session Timeout</div>
                  <div className="text-sm text-muted-foreground">120 seconds</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Max Menu Items</div>
                  <div className="text-sm text-muted-foreground">9 items</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/ussd/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Settings
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
