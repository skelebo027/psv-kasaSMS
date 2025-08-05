"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { CheckCircle, XCircle, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function TaxCompliance() {
  const { toast } = useToast()

  const complianceStatus = {
    vatRegistration: "Not Registered",
    taxIdVerification: "Pending",
    filingDeadlines: "No upcoming deadlines",
  }

  const handleUpdateCompliance = () => {
    toast({
      title: "Compliance Status Updated",
      description: "Your compliance information has been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tax Compliance Status</CardTitle>
          <CardDescription>Monitor your tax compliance and ensure all requirements are met.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="font-medium">VAT Registration</h3>
            <div className="mt-2 flex items-center gap-2">
              {complianceStatus.vatRegistration === "Registered" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <p className="text-sm">{complianceStatus.vatRegistration}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Ensure your business is registered for VAT in all applicable regions.
            </p>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                Update Registration
              </Button>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h3 className="font-medium">Tax ID Verification</h3>
            <div className="mt-2 flex items-center gap-2">
              {complianceStatus.taxIdVerification === "Verified" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Info className="h-5 w-5 text-blue-500" />
              )}
              <p className="text-sm">{complianceStatus.taxIdVerification}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Verify your tax identification numbers with relevant authorities.
            </p>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                Verify Tax ID
              </Button>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h3 className="font-medium">Upcoming Filing Deadlines</h3>
            <div className="mt-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">{complianceStatus.filingDeadlines}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Stay informed about your tax filing obligations and deadlines.
            </p>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                View Deadlines
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateCompliance}>Save Compliance Info</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
