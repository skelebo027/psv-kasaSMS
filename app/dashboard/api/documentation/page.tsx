import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "API Documentation | KasaSMS",
  description: "Explore the KasaSMS API documentation for integration.",
}

export default function ApiDocumentationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-muted-foreground">
          Explore the KasaSMS API documentation for seamless integration with your applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Learn how to authenticate and make your first API call.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Authentication</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  All API requests must be authenticated using an API key. Include your API key in the `Authorization`
                  header as a Bearer token.
                </p>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Base URL</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">The base URL for all KasaSMS API endpoints is:</p>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                  <code>https://api.kasasms.com/v1</code>
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS API</CardTitle>
          <CardDescription>Send and manage SMS messages programmatically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="sms-send">
              <AccordionTrigger>Send SMS</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">Send a single SMS message to a recipient.</p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">POST</Badge>
                  <code className="font-mono text-sm">/sms/send</code>
                </div>
                <h4 className="font-medium mb-1">Request Body:</h4>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto mb-2">
                  <code>
                    {`{
  "to": "+1234567890",
  "message": "Hello from KasaSMS!",
  "from": "KasaSMS"
}`}
                  </code>
                </pre>
                <h4 className="font-medium mb-1">Response:</h4>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                  <code>
                    {`{
  "status": "success",
  "messageId": "msg_abc123",
  "cost": 0.01
}`}
                  </code>
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sms-status">
              <AccordionTrigger>Get SMS Status</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Retrieve the delivery status of a sent SMS message.
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">GET</Badge>
                  <code className="font-mono text-sm">/sms/status/{`{messageId}`}</code>
                </div>
                <h4 className="font-medium mb-1">Response:</h4>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                  <code>
                    {`{
  "messageId": "msg_abc123",
  "status": "DELIVERED",
  "timestamp": "2023-10-27T10:00:00Z"
}`}
                  </code>
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp API</CardTitle>
          <CardDescription>Integrate WhatsApp messaging into your applications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="whatsapp-send">
              <AccordionTrigger>Send WhatsApp Message</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Send a WhatsApp message using a pre-approved template.
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">POST</Badge>
                  <code className="font-mono text-sm">/whatsapp/send</code>
                </div>
                <h4 className="font-medium mb-1">Request Body:</h4>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto mb-2">
                  <code>
                    {`{
  "to": "+1234567890",
  "templateName": "welcome_message",
  "languageCode": "en_US",
  "components": [
    {
      "type": "body",
      "parameters": [
        { "type": "text", "text": "John Doe" }
      ]
    }
  ]
}`}
                  </code>
                </pre>
                <h4 className="font-medium mb-1">Response:</h4>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
                  <code>
                    {`{
  "status": "success",
  "messageId": "whatsapp_msg_xyz789"
}`}
                  </code>
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
