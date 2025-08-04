"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Globe, CheckCircle, XCircle, AlertTriangle, Copy, Shield, Zap, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DomainConfig {
  domain: string
  status: "pending" | "verified" | "failed"
  sslEnabled: boolean
  lastChecked: string
}

export default function ResellerDomainPageClient() {
  const [customDomain, setCustomDomain] = useState("")
  const [domainConfig, setDomainConfig] = useState<DomainConfig | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [newDomain, setNewDomain] = useState("")
  const [isConfiguring, setIsConfiguring] = useState(false)
  const currentDomain = "" // Empty string for no domain configured

  const handleAddDomain = async () => {
    if (!customDomain.trim()) return

    setIsVerifying(true)

    // Simulate domain verification process
    setTimeout(() => {
      setDomainConfig({
        domain: customDomain,
        status: "pending",
        sslEnabled: false,
        lastChecked: new Date().toISOString(),
      })
      setIsVerifying(false)
    }, 2000)
  }

  const handleVerifyDomain = async () => {
    if (!domainConfig) return

    setIsVerifying(true)

    // Simulate verification
    setTimeout(() => {
      setDomainConfig({
        ...domainConfig,
        status: "verified",
        sslEnabled: true,
        lastChecked: new Date().toISOString(),
      })
      setIsVerifying(false)
    }, 3000)
  }

  const handleConfigureDomain = () => {
    setIsConfiguring(true)
    // Simulate API call
    setTimeout(() => {
      console.log(`Configuring domain: ${newDomain}`)
      alert(`Domain "${newDomain}" configuration simulated.`)
      setIsConfiguring(false)
      // In a real app, you'd update currentDomain state after successful API call
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const dnsRecords = [
    {
      type: "CNAME",
      name: "api",
      value: "api.kasasms.com",
      description: "API endpoint",
    },
    {
      type: "CNAME",
      name: "dashboard",
      value: "dashboard.kasasms.com",
      description: "Dashboard access",
    },
    {
      type: "TXT",
      name: "@",
      value: "kasasms-verification=abc123def456",
      description: "Domain verification",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <div className="bg-green-100 text-green-800 flex items-center gap-1 p-2 rounded">
            <CheckCircle className="h-3 w-3" />
            Verified
          </div>
        )
      case "pending":
        return (
          <div className="bg-yellow-100 text-yellow-800 flex items-center gap-1 p-2 rounded">
            <AlertTriangle className="h-3 w-3" />
            Pending
          </div>
        )
      case "failed":
        return (
          <div className="bg-red-100 text-red-800 flex items-center gap-1 p-2 rounded">
            <XCircle className="h-3 w-3" />
            Failed
          </div>
        )
      default:
        return <div className="bg-gray-100 text-gray-800 flex items-center gap-1 p-2 rounded">Unknown</div>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Domain Management</h1>
        <p className="text-muted-foreground">Configure custom domains for your reseller portal and client access.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Domain Configuration</CardTitle>
          <CardDescription>Set up a custom domain for your KasaSMS Reseller portal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentDomain ? (
            <div className="grid gap-3">
              <h3 className="text-lg font-medium">Current Domain</h3>
              <p className="text-sm text-muted-foreground">Your reseller portal is currently accessible at:</p>
              <p className="font-mono text-lg font-semibold">{currentDomain}</p>
              <Button variant="outline" className="w-fit bg-transparent">
                Change Domain
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              <h3 className="text-lg font-medium">No Custom Domain Set</h3>
              <p className="text-sm text-muted-foreground">
                Your reseller portal is currently using the default KasaSMS subdomain. Configure a custom domain for a
                branded experience.
              </p>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important!</AlertTitle>
                <AlertDescription>
                  After setting your custom domain, you will need to update your DNS records (CNAME or A record) to
                  point to KasaSMS. Instructions will be provided upon saving.
                </AlertDescription>
              </Alert>
              <div className="grid gap-2">
                <Label htmlFor="new-domain">New Custom Domain</Label>
                <Input
                  id="new-domain"
                  placeholder="your-brand.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </div>
              <Button onClick={handleConfigureDomain} disabled={!newDomain || isConfiguring}>
                {isConfiguring ? "Configuring..." : "Configure Domain"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domain Status</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domainConfig ? getStatusBadge(domainConfig.status) : "Not Set"}</div>
            <p className="text-xs text-muted-foreground">{domainConfig ? domainConfig.domain : "No custom domain"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SSL Certificate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {domainConfig?.sslEnabled ? (
                <div className="bg-green-100 text-green-800 flex items-center gap-1 p-2 rounded">
                  <Shield className="h-3 w-3" />
                  Active
                </div>
              ) : (
                <div className="bg-gray-100 text-gray-800 flex items-center gap-1 p-2 rounded">
                  <XCircle className="h-3 w-3" />
                  Inactive
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{domainConfig?.sslEnabled ? "HTTPS enabled" : "HTTP only"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Fast</div>
            <p className="text-xs text-muted-foreground">Global CDN enabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Checked</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domainConfig ? "Now" : "Never"}</div>
            <p className="text-xs text-muted-foreground">
              {domainConfig ? new Date(domainConfig.lastChecked).toLocaleString() : "No checks performed"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Domain Setup</TabsTrigger>
          <TabsTrigger value="dns">DNS Configuration</TabsTrigger>
          <TabsTrigger value="ssl">SSL Certificate</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Custom Domain</CardTitle>
              <CardDescription>Set up your custom domain for white-label access to KasaSMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!domainConfig ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="domain">Custom Domain</Label>
                    <Input
                      id="domain"
                      placeholder="api.yourdomain.com"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter your custom domain (e.g., api.yourdomain.com)
                    </p>
                  </div>
                  <Button onClick={handleAddDomain} disabled={!customDomain.trim() || isVerifying} className="w-full">
                    {isVerifying ? "Adding Domain..." : "Add Domain"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{domainConfig.domain}</h3>
                      <p className="text-sm text-muted-foreground">Status: {getStatusBadge(domainConfig.status)}</p>
                    </div>
                    <div className="flex gap-2">
                      {domainConfig.status === "pending" && (
                        <Button onClick={handleVerifyDomain} disabled={isVerifying} size="sm">
                          {isVerifying ? "Verifying..." : "Verify Domain"}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => setDomainConfig(null)}>
                        Remove
                      </Button>
                    </div>
                  </div>

                  {domainConfig.status === "pending" && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Please configure the DNS records below and click "Verify Domain" to complete the setup.
                      </AlertDescription>
                    </Alert>
                  )}

                  {domainConfig.status === "verified" && (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>Your domain is successfully configured and ready to use!</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DNS Configuration</CardTitle>
              <CardDescription>Add these DNS records to your domain provider</CardDescription>
            </CardHeader>
            <CardContent>
              {!domainConfig ? (
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No domain configured</h3>
                  <p className="text-gray-500">Add a custom domain first to see DNS configuration.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Add these DNS records to your domain provider's control panel. Changes may take up to 24 hours to
                      propagate.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    {dnsRecords.map((record, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-100 text-gray-800 flex items-center gap-1 p-2 rounded">
                              {record.type}
                            </div>
                            <span className="font-medium">{record.description}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(record.value)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <Label className="text-xs text-muted-foreground">NAME</Label>
                            <code className="block bg-gray-100 p-2 rounded mt-1">{record.name}</code>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">VALUE</Label>
                            <code className="block bg-gray-100 p-2 rounded mt-1">{record.value}</code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ssl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SSL Certificate</CardTitle>
              <CardDescription>Secure your custom domain with SSL encryption</CardDescription>
            </CardHeader>
            <CardContent>
              {!domainConfig ? (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No domain configured</h3>
                  <p className="text-gray-500">Add and verify a custom domain first to enable SSL.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">SSL Certificate</h3>
                      <p className="text-sm text-muted-foreground">
                        {domainConfig.sslEnabled ? "Active and secure" : "Not configured"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {domainConfig.sslEnabled ? (
                        <div className="bg-green-100 text-green-800 flex items-center gap-1 p-2 rounded">
                          <Shield className="h-3 w-3" />
                          Secure
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-800 flex items-center gap-1 p-2 rounded">
                          <XCircle className="h-3 w-3" />
                          Not Secure
                        </div>
                      )}
                    </div>
                  </div>

                  {domainConfig.sslEnabled ? (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your SSL certificate is active and your domain is secure. All traffic is encrypted with HTTPS.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        SSL certificate will be automatically provisioned once your domain is verified and DNS records
                        are properly configured.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Domain Settings</CardTitle>
              <CardDescription>Configure additional settings for your custom domain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Force HTTPS</Label>
                    <p className="text-sm text-muted-foreground">Automatically redirect HTTP traffic to HTTPS</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Enable HSTS</Label>
                    <p className="text-sm text-muted-foreground">
                      HTTP Strict Transport Security for enhanced security
                    </p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">CDN Acceleration</Label>
                    <p className="text-sm text-muted-foreground">Global content delivery network for faster loading</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
              <Button className="w-full">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
