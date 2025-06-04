"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Clock, Eye, FileImage, Search } from "lucide-react"

export function WhatsAppHistory() {
  const [date, setDate] = useState<Date>()

  const messages = [
    {
      id: "msg1",
      recipient: "+1234567890",
      type: "text",
      status: "delivered",
      timestamp: "2025-05-15T10:30:00",
      content: "Hello John, welcome to KasaSMS! We're excited to have you on board.",
    },
    {
      id: "msg2",
      recipient: "+2345678901",
      type: "template",
      template: "order_confirmation",
      status: "read",
      timestamp: "2025-05-15T09:45:00",
      content: "Hi Sarah, your order #12345 has been confirmed and is being processed.",
    },
    {
      id: "msg3",
      recipient: "+3456789012",
      type: "image",
      status: "delivered",
      timestamp: "2025-05-14T16:20:00",
      content: "Product catalog image with caption: Check out our new products!",
    },
    {
      id: "msg4",
      recipient: "+4567890123",
      type: "template",
      template: "payment_reminder",
      status: "failed",
      timestamp: "2025-05-14T14:15:00",
      content: "Hello Michael, this is a friendly reminder that your payment is due.",
    },
    {
      id: "msg5",
      recipient: "+5678901234",
      type: "text",
      status: "sent",
      timestamp: "2025-05-14T11:05:00",
      content: "Thank you for your recent purchase. We hope you enjoy our service!",
    },
    {
      id: "msg6",
      recipient: "+6789012345",
      type: "document",
      status: "delivered",
      timestamp: "2025-05-13T17:30:00",
      content: "Invoice #INV-2025-0512 with caption: Your invoice for May 2025",
    },
    {
      id: "msg7",
      recipient: "+7890123456",
      type: "template",
      template: "appointment",
      status: "delivered",
      timestamp: "2025-05-13T13:45:00",
      content: "Hi Emma, this is a reminder of your appointment scheduled for tomorrow.",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
            Delivered
          </Badge>
        )
      case "read":
        return <Badge className="bg-green-500 hover:bg-green-600">Read</Badge>
      case "sent":
        return <Badge variant="secondary">Sent</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-4 w-4 text-blue-500" />
      case "template":
        return <Check className="h-4 w-4 text-green-500" />
      case "document":
        return <FileImage className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message History</CardTitle>
        <CardDescription>View and analyze your WhatsApp message history.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2 flex-1">
              <Input placeholder="Search messages..." className="flex-1" />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.recipient}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(message.type)}
                        <span className="capitalize">{message.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{message.content}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span>{new Date(message.timestamp).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Message Details</DialogTitle>
                            <DialogDescription>Detailed information about this message.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="font-medium">Message ID</div>
                              <div className="col-span-2">{message.id}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="font-medium">Recipient</div>
                              <div className="col-span-2">{message.recipient}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="font-medium">Type</div>
                              <div className="col-span-2 capitalize">{message.type}</div>
                            </div>
                            {message.template && (
                              <div className="grid grid-cols-3 gap-4">
                                <div className="font-medium">Template</div>
                                <div className="col-span-2">{message.template}</div>
                              </div>
                            )}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="font-medium">Status</div>
                              <div className="col-span-2">{getStatusBadge(message.status)}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="font-medium">Sent At</div>
                              <div className="col-span-2">{new Date(message.timestamp).toLocaleString()}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="font-medium">Content</div>
                              <div className="col-span-2">{message.content}</div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-7</strong> of <strong>42</strong> messages
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
