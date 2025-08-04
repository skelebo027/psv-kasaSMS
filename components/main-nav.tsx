import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/dashboard/sms"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        SMS
      </Link>
      <Link
        href="/dashboard/ussd"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        USSD
      </Link>
      <Link
        href="/dashboard/voice"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Voice
      </Link>
      <Link
        href="/dashboard/whatsapp"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        WhatsApp
      </Link>
      <Link
        href="/dashboard/contacts"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Contacts
      </Link>
    </nav>
  )
}
