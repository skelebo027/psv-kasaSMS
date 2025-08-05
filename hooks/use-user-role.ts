"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export type UserRole = "user" | "admin" | "reseller" | "unknown"

export function useUserRole(): UserRole {
  const pathname = usePathname()
  const [role, setRole] = useState<UserRole>("unknown")

  useEffect(() => {
    // This is a simplified role determination based on path.
    // In a real application, this would come from authenticated user data.
    if (pathname.startsWith("/dashboard/admin")) {
      setRole("admin")
    } else if (pathname.startsWith("/reseller")) {
      setRole("reseller")
    } else if (pathname.startsWith("/dashboard")) {
      setRole("user")
    } else {
      setRole("unknown")
    }
  }, [pathname])

  return role
}
