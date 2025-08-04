import type { Metadata } from "next"
import ApiLogsClientPage from "./ApiLogsClientPage"

export const metadata: Metadata = {
  title: "API Logs | KasaSMS",
  description: "View detailed logs of all API requests and responses.",
}

export default function ApiLogsPage() {
  return <ApiLogsClientPage />
}
