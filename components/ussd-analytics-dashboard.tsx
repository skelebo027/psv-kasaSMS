"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for analytics
const sessionData = [
  { name: "Mon", sessions: 1200, completions: 980 },
  { name: "Tue", sessions: 1400, completions: 1100 },
  { name: "Wed", sessions: 1800, completions: 1400 },
  { name: "Thu", sessions: 2000, completions: 1600 },
  { name: "Fri", sessions: 2400, completions: 1900 },
  { name: "Sat", sessions: 1800, completions: 1500 },
  { name: "Sun", sessions: 1200, completions: 950 },
]

const serviceUsageData = [
  { name: "Banking", value: 5432 },
  { name: "Survey", value: 3211 },
  { name: "Catalog", value: 2876 },
  { name: "Info", value: 1543 },
  { name: "Voting", value: 987 },
]

const menuNavigationData = [
  { name: "Main Menu", views: 12234, exits: 1245 },
  { name: "Balance", views: 4532, exits: 320 },
  { name: "Transfer", views: 3654, exits: 450 },
  { name: "Bills", views: 2876, exits: 380 },
  { name: "Account", views: 1987, exits: 210 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function USSDAnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Session Activity</CardTitle>
          <CardDescription>Daily sessions and completion rates</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sessionData}
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
              <Line type="monotone" dataKey="sessions" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="completions" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Service Usage</CardTitle>
          <CardDescription>Distribution of sessions by service</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceUsageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="md:col-span-4 lg:col-span-7">
        <CardHeader>
          <CardTitle>Menu Navigation Analysis</CardTitle>
          <CardDescription>Views and exit rates for each menu</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={menuNavigationData}
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
              <Bar dataKey="views" fill="#8884d8" name="Views" />
              <Bar dataKey="exits" fill="#ff8042" name="Exits" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
