"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Calendar, CheckCircle2, Clock, Download, FileText } from "lucide-react"

// Sample data for compliance calendar
const complianceCalendar = [
  { id: 1, name: "VAT Return - Q3", dueDate: "2023-10-31", status: "upcoming", type: "vat", priority: "high" },
  {
    id: 2,
    name: "Withholding Tax - Q3",
    dueDate: "2023-10-31",
    status: "upcoming",
    type: "withholding",
    priority: "high",
  },
  { id: 3, name: "Sales Tax - July", dueDate: "2023-08-20", status: "completed", type: "sales", priority: "medium" },
  { id: 4, name: "Sales Tax - August", dueDate: "2023-09-20", status: "completed", type: "sales", priority: "medium" },
  {
    id: 5,
    name: "Sales Tax - September",
    dueDate: "2023-10-20",
    status: "upcoming",
    type: "sales",
    priority: "medium",
  },
  { id: 6, name: "Annual Tax Return", dueDate: "2024-04-30", status: "upcoming", type: "annual", priority: "low" },
]

// Sample data for jurisdictions
const jurisdictions = [
  {
    id: 1,
    name: "Federal",
    taxTypes: ["VAT", "Withholding"],
    complianceRate: 100,
    lastFiling: "2023-07-31",
    nextDue: "2023-10-31",
  },
  {
    id: 2,
    name: "State A",
    taxTypes: ["Sales Tax"],
    complianceRate: 100,
    lastFiling: "2023-09-20",
    nextDue: "2023-10-20",
  },
  {
    id: 3,
    name: "State B",
    taxTypes: ["Sales Tax"],
    complianceRate: 83,
    lastFiling: "2023-08-20",
    nextDue: "2023-10-20",
  },
  {
    id: 4,
    name: "City X",
    taxTypes: ["Local Tax"],
    complianceRate: 100,
    lastFiling: "2023-06-30",
    nextDue: "2023-12-31",
  },
]

// Sample data for documents
const documents = [
  { id: 1, name: "Tax Registration Certificate", issueDate: "2020-01-15", expiryDate: "2025-01-14", status: "valid" },
  { id: 2, name: "VAT Certificate", issueDate: "2020-01-15", expiryDate: "2025-01-14", status: "valid" },
  { id: 3, name: "Tax Clearance Certificate", issueDate: "2023-01-10", expiryDate: "2024-01-09", status: "valid" },
  {
    id: 4,
    name: "Withholding Tax Agent Certificate",
    issueDate: "2022-03-01",
    expiryDate: "2023-09-30",
    status: "expired",
  },
]

export function TaxCompliance() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <Progress value={98.7} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Last updated: Today at 09:30 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Filings</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-2">Next due: VAT Return - Oct 31, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jurisdictions</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-2">Federal, 2 States, 1 City</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Document Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Expired</div>
            <p className="text-xs text-muted-foreground mt-2">Withholding Tax Agent Certificate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Compliance Calendar</TabsTrigger>
          <TabsTrigger value="jurisdictions">Jurisdictions</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Compliance Calendar</CardTitle>
              <CardDescription>Upcoming and past tax filing deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filing Name</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceCalendar.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={cn(
                              item.priority === "high" && "bg-red-100 text-red-800",
                              item.priority === "medium" && "bg-yellow-100 text-yellow-800",
                              item.priority === "low" && "bg-green-100 text-green-800",
                            )}
                          >
                            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.status === "completed" ? (
                            <div className="flex items-center">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                              <span>Completed</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-orange-500 mr-2" />
                              <span>Upcoming</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Prepare
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jurisdictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Jurisdictions</CardTitle>
              <CardDescription>Manage tax compliance across different jurisdictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jurisdiction</TableHead>
                      <TableHead>Tax Types</TableHead>
                      <TableHead>Compliance Rate</TableHead>
                      <TableHead>Last Filing</TableHead>
                      <TableHead>Next Due</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jurisdictions.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.taxTypes.join(", ")}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={item.complianceRate} className="w-[60px]" />
                            <span>{item.complianceRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.lastFiling}</TableCell>
                        <TableCell>{item.nextDue}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
              <CardDescription>Manage tax certificates and official documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.issueDate}</TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                        <TableCell>
                          {item.status === "valid" ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Valid
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                              Expired
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
