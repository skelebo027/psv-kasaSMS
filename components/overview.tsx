"use client"

const emptyData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
]

export function Overview() {
  return (
    <div className="h-[350px] flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <p className="text-lg font-medium">No data available</p>
        <p className="text-sm">Start sending messages to see analytics</p>
      </div>
    </div>
  )
}
