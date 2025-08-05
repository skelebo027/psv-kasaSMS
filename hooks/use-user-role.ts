"use client"

import { usePathname } from "next/navigation"

export function useUserRole(): "user" | "admin" | "reseller" {
  const pathname = usePathname()

  if (pathname.startsWith("/dashboard/admin")) {
    return "admin"
  }
  if (pathname.startsWith("/reseller")) {
    return "reseller"
  }
  return "user" // Default role
}
