"use client"

import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { useForm, zodResolver } from "react-hook-form"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

const generalFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  taxId: z.string().min(5, {
    message: "Tax ID must be at least 5 characters.",
  }),
  taxOffice: z.string().min(2, {
    message: "Tax office must be at least 2 characters.",
  }),
  fiscalYear: z.string({
    required_error: "Please select a fiscal year start.",
  }),
  autoCollect: z.boolean().default(true),
  primaryTaxRegion: z.string({
    required_error: "Please select a primary tax region.",
  }),
  defaultTaxRate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
    message: "Default Tax Rate must be a number between 0 and 100.",
  }),
  taxExemptCountries: z.string().optional(),
  taxNotes: z.string().optional(),
})

const rateFormSchema = z.object({
  rates: z
    .array(
      z.object({
        name: z.string().min(2, {
          message: "Tax name must be at least 2 characters.",
        }),
        rate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
          message: "Rate must be a number between 0 and 100.",
        }),
        type: z.string({
          required_error: "Please select a tax type.",
        }),
        region: z.string().min(2, {
          message: "Region must be at least 2 characters.",
        }),
        isDefault: z.boolean().default(false),
      }),
    )
    .min(1, {
      message: "You must add at least one tax rate.",
    }),
})

type GeneralFormValues = z.infer<typeof generalFormSchema>
type RateFormValues = z.infer<typeof rateFormSchema>

// This simulates a pre-filled form with existing data
const defaultGeneral: GeneralFormValues = {
  companyName: "KasaSMS Inc.",
  taxId: "TAX123456789",
  taxOffice: "Central Tax Office",
  fiscalYear: "january",
  autoCollect: true,
  primaryTaxRegion: "ghana",
  defaultTaxRate: "15",
  taxExemptCountries: "US, CA",
  taxNotes: "This is a tax note.",
}

const defaultRates: RateFormValues = {
  rates: [
    {
      name: "Value Added Tax",
      rate: "15",
      type: "vat",
      region: "National",
      isDefault: true,
    },
    {
      name: "Sales Tax",
      rate: "7.5",
      type: "sales",
      region: "State",
      isDefault: false,
    },
    {
      name: "Withholding Tax",
      rate: "10",
      type: "withholding",
      region: "National",
      isDefault: false,
    },
  ],
}

export function TaxSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: defaultGeneral,
  })

  const rateForm = useForm<RateFormValues>({
    resolver: zodResolver(rateFormSchema),
    defaultValues: defaultRates,
  })

  function onGeneralSubmit(data: GeneralFormValues) {
    toast({
      title: "Tax settings updated",
      description: "Your general tax settings have been saved successfully.",
    })
    console.log(data)
  }

  function onRateSubmit(data: RateFormValues) {
    toast({
      title: "Tax rates updated",
      description: "Your tax rates have been saved successfully.",
    })
    console.log(data)
  }

  function addTaxRate() {
    const currentRates = rateForm.getValues().rates
    rateForm.setValue("rates", [...currentRates, { name: "", rate: "0", type: "vat", region: "", isDefault: false }])
  }

  function removeTaxRate(index: number) {
    const currentRates = rateForm.getValues().rates
    rateForm.setValue(
      "rates",
      currentRates.filter((_, i) => i !== index),
    )
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your tax settings have been updated.",
    })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General Settings</TabsTrigger>
        <TabsTrigger value="rates">Tax Rates</TabsTrigger>
        <TabsTrigger value="exemptions">Exemptions</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Tax Configuration</CardTitle>
            <CardDescription>Configure global tax rates and settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-tax">Enable Tax Calculation</Label>
                <p className="text-sm text-muted-foreground">Automatically calculate taxes on transactions.</p>
              </div>
              <Switch
                id="enable-tax"
                checked={generalForm.getValues("autoCollect")}
                onCheckedChange={(value) => generalForm.setValue("autoCollect", value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="default-tax-rate">Default Tax Rate (%)</Label>
              <Input
                id="default-tax-rate"
                type="number"
                placeholder="0.00"
                {...generalForm.register("defaultTaxRate")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
              <Input id="tax-id" placeholder="Enter Tax ID" {...generalForm.register("taxId")} />
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={generalForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The legal name of your company as registered with tax authorities.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="taxOffice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Office</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tax office" {...field} />
                    </FormControl>
                    <FormDescription>The tax office where you file your returns.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="fiscalYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fiscal Year Start</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fiscal year start" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="february">February</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                        <SelectItem value="july">July</SelectItem>
                        <SelectItem value="august">August</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                        <SelectItem value="november">November</SelectItem>
                        <SelectItem value="december">December</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>The month when your fiscal year begins.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="primaryTaxRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Tax Region</FormLabel>
                    <Select defaultValue="ghana">
                      <SelectTrigger id="tax-region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ghana">Ghana</SelectItem>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This is the default region for tax calculations.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="taxExemptCountries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Exempt Countries (comma-separated ISO codes)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., US, CA" {...field} />
                    </FormControl>
                    <FormDescription>Customers from these countries will not be charged tax.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={generalForm.control}
                name="taxNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Notes/Disclaimers</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add any tax-related notes or disclaimers here." {...field} />
                    </FormControl>
                    <FormDescription>These notes will appear on invoices and billing statements.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="button" onClick={generalForm.handleSubmit(onGeneralSubmit)}>
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rates">
        <Card>
          <CardHeader>
            <CardTitle>Tax Rates</CardTitle>
            <CardDescription>Configure the tax rates that apply to your services.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...rateForm}>
              <form onSubmit={rateForm.handleSubmit(onRateSubmit)} className="space-y-8">
                {rateForm.getValues().rates.map((_, index) => (
                  <div key={index} className="rounded-md border p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Tax Rate {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTaxRate(index)}
                        disabled={rateForm.getValues().rates.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={rateForm.control}
                        name={`rates.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Value Added Tax" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={rateForm.control}
                        name={`rates.${index}.rate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate (%)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={rateForm.control}
                        name={`rates.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select tax type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="vat">VAT</SelectItem>
                                <SelectItem value="sales">Sales Tax</SelectItem>
                                <SelectItem value="withholding">Withholding Tax</SelectItem>
                                <SelectItem value="service">Service Tax</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={rateForm.control}
                        name={`rates.${index}.region`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region/Jurisdiction</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., National, State, City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={rateForm.control}
                      name={`rates.${index}.isDefault`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Set as default tax rate</FormLabel>
                            <FormDescription>This rate will be applied to all services by default.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent" onClick={addTaxRate}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Tax Rate
                </Button>

                <div className="flex justify-end">
                  <Button type="submit">Save Tax Rates</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="exemptions">
        <Card>
          <CardHeader>
            <CardTitle>Tax Exemptions</CardTitle>
            <CardDescription>Configure tax exemptions for specific customers or services.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Customer Exemptions</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                    <div>
                      <div className="font-medium">Acme Corporation</div>
                      <div className="text-sm text-muted-foreground">Tax ID: ACME123456</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>VAT Exempt</Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                    <div>
                      <div className="font-medium">Global Enterprises</div>
                      <div className="text-sm text-muted-foreground">Tax ID: GLOB789012</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Withholding Exempt</Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Customer Exemption
                </Button>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Service Exemptions</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                    <div>
                      <div className="font-medium">Educational SMS Package</div>
                      <div className="text-sm text-muted-foreground">Service ID: EDU-SMS-001</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Tax Exempt</Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                    <div>
                      <div className="font-medium">Charity Messaging Bundle</div>
                      <div className="text-sm text-muted-foreground">Service ID: CHAR-MSG-002</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>Reduced Rate (5%)</Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Service Exemption
                </Button>
              </div>
            </div>
          </CardContent>
          <Button disabled>Save Exemptions</Button>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
