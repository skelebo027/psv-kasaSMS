import type React from "react"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requireAuth={true}>
      <div className="flex min-h-screen">
        {/* Your existing dashboard layout content */}
        {children}
      </div>
    </AuthGuard>
  )
}
