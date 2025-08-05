"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Copy, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
}

export default function ApiManagementClientPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])

  const generateRandomKey = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321"
    let result = ""
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const handleGenerateKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: `New API Key ${apiKeys.length + 1}`,
      key: generateRandomKey(),
      created: new Date().toLocaleDateString(),
      lastUsed: "Never",
    }
    setApiKeys((prevKeys) => [...prevKeys, newKey])
    toast({
      title: "API Key Generated!",
      description: `New API key "${newKey.name}" has been created.`,
    })
  }

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "API Key Copied!",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleRevoke = (id: string) => {
    setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id))
    toast({
      title: "API Key Revoked!",
      description: "The API key has been successfully revoked.",
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
        <p className="text-muted-foreground">Manage your API keys and access logs for KasaSMS services.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>Generate and manage API keys for programmatic access to KasaSMS.</CardDescription>
          </div>
          <Button size="sm" className="h-8 gap-1" onClick={handleGenerateKey}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Generate New Key</span>
          </Button>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 border border-dashed rounded-lg text-muted-foreground">
              <p>No API keys found.</p>
              <p>Click "Generate New Key" to create your first API key.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Input type="text" value={key.key} readOnly className="font-mono text-sm" />
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(key.key)}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy API Key</span>
                      </Button>
                    </TableCell>
                    <TableCell>{key.created}</TableCell>
                    <TableCell>{key.lastUsed}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleRevoke(key.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Revoke</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
