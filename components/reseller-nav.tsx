"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function ResellerNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/reseller"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reseller" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/reseller/clients"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reseller/clients" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Clients
      </Link>
      <Link
        href="/reseller/services"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reseller/services" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Services
      </Link>
      <Link
        href="/reseller/branding"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reseller/branding" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Branding
      </Link>
      <Link
        href="/reseller/billing"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reseller/billing" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Billing
      </Link>
    </nav>
  )
}
