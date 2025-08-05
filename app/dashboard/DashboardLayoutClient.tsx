"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Users,
  FileText,
  Phone,
  Mail,
  Palette,
  Percent,
  Globe,
  Briefcase,
  Shield,
  PlusCircle,
  Bell,
  User,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"
import { Suspense } from "react"
import { useUserRole } from "@/hooks/use-user-role"
import { Button } from "@/components/ui/button"

const userSidebarNavItems = [
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
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Campaigns",
    href: "/dashboard/campaigns",
    icon: <Briefcase className="mr-2 h-4 w-4" />,
  },
  {
    title: "Documentation",
    href: "/dashboard/documentation",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: <User className="mr-2 h-4 w-4" />,
  },
]

const adminSidebarNavItems = [
  {
    title: "Admin Dashboard",
    href: "/dashboard/admin",
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Gateways",
    href: "/dashboard/admin/gateways",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    title: "Billing",
    href: "/dashboard/admin/billing",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Tax Management",
    href: "/dashboard/admin/tax",
    icon: <Percent className="mr-2 h-4 w-4" />,
  },
  {
    title: "API Management",
    href: "/dashboard/admin/api",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Security",
    href: "/dashboard/admin/security",
    icon: <Shield className="mr-2 h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]

const resellerSidebarNavItems = [
  {
    title: "Reseller Dashboard",
    href: "/reseller",
    icon: <BarChart3 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Clients",
    href: "/reseller/clients",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Services",
    href: "/reseller/services",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    title: "Pricing",
    href: "/reseller/pricing",
    icon: <Percent className="mr-2 h-4 w-4" />,
  },
  {
    title: "Branding",
    href: "/reseller/branding",
    icon: <Palette className="mr-2 h-4 w-4" />,
  },
  {
    title: "Domain",
    href: "/reseller/domain",
    icon: <Globe className="mr-2 h-4 w-4" />,
  },
  {
    title: "Billing",
    href: "/reseller/billing",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/reseller/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const userRole = useUserRole() // This hook determines the role based on the path

  const getSidebarNavItems = (role: string) => {
    if (pathname.startsWith("/dashboard/admin")) {
      return adminSidebarNavItems
    }
    if (pathname.startsWith("/reseller")) {
      return resellerSidebarNavItems
    }
    return userSidebarNavItems
  }

  const currentNavItems = getSidebarNavItems(userRole)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          {/* Dynamic Brand/Logo based on role */}
          <div className="flex items-center gap-2 mr-4">
            {pathname.startsWith("/reseller") ? (
              <>
                <MessageSquare className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-bold text-purple-500">YourBrandSMS</span>
                <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                  Reseller Portal
                </div>
              </>
            ) : (
              <>
                <MessageSquare className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold text-orange-500">KasaSMS</span>
              </>
            )}
          </div>

          {/* Main Navigation (e.g., top-level links) */}
          <MainNav className="mx-6" />

          <div className="ml-auto flex items-center space-x-4">
            {pathname.startsWith("/reseller") && (
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Credits
              </Button>
            )}
            <Bell className="h-5 w-5 cursor-pointer" />
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
            {currentNavItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <span
                  className={`group flex items-center rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground ${
                    pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                      ? "bg-accent"
                      : ""
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
