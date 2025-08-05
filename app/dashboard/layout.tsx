import type React from "react"
import type { Metadata } from "next"
import DashboardLayoutClient from "./DashboardLayoutClient"

export const metadata: Metadata = {
  title: "Dashboard | KasaSMS",
  description: "Example dashboard for the KasaSMS platform.",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayoutClient children={children} />
}
