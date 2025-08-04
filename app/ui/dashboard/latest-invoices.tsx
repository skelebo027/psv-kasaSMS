import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const invoices = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "GH₵ 1,999.00",
    avatar: "/avatars/01.png",
    fallback: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "GH₵ 2,399.00",
    avatar: "/avatars/02.png",
    fallback: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "GH₵ 3,299.00",
    avatar: "/avatars/03.png",
    fallback: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "GH₵ 999.00",
    avatar: "/avatars/04.png",
    fallback: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "GH₵ 2,999.00",
    avatar: "/avatars/05.png",
    fallback: "SD",
  },
]

export default function LatestInvoices() {
  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
          <div className="space-y-8">
            {invoices.map((invoice, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={invoice.avatar || "/placeholder.svg"} alt="Avatar" />
                  <AvatarFallback>{invoice.fallback}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{invoice.name}</p>
                  <p className="text-sm text-muted-foreground">{invoice.email}</p>
                </div>
                <div className="ml-auto font-medium">+{invoice.amount}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px]">
            <div className="text-center text-muted-foreground">
              <p className="text-sm font-medium">No recent sales</p>
              <p className="text-xs">Sales data will appear here</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
