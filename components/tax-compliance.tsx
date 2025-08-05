import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Scale } from "lucide-react"

export function TaxCompliance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Compliance</CardTitle>
        <CardDescription>Ensure your tax setup is compliant with regulations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Scale className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">No compliance checks performed</p>
            <p className="text-xs">Compliance status and recommendations will appear here.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
