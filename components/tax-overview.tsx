"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

const taxData = [
  { month: "Jan", vat: 4200 * 6, salesTax: 2400 * 6, withholdingTax: 1800 * 6 },
  { month: "Feb", vat: 3800 * 6, salesTax: 2100 * 6, withholdingTax: 1600 * 6 },
  { month: "Mar", vat: 5000 * 6, salesTax: 2800 * 6, withholdingTax: 2200 * 6 },
  { month: "Apr", vat: 4800 * 6, salesTax: 2600 * 6, withholdingTax: 2000 * 6 },
  { month: "May", vat: 5200 * 6, salesTax: 3000 * 6, withholdingTax: 2400 * 6 },
  { month: "Jun", vat: 5800 * 6, salesTax: 3200 * 6, withholdingTax: 2600 * 6 },
]

const taxDistribution = [
  { name: "VAT", value: 28800 * 6, color: "#ff9800" },
  { name: "Sales Tax", value: 16100 * 6, color: "#ffb74d" },
  { name: "Withholding Tax", value: 12600 * 6, color: "#ffcc80" },
]

const COLORS = ["#ff9800", "#ffb74d", "#ffcc80"]

export function TaxOverview() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tax Collection Overview</CardTitle>
              <CardDescription>Monthly tax collection breakdown</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={taxData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vat" name="VAT" fill="#ff9800" />
                <Bar dataKey="salesTax" name="Sales Tax" fill="#ffb74d" />
                <Bar dataKey="withholdingTax" name="Withholding Tax" fill="#ffcc80" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Distribution</CardTitle>
          <CardDescription>Breakdown by tax type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taxDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
          <CardDescription>Current tax period summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium">Total Tax Collected</div>
              <div className="text-2xl font-bold mt-2">GH₵ 345,000.00</div>
              <div className="text-xs text-muted-foreground mt-1">+12.5% from last period</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium">Pending Tax Payments</div>
              <div className="text-2xl font-bold mt-2">GH₵ 74,100.00</div>
              <div className="text-xs text-muted-foreground mt-1">Due in 15 days</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm font-medium">Tax Compliance Rate</div>
              <div className="text-2xl font-bold mt-2">98.7%</div>
              <div className="text-xs text-muted-foreground mt-1">+2.3% from last period</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tax Filings</CardTitle>
          <CardDescription>Last 3 tax filings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Q1 2023 VAT</div>
                <div className="text-sm text-muted-foreground">Filed on Apr 15, 2023</div>
              </div>
              <div className="text-sm font-medium text-green-600">Completed</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Q4 2022 Sales Tax</div>
                <div className="text-sm text-muted-foreground">Filed on Jan 20, 2023</div>
              </div>
              <div className="text-sm font-medium text-green-600">Completed</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Annual Withholding</div>
                <div className="text-sm text-muted-foreground">Filed on Jan 31, 2023</div>
              </div>
              <div className="text-sm font-medium text-green-600">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
