"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 15420,
  },
  {
    name: "Feb",
    total: 18230,
  },
  {
    name: "Mar",
    total: 22100,
  },
  {
    name: "Apr",
    total: 19800,
  },
  {
    name: "May",
    total: 25600,
  },
  {
    name: "Jun",
    total: 28900,
  },
  {
    name: "Jul",
    total: 31200,
  },
  {
    name: "Aug",
    total: 29800,
  },
  {
    name: "Sep",
    total: 33400,
  },
  {
    name: "Oct",
    total: 36700,
  },
  {
    name: "Nov",
    total: 38900,
  },
  {
    name: "Dec",
    total: 42100,
  },
]

export default function RevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue for the current year in Ghana Cedis</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `GH₵${value}`}
            />
            <Tooltip
              formatter={(value) => [`GH₵${value}`, "Revenue"]}
              labelStyle={{ color: "#000" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
