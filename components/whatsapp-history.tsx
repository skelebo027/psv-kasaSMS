"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface WhatsAppMessage {
  id: string
  recipient: string
  message: string
  status: "sent" | "delivered" | "read" | "failed"
  timestamp: string
  type: "text" | "template" | "media"
}

export function WhatsAppHistory() {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        )
      case "read":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Read
          </Badge>
        )
      case "sent":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Sent
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const exportHistory = () => {
    // Simulate export functionality
    alert("Message history exported successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message History</CardTitle>
        <CardDescription>View a log of all sent and received WhatsApp messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-48 border border-dashed rounded-lg text-muted-foreground">
          <p>No message history available.</p>
          <p>Messages will appear here once sent or received.</p>
        </div>
        {/*
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              // No mock data, so this will be empty
            }
          </TableBody>
        </Table>
        */}
      </CardContent>
    </Card>
  )
}
