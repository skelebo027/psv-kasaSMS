"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for user behavior
const userRetentionData = [
  { name: "1st Time", value: 4500 },
  { name: "2-5 Times", value: 3200 },
  { name: "6-10 Times", value: 1800 },
  { name: "11-20 Times", value: 950 },
  { name: "20+ Times", value: 450 },
]

const sessionDurationData = [
  { name: "<30s", count: 3500 },
  { name: "30-60s", count: 4200 },
  { name: "60-90s", count: 2800 },
  { name: "90-120s", count: 1200 },
  { name: ">120s", count: 500 },
]

const popularMenusData = [
  { id: 1, menu: "Check Balance", views: 4532, completionRate: "92%", avgTime: "35s" },
  { id: 2, menu: "Transfer Money", views: 3654, completionRate: "85%", avgTime: "65s" },
  { id: 3, menu: "Pay Bills", views: 2876, completionRate: "78%", avgTime: "55s" },
  { id: 4, menu: "Account Info", views: 1987, completionRate: "94%", avgTime: "28s" },
  { id: 5, menu: "Mini Statement", views: 1654, completionRate: "88%", avgTime: "42s" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

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
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRetentionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userRetentionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Duration</CardTitle>
            <CardDescription>Distribution of sessions by duration</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sessionDurationData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Number of Sessions" />
              </BarChart>
            </ResponsiveContainer>
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
              {popularMenusData.map((menu) => (
                <TableRow key={menu.id}>
                  <TableCell className="font-medium">{menu.menu}</TableCell>
                  <TableCell>{menu.views.toLocaleString()}</TableCell>
                  <TableCell>{menu.completionRate}</TableCell>
                  <TableCell>{menu.avgTime}</TableCell>
                </TableRow>
              ))}
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
            <p>Journey visualization would appear here</p>
            <p className="text-sm">Shows common paths and drop-off points</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
