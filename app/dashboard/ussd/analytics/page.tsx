import type { Metadata } from "next"
import { USSDAnalyticsPageClient } from "./USSDAnalyticsPageClient"

export const metadata: Metadata = {
  title: "USSD Analytics | KasaSMS",
  description: "Detailed analytics for your USSD services",
}

export default function USSDAnalyticsPage() {
  return <USSDAnalyticsPageClient />
}
