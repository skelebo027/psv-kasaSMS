import type { Metadata } from "next"
import ResellerDomainPageClient from "./page.client"

export const metadata: Metadata = {
  title: "Domain Management | KasaSMS Reseller",
  description: "Configure custom domains for your reseller portal and client access.",
}

export default function ResellerDomainPage() {
  return <ResellerDomainPageClient />
}
