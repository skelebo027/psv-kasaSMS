import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ResellerNavProps extends React.HTMLAttributes<HTMLElement> {}

export function ResellerNav({ className, ...props }: ResellerNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/reseller" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/reseller/clients"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Clients
      </Link>
      <Link
        href="/reseller/services"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Services
      </Link>
      <Link
        href="/reseller/pricing"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Pricing
      </Link>
      <Link
        href="/reseller/branding"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Branding
      </Link>
    </nav>
  )
}
