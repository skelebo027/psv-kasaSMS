"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { USSDAnalyticsDashboard } from "@/components/ussd-analytics-dashboard"
import { USSDServicesList } from "@/components/ussd-services-list"
import { USSDServiceForm } from "@/components/ussd-service-form"
import { USSDTestConsole } from "@/components/ussd-test-console"
import { PlusCircle, List, BarChart, TestTube } from "lucide-react"

export default function USSDPage() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">USSD Management</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setActiveTab("create")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New USSD Service
          </Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="services">
            <List className="mr-2 h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="test">
            <TestTube className="mr-2 h-4 w-4" />
            Test Console
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="space-y-4">
          <USSDAnalyticsDashboard />
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USSD Services List</CardTitle>
              <CardDescription>Manage your existing USSD services.</CardDescription>
            </CardHeader>
            <CardContent>
              <USSDServicesList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New USSD Service</CardTitle>
              <CardDescription>Define the details for your new USSD service.</CardDescription>
            </CardHeader>
            <CardContent>
              <USSDServiceForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USSD Test Console</CardTitle>
              <CardDescription>Simulate USSD interactions to test your services.</CardDescription>
            </CardHeader>
            <CardContent>
              <USSDTestConsole />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
