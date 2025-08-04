"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function USSDUserBehavior() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Retention</CardTitle>
            <CardDescription>Distribution of users by usage frequency</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">No retention data</p>
                <p className="text-sm">User retention analytics will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Duration</CardTitle>
            <CardDescription>Distribution of sessions by duration</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">No duration data</p>
                <p className="text-sm">Session duration analytics will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most Popular Menus</CardTitle>
          <CardDescription>Usage statistics for the most accessed USSD menus</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Menu Name</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Avg. Time Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No menu data available
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Journey Analysis</CardTitle>
          <CardDescription>Common paths users take through the USSD service</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium">No journey data</p>
            <p className="text-sm">User journey visualization will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
