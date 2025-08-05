"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Settings, FileText, Scale } from "lucide-react"
import { TaxOverview } from "@/components/tax-overview"
import { TaxSettings } from "@/components/tax-settings"
import { TaxReports } from "@/components/tax-reports"
import { TaxCompliance } from "@/components/tax-compliance"

export default function AdminTaxPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tax Management</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" /> Reports
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <Scale className="mr-2 h-4 w-4" /> Compliance
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <TaxOverview />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <TaxReports />
        </TabsContent>
        <TabsContent value="compliance" className="space-y-4">
          <TaxCompliance />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <TaxSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
