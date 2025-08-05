"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { BarChart3 } from "lucide-react" // Import BarChart3 from lucide-react or wherever it is declared

interface RevenueChartProps {
  data: { name: string; total: number }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
        <div className="text-center">
          <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-medium mt-2">No revenue data available</p>
          <p className="text-xs">Revenue chart will appear here once data is available.</p>
        </div>
      </div>
    )
  }

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
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
