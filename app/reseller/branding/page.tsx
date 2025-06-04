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
  Settings,
  Upload,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { UserNav } from "@/components/user-nav"
import { ResellerNav } from "@/components/reseller-nav"

export default function BrandingPage() {
  const [primaryColor, setPrimaryColor] = useState("#6d28d9")
  const [secondaryColor, setSecondaryColor] = useState("#a855f7")
  const [accentColor, setAccentColor] = useState("#f59e0b")
  const [brandName, setBrandName] = useState("YourBrandSMS")
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg?height=40&width=40")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 mr-4">
            <MessageSquare className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold text-purple-500">{brandName}</span>
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
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Percent className="h-5 w-5" />
                Pricing
              </Button>
            </Link>
            <Link href="/reseller/branding">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
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
            <h1 className="text-2xl font-bold">White-Label Branding</h1>
            <Button className="bg-purple-500 hover:bg-purple-600">Save Changes</Button>
          </div>
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Identity</CardTitle>
                  <CardDescription>Customize your brand's visual identity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand-name">Brand Name</Label>
                    <Input
                      id="brand-name"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="Enter your brand name"
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be displayed in the header and throughout the platform.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md border">
                        <img
                          src={logoUrl || "/placeholder.svg"}
                          alt="Brand logo"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 200x200px. Max file size: 2MB. Formats: PNG, JPG, SVG.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 overflow-hidden rounded-md border">
                        <img src={logoUrl || "/placeholder.svg"} alt="Favicon" className="h-full w-full object-cover" />
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 32x32px. Max file size: 1MB. Formats: PNG, ICO.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                  <CardDescription>Define your brand's color palette.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex">
                        <div
                          className="h-10 w-10 rounded-l-md border-y border-l"
                          style={{ backgroundColor: primaryColor }}
                        ></div>
                        <Input
                          id="primary-color"
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="rounded-l-none"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Used for main buttons and accents.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex">
                        <div
                          className="h-10 w-10 rounded-l-md border-y border-l"
                          style={{ backgroundColor: secondaryColor }}
                        ></div>
                        <Input
                          id="secondary-color"
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="rounded-l-none"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Used for secondary elements.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex">
                        <div
                          className="h-10 w-10 rounded-l-md border-y border-l"
                          style={{ backgroundColor: accentColor }}
                        ></div>
                        <Input
                          id="accent-color"
                          type="text"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="rounded-l-none"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Used for highlights and call-to-actions.</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-md border p-4">
                    <h3 className="font-medium">Color Preview</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-24 rounded-md" style={{ backgroundColor: primaryColor }}></div>
                        <span className="mt-1 text-xs">Primary</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-24 rounded-md" style={{ backgroundColor: secondaryColor }}></div>
                        <span className="mt-1 text-xs">Secondary</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-24 rounded-md" style={{ backgroundColor: accentColor }}></div>
                        <span className="mt-1 text-xs">Accent</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-24 rounded-md border" style={{ backgroundColor: "#ffffff" }}></div>
                        <span className="mt-1 text-xs">Background</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-24 rounded-md" style={{ backgroundColor: "#f3f4f6" }}></div>
                        <span className="mt-1 text-xs">Secondary BG</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-24 rounded-md" style={{ backgroundColor: "#111827" }}></div>
                        <span className="mt-1 text-xs">Text</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>Additional appearance settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Button Style</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Card className="cursor-pointer border-2 border-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Rounded</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full rounded-md bg-purple-500 hover:bg-purple-600">Button</Button>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Pill</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full rounded-full bg-purple-500 hover:bg-purple-600">Button</Button>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Square</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full rounded-none bg-purple-500 hover:bg-purple-600">Button</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Card Style</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Card className="cursor-pointer border-2 border-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Standard</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-20 rounded-md border p-4">
                            <p className="text-sm">Card with border</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="cursor-pointer">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Elevated</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-20 rounded-md border p-4 shadow-md">
                            <p className="text-sm">Card with shadow</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Theme Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Text Content</CardTitle>
                  <CardDescription>Customize the text content displayed to your clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" placeholder="Your messaging solution" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Textarea
                      id="welcome-message"
                      placeholder="Welcome to our messaging platform"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="footer-text">Footer Text</Label>
                    <Input id="footer-text" placeholder="© 2025 Your Company. All rights reserved." />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Customize the emails sent to your clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-header">Email Header</Label>
                    <Input id="email-header" placeholder="Your Company Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-footer">Email Footer</Label>
                    <Textarea
                      id="email-footer"
                      placeholder="© 2025 Your Company. All rights reserved."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Templates</Label>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Welcome Email</p>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Password Reset</p>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Invoice</p>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Legal Documents</CardTitle>
                  <CardDescription>Customize your legal documents.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="terms-of-service">Terms of Service</Label>
                    <Textarea
                      id="terms-of-service"
                      className="min-h-[150px]"
                      placeholder="Enter your terms of service"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="privacy-policy">Privacy Policy</Label>
                    <Textarea id="privacy-policy" className="min-h-[150px]" placeholder="Enter your privacy policy" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Save Content Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preview Your Branded Platform</CardTitle>
                  <CardDescription>See how your platform will look to your clients.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="border-b bg-white p-4">
                      <div className="flex items-center gap-2">
                        <img src={logoUrl || "/placeholder.svg"} alt="Brand logo" className="h-8 w-8" />
                        <span className="text-xl font-bold" style={{ color: primaryColor }}>
                          {brandName}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 rounded-md bg-gray-100 p-4">
                        <h3 className="text-lg font-medium">Welcome to {brandName}</h3>
                        <p className="text-sm text-gray-600">Your complete messaging solution</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-md border p-4">
                          <h4 className="font-medium">SMS Messaging</h4>
                          <p className="text-sm text-gray-600">Send SMS messages to your contacts</p>
                          <Button className="mt-2 w-full" style={{ backgroundColor: primaryColor }}>
                            Get Started
                          </Button>
                        </div>
                        <div className="rounded-md border p-4">
                          <h4 className="font-medium">Voice Messaging</h4>
                          <p className="text-sm text-gray-600">Send voice messages to your contacts</p>
                          <Button className="mt-2 w-full" style={{ backgroundColor: primaryColor }}>
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border-t bg-gray-50 p-4">
                      <p className="text-center text-sm text-gray-600">© 2025 {brandName}. All rights reserved.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Edit Branding</Button>
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Check className="mr-2 h-4 w-4" />
                    Apply Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
