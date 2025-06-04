import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WhatsAppOverview } from "@/components/whatsapp-overview"
import { WhatsAppTemplates } from "@/components/whatsapp-templates"
import { WhatsAppComposer } from "@/components/whatsapp-composer"
import { WhatsAppHistory } from "@/components/whatsapp-history"

export const metadata: Metadata = {
  title: "WhatsApp Messaging | KasaSMS",
  description: "Send WhatsApp messages with templates and media support",
}

export default function WhatsAppPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">WhatsApp Messaging</h1>
        <p className="text-muted-foreground">Send WhatsApp messages with templates and media support.</p>
      </div>

      <WhatsAppOverview />

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="compose" className="space-y-4">
          <WhatsAppComposer />
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <WhatsAppTemplates />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <WhatsAppHistory />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business API Settings</CardTitle>
              <CardDescription>Configure your WhatsApp Business API connection and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <h3 className="text-lg font-medium">API Configuration</h3>
                  <p className="text-sm text-muted-foreground">Your WhatsApp Business API is connected and active.</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                </div>
                <div className="grid gap-3">
                  <h3 className="text-lg font-medium">Business Profile</h3>
                  <p className="text-sm text-muted-foreground">Your business profile is complete and verified.</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
