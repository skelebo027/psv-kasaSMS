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
  ExternalLink,
  Check,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserNav } from "@/components/user-nav"
import { ResellerNav } from "@/components/reseller-nav"

export default function DomainPage() {
  const [domainSettings, setDomainSettings] = useState({
    customDomain: "",
    subdomain: "yourbrand",
    sslEnabled: true,
    domainStatus: "not_configured", // not_configured, pending, active, error
  })

  const handleDomainChange = (field: string, value: string) => {
    setDomainSettings((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Not Configured</Badge>
    }
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
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Palette className="h-5 w-5" />
                Branding
              </Button>
            </Link>
            <Link href="/reseller/domain">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-200">
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
            <h1 className="text-2xl font-bold">Custom Domain</h1>
            <Button className="bg-purple-500 hover:bg-purple-600">Save Configuration</Button>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Configure your custom domain to provide a fully white-labeled experience for your clients.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Configuration</CardTitle>
                <CardDescription>Set up your custom domain or use our subdomain service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">KasaSMS Subdomain</Label>
                    <div className="flex">
                      <Input
                        id="subdomain"
                        value={domainSettings.subdomain}
                        onChange={(e) => handleDomainChange("subdomain", e.target.value)}
                        className="rounded-r-none"
                      />
                      <div className="flex items-center px-3 bg-gray-100 border border-l-0 rounded-r-md text-sm text-muted-foreground">
                        .kasasms.com
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your platform will be accessible at: {domainSettings.subdomain}.kasasms.com
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-domain">Custom Domain</Label>
                    <Input
                      id="custom-domain"
                      placeholder="yourdomain.com"
                      value={domainSettings.customDomain}
                      onChange={(e) => handleDomainChange("customDomain", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Use your own domain for complete white-labeling</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Domain Status</p>
                    <p className="text-sm text-muted-foreground">Current configuration status</p>
                  </div>
                  {getStatusBadge(domainSettings.domainStatus)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DNS Configuration</CardTitle>
                <CardDescription>Configure these DNS records with your domain provider</CardDescription>
              </CardHeader>
              <CardContent>
                {domainSettings.customDomain ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm">Type</div>
                      <div className="font-medium text-sm">Name</div>
                      <div className="font-medium text-sm">Value</div>
                      <div className="font-medium text-sm">TTL</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                      <div className="text-sm font-mono">CNAME</div>
                      <div className="text-sm font-mono">@</div>
                      <div className="text-sm font-mono">proxy.kasasms.com</div>
                      <div className="text-sm font-mono">300</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                      <div className="text-sm font-mono">CNAME</div>
                      <div className="text-sm font-mono">www</div>
                      <div className="text-sm font-mono">proxy.kasasms.com</div>
                      <div className="text-sm font-mono">300</div>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        After configuring these DNS records, it may take up to 24 hours for changes to propagate
                        globally.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No custom domain configured</h3>
                    <p className="text-muted-foreground">
                      Enter your custom domain above to see DNS configuration instructions.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SSL Certificate</CardTitle>
                <CardDescription>Secure your domain with SSL encryption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">SSL Enabled</p>
                      <p className="text-sm text-muted-foreground">Automatic SSL certificate provisioning</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  SSL certificates are automatically provisioned and renewed for all domains configured through KasaSMS.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Domain Verification</CardTitle>
                <CardDescription>Verify your domain ownership and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" disabled={!domainSettings.customDomain && !domainSettings.subdomain}>
                    Verify Domain
                  </Button>
                  <Button variant="outline" disabled={!domainSettings.customDomain && !domainSettings.subdomain}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Test Domain
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">DNS records configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">SSL certificate issued</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">Domain accessible</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
