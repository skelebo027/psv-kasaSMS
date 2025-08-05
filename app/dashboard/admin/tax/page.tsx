import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaxOverview } from "@/components/tax-overview"
import { TaxSettings } from "@/components/tax-settings"
import { TaxReports } from "@/components/tax-reports"
import { TaxCompliance } from "@/components/tax-compliance"
import { BarChart, Settings, FileText, CheckCircle } from "lucide-react"

export default function AdminTaxPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tax Management</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <CheckCircle className="mr-2 h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <TaxOverview />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure global tax rates and rules.</CardDescription>
            </CardHeader>
            <CardContent>
              <TaxSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports</CardTitle>
              <CardDescription>Generate and view tax reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <TaxReports />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Compliance</CardTitle>
              <CardDescription>Ensure your tax configurations meet regulatory standards.</CardDescription>
            </CardHeader>
            <CardContent>
              <TaxCompliance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
