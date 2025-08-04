"use client"
import Link from "next/link"
import { ArrowLeft, Bell, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { USSDFlowBuilder } from "@/components/ussd-flow-builder"
import { USSDServiceForm } from "@/components/ussd-service-form"
import { USSDTestConsole } from "@/components/ussd-test-console"

export default function CreateUSSDPageClient() {
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
              href="/dashboard/ussd"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              USSD Platform
            </Link>
            <Link href="/dashboard/ussd/create" className="text-sm font-medium transition-colors hover:text-primary">
              Create Service
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="h-5 w-5 cursor-pointer" />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard/ussd">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create USSD Service</h1>
                <p className="text-muted-foreground">Design and configure your USSD service flow</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Service</Button>
            </div>
          </div>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Service Details</TabsTrigger>
              <TabsTrigger value="flow">Flow Builder</TabsTrigger>
              <TabsTrigger value="test">Test Console</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <USSDServiceForm />
            </TabsContent>
            <TabsContent value="flow" className="space-y-4">
              <USSDFlowBuilder />
            </TabsContent>
            <TabsContent value="test" className="space-y-4">
              <USSDTestConsole />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
