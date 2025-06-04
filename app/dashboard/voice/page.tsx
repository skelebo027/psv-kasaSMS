"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Play, Volume2, Clock, DollarSign } from "lucide-react"

export default function VoicePage() {
  const [message, setMessage] = useState("")
  const [recipients, setRecipients] = useState("")
  const [voice, setVoice] = useState("female")
  const [language, setLanguage] = useState("en")
  const [speed, setSpeed] = useState("normal")

  const recipientCount = recipients.split("\n").filter((r) => r.trim()).length
  const estimatedCost = recipientCount * 0.6 // GH₵ 0.60 per minute

  const handleSendVoice = () => {
    console.log("Sending voice message:", { message, recipients, voice, language, speed })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Voice SMS</h1>
          <p className="text-gray-600">Send voice messages to your contacts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Balance: GH₵ 1,250.50</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Voice Message Composer
            </CardTitle>
            <CardDescription>Create and send voice messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message Text</Label>
              <Textarea
                id="message"
                placeholder="Enter your message text (will be converted to speech)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">Characters: {message.length}/1000</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voice">Voice Type</Label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female Voice</SelectItem>
                    <SelectItem value="male">Male Voice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tw">Twi</SelectItem>
                    <SelectItem value="ga">Ga</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed">Speech Speed</Label>
              <Select value={speed} onValueChange={setSpeed}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recipients & Delivery</CardTitle>
            <CardDescription>Manage recipients and send settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Phone Numbers</Label>
              <Textarea
                id="recipients"
                placeholder="Enter phone numbers (one per line)&#10;+233241234567&#10;+233501234567"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                rows={6}
              />
              <p className="text-sm text-muted-foreground">Recipients: {recipientCount}</p>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Cost Estimate</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Recipients:</span>
                  <span>{recipientCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate per call:</span>
                  <span>GH₵ 0.60</span>
                </div>
                <div className="flex justify-between font-medium col-span-2 pt-2 border-t">
                  <span>Total Cost:</span>
                  <span>GH₵ {estimatedCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSendVoice}
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={!message || !recipients}
            >
              <Phone className="h-4 w-4 mr-2" />
              Send Voice Messages
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls This Month</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
            <p className="text-xs text-muted-foreground">Voice minutes used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵ 1,473.60</div>
            <p className="text-xs text-muted-foreground">Voice messaging costs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
