import type { Metadata } from "next"
import CreateUSSDPageClient from "./CreateUSSDPageClient"

export const metadata: Metadata = {
  title: "Create USSD Service | KasaSMS",
  description: "Create and configure a new USSD service",
}

export default function CreateUSSDPage() {
  return <CreateUSSDPageClient />
}
