"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Phone, Mail, Globe, Settings, DollarSign, TrendingUp, Users } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  type: "sms" | "whatsapp" | "voice" | "email" | "ussd"
  enabled: boolean
  basePrice: number
  markup: number
  finalPrice: number
  volume: number
  used: number
  unit: string
}

export default function ResellerServicesClientPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: "sms",
      name: "SMS Messaging",
      description: "Enable and configure SMS messaging for your clients.",
      type: "sms",
      enabled: true,
      basePrice: 0.05,
      markup: 20,
      finalPrice: 0.06,
      volume: 10000,
      used: 0,
      unit: "messages",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Messaging",
      description: "Enable and configure WhatsApp messaging for your clients.",
      type: "whatsapp",
      enabled: false,
      basePrice: 0.08,
      markup: 25,
      finalPrice: 0.1,
      volume: 5000,
      used: 0,
      unit: "conversations",
    },
    {
      id: "voice",
      name: "Voice Calls",
      description: "Enable and configure voice call services for your clients.",
      type: "voice",
      enabled: false,
      basePrice: 0.12,
      markup: 30,
      finalPrice: 0.16,
      volume: 1000,
      used: 0,
      unit: "minutes",
    },
    {
      id: "ussd",
      name: "USSD Services",
      description: "Enable and configure USSD services for your clients.",
      type: "ussd",
      enabled: false,
      basePrice: 0.01,
      markup: 40,
      finalPrice: 0.014,
      volume: 2000,
      used: 0,
      unit: "sessions",
    },
  ])

  const toggleService = (serviceId: string) => {
    setServices(
      services.map((service) => (service.id === serviceId ? { ...service, enabled: !service.enabled } : service)),
    )
  }

  const updateMarkup = (serviceId: string, markup: number) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              markup,
              finalPrice: service.basePrice * (1 + markup / 100),
            }
          : service,
      ),
    )
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "sms":
        return <MessageSquare className="h-5 w-5" />
      case "whatsapp":
        return <MessageSquare className="h-5 w-5 text-green-600" />
      case "voice":
        return <Phone className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      case "ussd":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <path d="M3.5 5.5 7 3.5l3.5 2 3.5-2 3.5 2v12.5l-3.5 2-3.5-2-3.5 2-3.5-2z" />
            <path d="M7 3.5v12.5" />
            <path d="M14 5.5v12.5" />
          </svg>
        )
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  const totalRevenue = services.reduce(
    (sum, service) => sum + (service.enabled ? service.volume * (service.finalPrice - service.basePrice) : 0),
    0,
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Service Management</h1>
        <p className="text-muted-foreground">Manage the communication services you offer to your clients.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.filter((s) => s.enabled).length}</div>
            <p className="text-xs text-muted-foreground">of {services.length} total services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From markup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.reduce((sum, s) => sum + s.volume, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Messages sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Markup</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {services.length > 0
                ? `${Math.round(services.reduce((sum, s) => sum + s.markup, 0) / services.length)}%`
                : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">Across all services</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Strategy</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Configuration</CardTitle>
              <CardDescription>Enable/disable services and configure pricing for your clients</CardDescription>
            </CardHeader>
            <CardContent>
              {services.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No services configured</h3>
                  <p className="text-gray-500">Services will appear here once they are available.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Markup %</TableHead>
                      <TableHead>Client Price</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getServiceIcon(service.type)}
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Switch checked={service.enabled} onCheckedChange={() => toggleService(service.id)} />
                        </TableCell>
                        <TableCell>GH₵ {service.basePrice.toFixed(3)}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={service.markup}
                            onChange={(e) => updateMarkup(service.id, Number(e.target.value))}
                            className="w-20"
                            min="0"
                            max="100"
                          />
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">GH₵ {service.finalPrice.toFixed(3)}</Badge>
                        </TableCell>
                        <TableCell>{service.volume.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">
                            GH₵ {(service.volume * (service.finalPrice - service.basePrice)).toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Strategy</CardTitle>
                <CardDescription>Configure your markup strategy for different service tiers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Markup Percentage</Label>
                  <Input type="number" placeholder="25" />
                  <p className="text-sm text-muted-foreground">Applied to new services automatically</p>
                </div>
                <div className="space-y-2">
                  <Label>Volume Discount Threshold</Label>
                  <Input type="number" placeholder="10000" />
                  <p className="text-sm text-muted-foreground">Messages per month for volume pricing</p>
                </div>
                <div className="space-y-2">
                  <Label>Volume Discount Rate</Label>
                  <Input type="number" placeholder="5" />
                  <p className="text-sm text-muted-foreground">Percentage discount for high-volume clients</p>
                </div>
                <Button className="w-full">Save Pricing Strategy</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>Compare your pricing with market rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">SMS Market Average</span>
                      <p className="text-sm text-muted-foreground">Industry standard</p>
                    </div>
                    <Badge>GH₵ 0.065</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">Your SMS Price</span>
                      <p className="text-sm text-muted-foreground">Current rate</p>
                    </div>
                    <Badge variant="secondary">GH₵ 0.060</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <div>
                      <span className="font-medium">Competitive Advantage</span>
                      <p className="text-sm text-muted-foreground">Below market rate</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">-7.7%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Analytics</CardTitle>
              <CardDescription>Performance metrics for your reseller services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-500">Detailed analytics and reporting features will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
