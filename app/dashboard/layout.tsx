import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, BarChart3, Settings, CreditCard, Users, FileText, Phone, Mail } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"
import { Suspense } from "react"

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
          <MainNav className="mx-6" />
          <div className="flex items-center gap-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
            <UserNav />
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
