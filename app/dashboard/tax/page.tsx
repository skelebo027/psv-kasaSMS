import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaxOverview } from "@/components/tax-overview"
import { TaxSettings } from "@/components/tax-settings"
import { TaxReports } from "@/components/tax-reports"
import { TaxCompliance } from "@/components/tax-compliance"

export const metadata: Metadata = {
  title: "Tax Management | KasaSMS",
  description: "Manage tax collection, reporting, and compliance for your messaging services.",
}

export default function TaxPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tax Management</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Tax Settings</TabsTrigger>
            <TabsTrigger value="reports">Tax Reports</TabsTrigger>
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
    </div>
  )
}
