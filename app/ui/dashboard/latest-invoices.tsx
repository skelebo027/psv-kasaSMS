import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { FileText } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  name: string
  email: string
  image_url: string
}

export function LatestInvoices({ invoices }: { invoices: Invoice[] }) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
        <div className="text-center">
          <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-medium mt-2">No recent invoices</p>
          <p className="text-xs">New invoices will appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <img
                  alt={`${invoice.name}'s profile picture`}
                  className="rounded-full"
                  height="32"
                  src={invoice.image_url || "/placeholder-user.jpg"}
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <div>{invoice.name}</div>
              </div>
            </TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
