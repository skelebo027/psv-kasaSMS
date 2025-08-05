import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaxOverview } from "@/components/tax-overview"
import { TaxSettings } from "@/components/tax-settings"
import { TaxReports } from "@/components/tax-reports"
import { TaxCompliance } from "@/components/tax-compliance"

export default function AdminTaxPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Tax Management</h1>
      </div>
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview">
          <TaxOverview />
        </TabsContent>
        <TabsContent value="settings">
          <TaxSettings />
        </TabsContent>
        <TabsContent value="reports">
          <TaxReports />
        </TabsContent>
        <TabsContent value="compliance">
          <TaxCompliance />
        </TabsContent>
      </Tabs>
    </div>
  )
}
