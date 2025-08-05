import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TaxCompliance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Compliance Status</CardTitle>
        <CardDescription>Overview of your tax compliance status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground">Overall Status:</p>
          <Badge variant="secondary">Not Configured</Badge>
        </div>
        <div className="text-center text-muted-foreground py-8">No compliance checks performed.</div>
      </CardContent>
    </Card>
  )
}
