"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaxOverview } from "@/components/tax-overview"
import { TaxSettings } from "@/components/tax-settings"
import { TaxReports } from "@/components/tax-reports"
import { TaxCompliance } from "@/components/tax-compliance"

export default function AdminTaxPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tax Management</h1>
          <p className="text-gray-600">Manage tax settings, compliance, and reporting</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <TaxOverview />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <TaxSettings />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <TaxReports />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <TaxCompliance />
        </TabsContent>
      </Tabs>
    </div>
  )
}
