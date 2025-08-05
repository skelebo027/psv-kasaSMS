"use client"

import { useState } from "react"

import { CardFooter } from "@/components/ui/card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Download, FileText, Filter, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

// Sample data for reports
const vatReportData = [
  {
    id: "VAT-2023-Q1",
    period: "Q1 2023",
    collected: 12500.0 * 6,
    paid: 2300.0 * 6,
    net: 10200.0 * 6,
    status: "Filed",
    dueDate: "2023-04-30",
    filingDate: "2023-04-15",
  },
  {
    id: "VAT-2023-Q2",
    period: "Q2 2023",
    collected: 14800.0 * 6,
    paid: 3100.0 * 6,
    net: 11700.0 * 6,
    status: "Filed",
    dueDate: "2023-07-31",
    filingDate: "2023-07-20",
  },
  {
    id: "VAT-2023-Q3",
    period: "Q3 2023",
    collected: 16200.0 * 6,
    paid: 3500.0 * 6,
    net: 12700.0 * 6,
    status: "Pending",
    dueDate: "2023-10-31",
    filingDate: null,
  },
]

const salesTaxReportData = [
  {
    id: "ST-2023-01",
    period: "Jan 2023",
    collected: 4200.0 * 6,
    exempt: 800.0 * 6,
    taxable: 3400.0 * 6,
    status: "Filed",
    dueDate: "2023-02-20",
    filingDate: "2023-02-15",
  },
  {
    id: "ST-2023-02",
    period: "Feb 2023",
    collected: 3800.0 * 6,
    exempt: 600.0 * 6,
    taxable: 3200.0 * 6,
    status: "Filed",
    dueDate: "2023-03-20",
    filingDate: "2023-03-18",
  },
  {
    id: "ST-2023-03",
    period: "Mar 2023",
    collected: 4500.0 * 6,
    exempt: 900.0 * 6,
    taxable: 3600.0 * 6,
    status: "Filed",
    dueDate: "2023-04-20",
    filingDate: "2023-04-15",
  },
  {
    id: "ST-2023-04",
    period: "Apr 2023",
    collected: 4300.0 * 6,
    exempt: 850.0 * 6,
    taxable: 3450.0 * 6,
    status: "Filed",
    dueDate: "2023-05-20",
    filingDate: "2023-05-18",
  },
  {
    id: "ST-2023-05",
    period: "May 2023",
    collected: 4700.0 * 6,
    exempt: 950.0 * 6,
    taxable: 3750.0 * 6,
    status: "Filed",
    dueDate: "2023-06-20",
    filingDate: "2023-06-15",
  },
  {
    id: "ST-2023-06",
    period: "Jun 2023",
    collected: 5100.0 * 6,
    exempt: 1050.0 * 6,
    taxable: 4050.0 * 6,
    status: "Pending",
    dueDate: "2023-07-20",
    filingDate: null,
  },
]

const withholdingTaxReportData = [
  {
    id: "WT-2023-Q1",
    period: "Q1 2023",
    withheld: 5600.0 * 6,
    remitted: 5600.0 * 6,
    status: "Filed",
    dueDate: "2023-04-30",
    filingDate: "2023-04-25",
  },
  {
    id: "WT-2023-Q2",
    period: "Q2 2023",
    withheld: 6200.0 * 6,
    remitted: 6200.0 * 6,
    status: "Filed",
    dueDate: "2023-07-31",
    filingDate: "2023-07-28",
  },
  {
    id: "WT-2023-Q3",
    period: "Q3 2023",
    withheld: 6800.0 * 6,
    remitted: 0.0,
    status: "Draft",
    dueDate: "2023-10-31",
    filingDate: null,
  },
]

export function TaxReports() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reportType, setReportType] = useState("vat")
  const { toast } = useToast()

  const taxReports: { date: string; period: string; type: string; amount: number; status: string }[] = []

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your tax report is being generated. It will be available shortly.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Tax Report</CardTitle>
          <CardDescription>Create detailed tax reports for specific periods.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select defaultValue="summary">
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-period">Reporting Period</Label>
              <Select defaultValue="monthly">
                <SelectTrigger id="report-period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Reports</CardTitle>
          <CardDescription>Generate and download tax reports for various periods.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">No reports generated yet.</p>
            <Button variant="outline" disabled>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
          <div className="text-center text-muted-foreground py-8">No tax reports to display.</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Tax Reports</CardTitle>
              <CardDescription>Generate and view tax reports for different periods and tax types.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vat">VAT Reports</SelectItem>
                  <SelectItem value="sales">Sales Tax Reports</SelectItem>
                  <SelectItem value="withholding">Withholding Tax</SelectItem>
                  <SelectItem value="annual">Annual Summary</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vat" value={reportType} onValueChange={setReportType} className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="vat">VAT Reports</TabsTrigger>
              <TabsTrigger value="sales">Sales Tax Reports</TabsTrigger>
              <TabsTrigger value="withholding">Withholding Tax</TabsTrigger>
              <TabsTrigger value="annual">Annual Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="vat" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">VAT Collected</TableHead>
                      <TableHead className="text-right">VAT Paid</TableHead>
                      <TableHead className="text-right">Net VAT</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vatReportData.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell className="text-right">GH₵{report.collected.toFixed(2)}</TableCell>
                        <TableCell className="text-right">GH₵{report.paid.toFixed(2)}</TableCell>
                        <TableCell className="text-right">GH₵{report.net.toFixed(2)}</TableCell>
                        <TableCell>{report.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === "Filed" ? "outline" : "secondary"}>{report.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">Tax Collected</TableHead>
                      <TableHead className="text-right">Exempt Sales</TableHead>
                      <TableHead className="text-right">Taxable Sales</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesTaxReportData.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell className="text-right">GH₵{report.collected.toFixed(2)}</TableCell>
                        <TableCell className="text-right">GH₵{report.exempt.toFixed(2)}</TableCell>
                        <TableCell className="text-right">GH₵{report.taxable.toFixed(2)}</TableCell>
                        <TableCell>{report.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === "Filed" ? "outline" : "secondary"}>{report.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="withholding" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">Tax Withheld</TableHead>
                      <TableHead className="text-right">Tax Remitted</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withholdingTaxReportData.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell className="text-right">GH₵{report.withheld.toFixed(2)}</TableCell>
                        <TableCell className="text-right">GH₵{report.remitted.toFixed(2)}</TableCell>
                        <TableCell>{report.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              report.status === "Filed"
                                ? "outline"
                                : report.status === "Draft"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="annual" className="space-y-4">
              <div className="flex items-center justify-center p-12">
                <div className="text-center space-y-4">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">Annual Tax Summary</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Generate a comprehensive annual tax summary report for the selected year. This report includes all
                    tax types and provides a consolidated view of your tax position.
                  </p>
                  <div className="flex justify-center gap-2 pt-4">
                    <Select defaultValue="2023">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
