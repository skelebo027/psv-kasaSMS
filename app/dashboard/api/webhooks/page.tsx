import type { Metadata } from "next"
import WebhooksClientPage from "./WebhooksClientPage"

export const metadata: Metadata = {
  title: "Webhooks | KasaSMS",
  description: "Configure webhooks to receive real-time notifications for events.",
}

export default function WebhooksPage() {
  return <WebhooksClientPage />
}
