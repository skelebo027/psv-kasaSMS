import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, DollarSign, Package, Users } from "lucide-react"

interface CardData {
  title: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
}

const cardData: CardData[] = [
  {
    title: "Total Revenue",
    value: "GH₵ 45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Messages Sent",
    value: "+2,350,000",
    change: "+180.1% from last month",
    icon: Package,
  },
  {
    title: "Active Users",
    value: "+12,234",
    change: "+19% from last month",
    icon: Users,
  },
  {
    title: "Active Campaigns",
    value: "+573",
    change: "+201 since last hour",
    icon: CreditCard,
  },
]

export default function CardWrapper() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
