"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Edit, Copy, Trash2, Play, BarChart3, CheckCircle2, Clock, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample data for USSD services
const ussdServices = [
  {
    id: "ussd-1",
    name: "Banking Service",
    shortcode: "*123#",
    status: "active",
    description: "USSD banking service with account balance, transfers, and bill payments",
    sessions: 5432,
    createdAt: "2023-10-15",
    lastModified: "2024-05-01",
  },
  {
    id: "ussd-2",
    name: "Customer Survey",
    shortcode: "*456#",
    status: "active",
    description: "Customer satisfaction survey with multiple-choice questions",
    sessions: 3211,
    createdAt: "2023-11-22",
    lastModified: "2024-04-15",
  },
  {
    id: "ussd-3",
    name: "Product Catalog",
    shortcode: "*789#",
    status: "active",
    description: "Browse and order products through USSD menu",
    sessions: 2876,
    createdAt: "2024-01-05",
    lastModified: "2024-04-28",
  },
  {
    id: "ussd-4",
    name: "Information Service",
    shortcode: "*321#",
    status: "active",
    description: "General information and FAQ service",
    sessions: 1543,
    createdAt: "2024-02-18",
    lastModified: "2024-05-10",
  },
  {
    id: "ussd-5",
    name: "Voting System",
    shortcode: "*555#",
    status: "active",
    description: "Voting system for contests and polls",
    sessions: 987,
    createdAt: "2024-03-30",
    lastModified: "2024-05-05",
  },
  {
    id: "ussd-6",
    name: "Loyalty Program",
    shortcode: "*777#",
    status: "draft",
    description: "Customer loyalty program with points and rewards",
    sessions: 0,
    createdAt: "2024-05-12",
    lastModified: "2024-05-12",
  },
]

export function USSDServicesList() {
  const [services, setServices] = useState(ussdServices)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "draft":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <span className="font-mono">{service.shortcode}</span>
                  {getStatusBadge(service.status)}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/ussd/create?id=${service.id}`} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Service
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Play className="mr-2 h-4 w-4" />
                    Test Service
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/ussd/analytics?id=${service.id}`} className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Service
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">{service.description}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium">Sessions</div>
                <div className="text-muted-foreground">{service.sessions.toLocaleString()}</div>
              </div>
              <div>
                <div className="font-medium">Created</div>
                <div className="text-muted-foreground">{new Date(service.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="font-medium">Last Modified</div>
                <div className="text-muted-foreground">{new Date(service.lastModified).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center justify-end md:justify-start">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/ussd/create?id=${service.id}`}>Manage Service</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
