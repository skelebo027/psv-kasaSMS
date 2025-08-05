import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export function TaxCompliance() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Status Check</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-muted-foreground">
              Last checked: Never. Click the button below to perform a compliance check.
            </p>
          </div>
          <Button disabled>Run Compliance Check</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No compliance issues found.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regulatory Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent regulatory updates to display.</p>
        </CardContent>
      </Card>
    </div>
  )
}
