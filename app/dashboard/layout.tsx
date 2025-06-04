import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, BarChart3, Settings, CreditCard, Users, FileText, Phone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "Dashboard | KasaSMS",
  description: "Example dashboard for the KasaSMS platform.",
}

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
  {
    title: "SMS",
    href: "/dashboard/sms",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    title: "Voice SMS",
    href: "/dashboard/voice",
    icon: <Phone className="mr-2 h-4 w-4" />,
  },
  {
    title: "Email",
    href: "/dashboard/email",
    icon: <Mail className="mr-2 h-4 w-4" />,
  },
  {
    title: "WhatsApp",
    href: "/dashboard/whatsapp",
    icon: <MessageSquare className="mr-2 h-4 w-4 text-green-500" />,
  },
  {
    title: "USSD",
    href: "/dashboard/ussd",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "API",
    href: "/dashboard/api",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Admin",
    href: "/dashboard/admin",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
  {
    title: "Reseller Portal",
    href: "/reseller",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">KasaSMS</span>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <span className="sr-only">Open user menu</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    JD
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <nav className="grid items-start px-2 py-4 text-sm">
            {sidebarNavItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <span
                  className={`group flex items-center rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground ${
                    item.href === "/dashboard/whatsapp" ? "bg-accent" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}
