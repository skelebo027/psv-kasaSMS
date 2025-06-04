"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1200 * 6,
  },
  {
    name: "Feb",
    total: 1900 * 6,
  },
  {
    name: "Mar",
    total: 2300 * 6,
  },
  {
    name: "Apr",
    total: 2800 * 6,
  },
  {
    name: "May",
    total: 3500 * 6,
  },
  {
    name: "Jun",
    total: 3200 * 6,
  },
  {
    name: "Jul",
    total: 2800 * 6,
  },
  {
    name: "Aug",
    total: 3000 * 6,
  },
  {
    name: "Sep",
    total: 3300 * 6,
  },
  {
    name: "Oct",
    total: 3580 * 6,
  },
  {
    name: "Nov",
    total: 3890 * 6,
  },
  {
    name: "Dec",
    total: 4200 * 6,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `GH₵ ${value}`}
        />
        <Bar dataKey="total" fill="#ff8c00" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
