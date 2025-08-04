"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function USSDAnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Session Activity</CardTitle>
          <CardDescription>Daily sessions and completion rates</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No session data</p>
              <p className="text-sm">USSD session analytics will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Service Usage</CardTitle>
          <CardDescription>Distribution of sessions by service</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No service data</p>
              <p className="text-sm">Service usage will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-4 lg:col-span-7">
        <CardHeader>
          <CardTitle>Menu Navigation Analysis</CardTitle>
          <CardDescription>Views and exit rates for each menu</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No navigation data</p>
              <p className="text-sm">Menu analytics will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
