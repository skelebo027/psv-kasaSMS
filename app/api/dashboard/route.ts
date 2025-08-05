import { NextResponse } from "next/server"

export async function GET() {
  // Simulate a delay to mimic network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, you would fetch this data from a database
  // For now, we return empty data to reflect a "live" system with no initial data
  const dashboardData = {
    cards: {
      totalRevenue: 0,
      subscriptions: 0,
      sales: 0,
      activeNow: 0,
    },
    revenueChartData: [], // Empty array for no mock data
    recentSales: [], // Empty array for no mock data
  }

  return NextResponse.json(dashboardData)
}
