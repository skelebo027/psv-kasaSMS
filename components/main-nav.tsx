"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Overview
      </Link>
      <Link
        href="/dashboard/campaigns"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/campaigns" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Campaigns
      </Link>
      <Link
        href="/dashboard/contacts"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/contacts" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Contacts
      </Link>
      <Link
        href="/dashboard/api"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/api" ? "text-primary" : "text-muted-foreground",
        )}
      >
        API
      </Link>
      <Link
        href="/dashboard/billing"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/billing" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Billing
      </Link>
    </nav>
  )
}
