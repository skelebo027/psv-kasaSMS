"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  CreditCard,
  Globe,
  MessageSquare,
  Palette,
  Percent,
  Settings,
  Users,
  Phone,
  Mail,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/user-nav"
import { ResellerNav } from "@/components/reseller-nav"

export default function ServicesPage() {
  const [services, setServices] = useState({
    sms: { enabled: true, markup: 30, minPrice: 0.03 },
    voice: { enabled: true, markup: 25, minPrice: 0.6 },
    email: { enabled: true, markup: 35, minPrice: 0.12 },
    whatsapp: { enabled: false, markup: 40, minPrice: 0.5 },
    ussd: { enabled: false, markup: 30, minPrice: 0.15 },
  })

  const handleServiceToggle = (service: string, enabled: boolean) => {
    setServices((prev) => ({
      ...prev,
      [service]: { ...prev[service as keyof typeof prev], enabled },
    }))
  }

  const handleMarkupChange = (service: string, markup: number) => {
    setServices((prev) => ({
      ...prev,
      [service]: { ...prev[service as keyof typeof prev], markup },
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 mr-4">
            <MessageSquare className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold text-purple-500">YourBrandSMS</span>
            <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Reseller Portal</div>
          </div>
          <ResellerNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="h-5 w-5 cursor-pointer" />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Link href="/reseller">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/reseller/clients">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-5 w-5" />
                Clients
              </Button>
            </Link>
            <Link href="/reseller/services">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
                <MessageSquare className="h-5 w-5" />
                Services
              </Button>
            </Link>
            <Link href="/reseller/pricing">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Percent className="h-5 w-5" />
                Pricing
              </Button>
            </Link>
            <Link href="/reseller/branding">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Palette className="h-5 w-5" />
                Branding
              </Button>
            </Link>
            <Link href="/reseller/domain">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Globe className="h-5 w-5" />
                Domain
              </Button>
            </Link>
            <Link href="/reseller/billing">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <CreditCard className="h-5 w-5" />
                Billing
              </Button>
            </Link>
            <Link href="/reseller/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Service Management</h1>
            <Button className="bg-purple-500 hover:bg-purple-600">Save Changes</Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  SMS Service
                </CardTitle>
                <CardDescription>Bulk SMS messaging service for your clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable SMS Service</Label>
                    <p className="text-sm text-muted-foreground">Allow clients to send SMS messages</p>
                  </div>
                  <Switch
                    checked={services.sms.enabled}
                    onCheckedChange={(checked) => handleServiceToggle("sms", checked)}
                  />
                </div>
                {services.sms.enabled && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="sms-markup">Markup Percentage (%)</Label>
                      <Input
                        id="sms-markup"
                        type="number"
                        value={services.sms.markup}
                        onChange={(e) => handleMarkupChange("sms", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-min-price">Minimum Price (GH₵)</Label>
                      <Input id="sms-min-price" type="number" step="0.01" value={services.sms.minPrice} disabled />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-500" />
                  Voice Service
                </CardTitle>
                <CardDescription>Voice messaging and call services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Voice Service</Label>
                    <p className="text-sm text-muted-foreground">Allow clients to send voice messages</p>
                  </div>
                  <Switch
                    checked={services.voice.enabled}
                    onCheckedChange={(checked) => handleServiceToggle("voice", checked)}
                  />
                </div>
                {services.voice.enabled && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="voice-markup">Markup Percentage (%)</Label>
                      <Input
                        id="voice-markup"
                        type="number"
                        value={services.voice.markup}
                        onChange={(e) => handleMarkupChange("voice", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voice-min-price">Minimum Price (GH₵)</Label>
                      <Input id="voice-min-price" type="number" step="0.01" value={services.voice.minPrice} disabled />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-500" />
                  Email Service
                </CardTitle>
                <CardDescription>Email marketing and transactional emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Email Service</Label>
                    <p className="text-sm text-muted-foreground">Allow clients to send email campaigns</p>
                  </div>
                  <Switch
                    checked={services.email.enabled}
                    onCheckedChange={(checked) => handleServiceToggle("email", checked)}
                  />
                </div>
                {services.email.enabled && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="email-markup">Markup Percentage (%)</Label>
                      <Input
                        id="email-markup"
                        type="number"
                        value={services.email.markup}
                        onChange={(e) => handleMarkupChange("email", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-min-price">Minimum Price (GH₵)</Label>
                      <Input id="email-min-price" type="number" step="0.01" value={services.email.minPrice} disabled />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                  WhatsApp Service
                </CardTitle>
                <CardDescription>WhatsApp Business API messaging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable WhatsApp Service</Label>
                    <p className="text-sm text-muted-foreground">Allow clients to send WhatsApp messages</p>
                  </div>
                  <Switch
                    checked={services.whatsapp.enabled}
                    onCheckedChange={(checked) => handleServiceToggle("whatsapp", checked)}
                  />
                </div>
                {services.whatsapp.enabled && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-markup">Markup Percentage (%)</Label>
                      <Input
                        id="whatsapp-markup"
                        type="number"
                        value={services.whatsapp.markup}
                        onChange={(e) => handleMarkupChange("whatsapp", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-min-price">Minimum Price (GH₵)</Label>
                      <Input
                        id="whatsapp-min-price"
                        type="number"
                        step="0.01"
                        value={services.whatsapp.minPrice}
                        disabled
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                    className="text-purple-500"
                  >
                    <path d="M3.5 5.5 7 3.5l3.5 2 3.5-2 3.5 2v12.5l-3.5 2-3.5-2-3.5 2-3.5-2z" />
                    <path d="M7 3.5v12.5" />
                    <path d="M14 5.5v12.5" />
                  </svg>
                  USSD Service
                </CardTitle>
                <CardDescription>Interactive USSD applications and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable USSD Service</Label>
                    <p className="text-sm text-muted-foreground">Allow clients to create USSD applications</p>
                  </div>
                  <Switch
                    checked={services.ussd.enabled}
                    onCheckedChange={(checked) => handleServiceToggle("ussd", checked)}
                  />
                </div>
                {services.ussd.enabled && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="ussd-markup">Markup Percentage (%)</Label>
                      <Input
                        id="ussd-markup"
                        type="number"
                        value={services.ussd.markup}
                        onChange={(e) => handleMarkupChange("ussd", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ussd-min-price">Minimum Price (GH₵)</Label>
                      <Input id="ussd-min-price" type="number" step="0.01" value={services.ussd.minPrice} disabled />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Summary</CardTitle>
              <CardDescription>Overview of your enabled services and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(services).map(([key, service]) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {service.enabled ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium capitalize">{key} Service</p>
                        <p className="text-sm text-muted-foreground">
                          {service.enabled ? `${service.markup}% markup` : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {service.enabled ? `GH₵ ${(service.minPrice * (1 + service.markup / 100)).toFixed(2)}` : "-"}
                      </p>
                      <p className="text-sm text-muted-foreground">Client price</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
