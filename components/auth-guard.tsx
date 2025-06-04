"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("kasasms_token")
      const user = localStorage.getItem("kasasms_user")

      const authenticated = !!(token && user)
      setIsAuthenticated(authenticated)
      setIsLoading(false)

      if (requireAuth && !authenticated) {
        router.push("/login")
      } else if (!requireAuth && authenticated) {
        router.push("/dashboard")
      }
    }

    checkAuth()
  }, [router, requireAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="h-12 w-12 text-orange-500 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-orange-500 mb-2">KasaSMS</h1>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null // Will redirect to login
  }

  if (!requireAuth && isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return <>{children}</>
}
