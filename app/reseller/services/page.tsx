import type { Metadata } from "next"
import ResellerServicesClientPage from "./ResellerServicesClientPage"

export const metadata: Metadata = {
  title: "Service Management | KasaSMS Reseller",
  description: "Manage the services available to your clients and set pricing.",
}

export default function ResellerServicesPage() {
  return <ResellerServicesClientPage />
}
