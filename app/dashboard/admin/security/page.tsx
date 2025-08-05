import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function AdminSecurityPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Security Settings</h2>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription>Add an additional layer of security to your account by enabling 2FA.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="2fa-status">Status</Label>
              <Switch id="2fa-status" disabled /> {/* Disabled as functionality is not implemented */}
            </div>
            <p className="text-sm text-muted-foreground">
              2FA is currently disabled. Contact support to enable this feature.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password Policy</CardTitle>
            <CardDescription>Configure rules for user passwords to enhance security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="min-length">Minimum Length</Label>
              <Input id="min-length" type="number" defaultValue={8} disabled />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="require-uppercase" disabled />
              <Label htmlFor="require-uppercase">Require Uppercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="require-numbers" disabled />
              <Label htmlFor="require-numbers">Require Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="require-symbols" disabled />
              <Label htmlFor="require-symbols">Require Symbols</Label>
            </div>
            <Button disabled>Save Password Policy</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Management</CardTitle>
            <CardDescription>View and manage active login sessions for all users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">No active sessions to display at this time.</p>
            <Button disabled>Terminate All Sessions</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IP Whitelisting</CardTitle>
            <CardDescription>Restrict access to the admin panel to specific IP addresses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="whitelisted-ips">Whitelisted IP Addresses (comma-separated)</Label>
              <Input id="whitelisted-ips" type="text" placeholder="e.g., 192.168.1.1, 10.0.0.5" disabled />
            </div>
            <Button disabled>Save IP Whitelist</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
