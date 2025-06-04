"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for service performance
const responseTimeData = [
  { name: "Banking", avg: 120, min: 80, max: 250 },
  { name: "Survey", avg: 95, min: 60, max: 180 },
  { name: "Catalog", avg: 150, min: 100, max: 300 },
  { name: "Info", avg: 85, min: 50, max: 150 },
  { name: "Voting", avg: 110, min: 70, max: 200 },
]

const errorRateData = [
  { name: "Mon", rate: 2.3 },
  { name: "Tue", rate: 1.8 },
  { name: "Wed", rate: 3.2 },
  { name: "Thu", rate: 2.5 },
  { name: "Fri", rate: 1.9 },
  { name: "Sat", rate: 1.2 },
  { name: "Sun", rate: 1.5 },
]

const servicePerformanceData = [
  {
    id: 1,
    name: "Banking Service",
    uptime: "99.98%",
    avgResponseTime: "120ms",
    errorRate: "0.5%",
    status: "healthy",
  },
  {
    id: 2,
    name: "Customer Survey",
    uptime: "99.95%",
    avgResponseTime: "95ms",
    errorRate: "0.8%",
    status: "healthy",
  },
  {
    id: 3,
    name: "Product Catalog",
    uptime: "99.90%",
    avgResponseTime: "150ms",
    errorRate: "1.2%",
    status: "warning",
  },
  {
    id: 4,
    name: "Information Service",
    uptime: "99.99%",
    avgResponseTime: "85ms",
    errorRate: "0.3%",
    status: "healthy",
  },
  {
    id: 5,
    name: "Voting System",
    uptime: "99.92%",
    avgResponseTime: "110ms",
    errorRate: "0.9%",
    status: "healthy",
  },
]

export function USSDServicePerformance() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
            Healthy
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
            Warning
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Service Response Times</CardTitle>
          <CardDescription>Average, minimum, and maximum response times by service (in milliseconds)</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={responseTimeData}
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
              <Bar dataKey="min" fill="#82ca9d" name="Min Response Time (ms)" />
              <Bar dataKey="avg" fill="#8884d8" name="Avg Response Time (ms)" />
              <Bar dataKey="max" fill="#ff8042" name="Max Response Time (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Rate Trend</CardTitle>
          <CardDescription>Daily error rate percentage across all services</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={errorRateData}
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
              <Line type="monotone" dataKey="rate" stroke="#ff8042" name="Error Rate (%)" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
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
              {servicePerformanceData.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.uptime}</TableCell>
                  <TableCell>{service.avgResponseTime}</TableCell>
                  <TableCell>{service.errorRate}</TableCell>
                  <TableCell>{getStatusBadge(service.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
