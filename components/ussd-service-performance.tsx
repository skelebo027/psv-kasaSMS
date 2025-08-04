"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function USSDServicePerformance() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Service Response Times</CardTitle>
          <CardDescription>Average, minimum, and maximum response times by service (in milliseconds)</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No performance data</p>
              <p className="text-sm">Service performance metrics will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Rate Trend</CardTitle>
          <CardDescription>Daily error rate percentage across all services</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No error data</p>
              <p className="text-sm">Error rate trends will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Service Health Overview</CardTitle>
          <CardDescription>Performance metrics for all USSD services</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Avg Response Time</TableHead>
                <TableHead>Error Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No services configured yet
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
