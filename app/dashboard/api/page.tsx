import type { Metadata } from "next"
import ApiManagementClientPage from "./ApiManagementClientPage"

export const metadata: Metadata = {
  title: "API Management | KasaSMS",
  description: "Manage your API keys and access logs for KasaSMS services.",
}

export default function ApiManagementPage() {
  return <ApiManagementClientPage />
}
