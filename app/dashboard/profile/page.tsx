"use client"

import React from "react"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updateUserProfile } from "@/app/actions/user"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  // Initial state can be pre-filled from server-side props in a real app
  const [state, formAction, isPending] = useActionState(updateUserProfile, {
    success: false,
    message: "",
    errors: {},
  })

  // Show toast notifications based on action state
  React.useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
      </div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Update Your Profile</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your Name" defaultValue="User Name" />
              {state.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                defaultValue="user@example.com"
              />
              {state.errors?.email && <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>}
            </div>
            {/* Add more fields as needed, e.g., password change */}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
