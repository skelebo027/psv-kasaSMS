"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data for USSD statistics
const sessionData = [
  {
    name: "Jan",
    sessions: 2500,
    completions: 1800,
  },
  {
    name: "Feb",
    sessions: 3000,
    completions: 2200,
  },
  {
    name: "Mar",
    sessions: 2800,
    completions: 2000,
  },
  {
    name: "Apr",
    sessions: 3300,
    completions: 2400,
  },
  {
    name: "May",
    sessions: 3900,
    completions: 2900,
  },
  {
    name: "Jun",
    sessions: 3600,
    completions: 2700,
  },
]

const serviceUsageData = [
  {
    name: "Banking",
    usage: 5432,
  },
  {
    name: "Survey",
    usage: 3211,
  },
  {
    name: "Catalog",
    usage: 2876,
  },
  {
    name: "Info",
    usage: 1543,
  },
  {
    name: "Voting",
    usage: 987,
  },
]

export function USSDStatistics() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Monthly Sessions & Completions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sessionData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line type="monotone" dataKey="sessions" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="completions" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Service Usage</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={serviceUsageData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar dataKey="usage" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
