"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  Check,
  CreditCard,
  Globe,
  MessageSquare,
  Palette,
  Percent,
  Plus,
  Settings,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { UserNav } from "@/components/user-nav"
import { ResellerNav } from "@/components/reseller-nav"

export default function PricingPage() {
  const [showAdvanced, setShowAdvanced] = useState(false)

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
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageSquare className="h-5 w-5" />
                Services
              </Button>
            </Link>
            <Link href="/reseller/pricing">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
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
            <h1 className="text-2xl font-bold">Pricing Management</h1>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="mr-2 h-4 w-4" /> Add New Plan
            </Button>
          </div>
          <Tabs defaultValue="plans" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
              <TabsTrigger value="services">Service Pricing</TabsTrigger>
              <TabsTrigger value="discounts">Discounts & Promotions</TabsTrigger>
            </TabsList>
            <TabsContent value="plans" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Pricing Plans</CardTitle>
                  <CardDescription>Manage the pricing plans you offer to your clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="show-advanced" className="text-sm">
                        Show Advanced Options
                      </Label>
                      <Switch id="show-advanced" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                    </div>
                    <Button variant="outline" size="sm">
                      Bulk Edit
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Starter Plan</CardTitle>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <CardDescription>For small businesses and startups</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="starter-price">Monthly Price ($)</Label>
                          <Input id="starter-price" type="number" defaultValue="49" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="starter-sms">SMS Credits</Label>
                          <Input id="starter-sms" type="number" defaultValue="1000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="starter-voice">Voice Minutes</Label>
                          <Input id="starter-voice" type="number" defaultValue="500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="starter-email">Email Credits</Label>
                          <Input id="starter-email" type="number" defaultValue="1000" />
                        </div>
                        {showAdvanced && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="starter-whatsapp">WhatsApp Messages</Label>
                              <Input id="starter-whatsapp" type="number" defaultValue="200" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="starter-ussd">USSD Sessions</Label>
                              <Input id="starter-ussd" type="number" defaultValue="100" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="starter-api">API Access</Label>
                              <div className="flex items-center gap-2">
                                <Switch id="starter-api" defaultChecked />
                                <span className="text-sm">Enabled</span>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Changes</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Business Plan</CardTitle>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <CardDescription>For growing businesses and teams</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="business-price">Monthly Price ($)</Label>
                          <Input id="business-price" type="number" defaultValue="149" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business-sms">SMS Credits</Label>
                          <Input id="business-sms" type="number" defaultValue="5000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business-voice">Voice Minutes</Label>
                          <Input id="business-voice" type="number" defaultValue="2000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business-email">Email Credits</Label>
                          <Input id="business-email" type="number" defaultValue="10000" />
                        </div>
                        {showAdvanced && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="business-whatsapp">WhatsApp Messages</Label>
                              <Input id="business-whatsapp" type="number" defaultValue="1000" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="business-ussd">USSD Sessions</Label>
                              <Input id="business-ussd" type="number" defaultValue="500" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="business-api">API Access</Label>
                              <div className="flex items-center gap-2">
                                <Switch id="business-api" defaultChecked />
                                <span className="text-sm">Enabled</span>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Changes</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Enterprise Plan</CardTitle>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <CardDescription>For large organizations</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="enterprise-price">Monthly Price ($)</Label>
                          <Input id="enterprise-price" type="number" defaultValue="499" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="enterprise-sms">SMS Credits</Label>
                          <Input id="enterprise-sms" type="number" defaultValue="20000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="enterprise-voice">Voice Minutes</Label>
                          <Input id="enterprise-voice" type="number" defaultValue="10000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="enterprise-email">Email Credits</Label>
                          <Input id="enterprise-email" type="number" defaultValue="50000" />
                        </div>
                        {showAdvanced && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="enterprise-whatsapp">WhatsApp Messages</Label>
                              <Input id="enterprise-whatsapp" type="number" defaultValue="5000" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="enterprise-ussd">USSD Sessions</Label>
                              <Input id="enterprise-ussd" type="number" defaultValue="2000" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="enterprise-api">API Access</Label>
                              <div className="flex items-center gap-2">
                                <Switch id="enterprise-api" defaultChecked />
                                <span className="text-sm">Enabled</span>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Strategy</CardTitle>
                  <CardDescription>Configure your pricing strategy and commission structure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="markup-percentage">Markup Percentage (%)</Label>
                    <Input id="markup-percentage" type="number" defaultValue="30" />
                    <p className="text-xs text-muted-foreground">
                      This is the percentage markup you add to the base KasaSMS prices.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commission-rate">Your Commission Rate (%)</Label>
                    <Input id="commission-rate" type="number" defaultValue="30" disabled />
                    <p className="text-xs text-muted-foreground">
                      This is your commission rate as a reseller. Contact KasaSMS admin to change this rate.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Pricing Example</h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base KasaSMS Price:</span>
                        <span>$100.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your Markup (30%):</span>
                        <span>$30.00</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Client Price:</span>
                        <span>$130.00</span>
                      </div>
                      <div className="flex justify-between text-purple-600">
                        <span>Your Commission (30% of $130):</span>
                        <span>$39.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Pricing Strategy</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Individual Service Pricing</CardTitle>
                  <CardDescription>Set prices for individual services and add-ons.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">SMS Pricing</h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="sms-100">100 SMS Credits</Label>
                          <Input id="sms-100" type="number" defaultValue="5.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sms-500">500 SMS Credits</Label>
                          <Input id="sms-500" type="number" defaultValue="24.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sms-1000">1,000 SMS Credits</Label>
                          <Input id="sms-1000" type="number" defaultValue="44.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sms-5000">5,000 SMS Credits</Label>
                          <Input id="sms-5000" type="number" defaultValue="199.99" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Voice SMS Pricing</h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="voice-100">100 Minutes</Label>
                          <Input id="voice-100" type="number" defaultValue="9.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="voice-500">500 Minutes</Label>
                          <Input id="voice-500" type="number" defaultValue="44.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="voice-1000">1,000 Minutes</Label>
                          <Input id="voice-1000" type="number" defaultValue="84.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="voice-5000">5,000 Minutes</Label>
                          <Input id="voice-5000" type="number" defaultValue="399.99" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Email Pricing</h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-1000">1,000 Emails</Label>
                          <Input id="email-1000" type="number" defaultValue="9.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-5000">5,000 Emails</Label>
                          <Input id="email-5000" type="number" defaultValue="39.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-10000">10,000 Emails</Label>
                          <Input id="email-10000" type="number" defaultValue="69.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-50000">50,000 Emails</Label>
                          <Input id="email-50000" type="number" defaultValue="299.99" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">WhatsApp Pricing</h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp-100">100 Messages</Label>
                          <Input id="whatsapp-100" type="number" defaultValue="7.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp-500">500 Messages</Label>
                          <Input id="whatsapp-500" type="number" defaultValue="34.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp-1000">1,000 Messages</Label>
                          <Input id="whatsapp-1000" type="number" defaultValue="64.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp-5000">5,000 Messages</Label>
                          <Input id="whatsapp-5000" type="number" defaultValue="299.99" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">USSD Pricing</h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label htmlFor="ussd-100">100 Sessions</Label>
                          <Input id="ussd-100" type="number" defaultValue="9.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ussd-500">500 Sessions</Label>
                          <Input id="ussd-500" type="number" defaultValue="44.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ussd-1000">1,000 Sessions</Label>
                          <Input id="ussd-1000" type="number" defaultValue="84.99" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ussd-5000">5,000 Sessions</Label>
                          <Input id="ussd-5000" type="number" defaultValue="399.99" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Service Pricing</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="discounts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Discounts & Promotions</CardTitle>
                  <CardDescription>Create and manage discounts and promotional offers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Active Promotions</h3>
                    <Button className="bg-purple-500 hover:bg-purple-600">
                      <Plus className="mr-2 h-4 w-4" /> New Promotion
                    </Button>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Summer Sale</h4>
                        <p className="text-sm text-muted-foreground">20% off all plans</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Valid until: Aug 31, 2025</p>
                        <p className="text-sm text-green-600">Active</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Deactivate
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">New Client Discount</h4>
                        <p className="text-sm text-muted-foreground">50% off first month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Valid until: Dec 31, 2025</p>
                        <p className="text-sm text-green-600">Active</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        Deactivate
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-4 border-dashed">
                    <div className="flex flex-col items-center justify-center py-4">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Create a new promotion</p>
                      <Button className="mt-4 bg-purple-500 hover:bg-purple-600">
                        <Plus className="mr-2 h-4 w-4" /> Add Promotion
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Volume Discounts</CardTitle>
                  <CardDescription>Set up automatic discounts based on volume.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch id="enable-volume-discounts" defaultChecked />
                      <Label htmlFor="enable-volume-discounts">Enable Volume Discounts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically apply discounts based on the volume of services purchased.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tier1-threshold">Tier 1 Threshold</Label>
                        <Input id="tier1-threshold" type="number" defaultValue="5000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tier1-discount">Tier 1 Discount (%)</Label>
                        <Input id="tier1-discount" type="number" defaultValue="5" />
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" size="sm" className="mb-2">
                          <Check className="mr-2 h-4 w-4" />
                          Apply
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tier2-threshold">Tier 2 Threshold</Label>
                        <Input id="tier2-threshold" type="number" defaultValue="10000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tier2-discount">Tier 2 Discount (%)</Label>
                        <Input id="tier2-discount" type="number" defaultValue="10" />
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" size="sm" className="mb-2">
                          <Check className="mr-2 h-4 w-4" />
                          Apply
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tier3-threshold">Tier 3 Threshold</Label>
                        <Input id="tier3-threshold" type="number" defaultValue="25000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tier3-discount">Tier 3 Discount (%)</Label>
                        <Input id="tier3-discount" type="number" defaultValue="15" />
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" size="sm" className="mb-2">
                          <Check className="mr-2 h-4 w-4" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Volume Discounts</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
