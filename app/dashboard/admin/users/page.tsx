import type { Metadata } from "next"
import UserManagementClient from "./UserManagementClient"

export const metadata: Metadata = {
  title: "User Management | KasaSMS Admin",
  description: "Manage users and their roles within the KasaSMS platform.",
}

export default function AdminUsersPage() {
  return <UserManagementClient />
}
