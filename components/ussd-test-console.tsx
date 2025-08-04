"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Phone, RefreshCw, Send } from "lucide-react"

export function USSDTestConsole() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userInput, setUserInput] = useState("")
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionHistory, setSessionHistory] = useState<Array<{ type: string; content: string }>>([])

  const startSession = () => {
    if (!phoneNumber) return

    setSessionActive(true)
    setSessionHistory([
      {
        type: "system",
        content: `Starting USSD session for ${phoneNumber}`,
      },
      {
        type: "ussd",
        content: "Welcome to Our Service\n1. Check Balance\n2. Transfer Money\n3. Pay Bills\n4. Account Info",
      },
    ])
  }

  const resetSession = () => {
    setSessionActive(false)
    setUserInput("")
    setSessionHistory([])
  }

  const sendInput = () => {
    if (!userInput || !sessionActive) return

    // Add user input to history
    setSessionHistory((prev) => [
      ...prev,
      {
        type: "user",
        content: userInput,
      },
    ])

    // Simulate USSD response based on user input
    let response = ""
    switch (userInput) {
      case "1":
        response = "Your current balance is $1,250.00\n\n0. Back to Main Menu"
        break
      case "2":
        response = "Enter recipient's account number:\n\n0. Back to Main Menu"
        break
      case "3":
        response = "Select bill to pay:\n1. Electricity\n2. Water\n3. Internet\n\n0. Back to Main Menu"
        break
      case "4":
        response = "Account Information:\nAccount: 1234567890\nType: Savings\n\n0. Back to Main Menu"
        break
      case "0":
        response = "Welcome to Our Service\n1. Check Balance\n2. Transfer Money\n3. Pay Bills\n4. Account Info"
        break
      default:
        response = "Invalid option. Please try again.\n\n0. Back to Main Menu"
    }

    // Add response to history
    setTimeout(() => {
      setSessionHistory((prev) => [
        ...prev,
        {
          type: "ussd",
          content: response,
        },
      ])
      setUserInput("")
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>USSD Test Console</CardTitle>
          <CardDescription>Test your USSD service with a simulated phone interface</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <div className="flex gap-2">
              <Input
                id="phone-number"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={sessionActive}
              />
              {!sessionActive ? (
                <Button onClick={startSession} disabled={!phoneNumber}>
                  <Phone className="mr-2 h-4 w-4" />
                  Dial
                </Button>
              ) : (
                <Button variant="outline" onClick={resetSession}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {sessionActive && (
            <div className="space-y-2">
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px] max-h-[300px] overflow-y-auto flex flex-col gap-4">
                {sessionHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      item.type === "ussd"
                        ? "bg-white border p-3 rounded-lg"
                        : item.type === "user"
                          ? "bg-blue-50 border border-blue-100 p-2 rounded-lg self-end"
                          : "text-xs text-muted-foreground italic"
                    }`}
                  >
                    {item.type === "system" ? (
                      <p>{item.content}</p>
                    ) : item.type === "user" ? (
                      <p className="font-mono">Input: {item.content}</p>
                    ) : (
                      <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Enter your selection..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendInput()
                    }
                  }}
                />
                <Button onClick={sendInput} disabled={!userInput}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
          <CardDescription>View session logs and test results</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="logs">
            <TabsList className="mb-4">
              <TabsTrigger value="logs">Session Logs</TabsTrigger>
              <TabsTrigger value="variables">Variables</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="logs" className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50 font-mono text-xs h-[350px] overflow-y-auto">
                {sessionActive ? (
                  <>
                    <p className="text-green-600">[INFO] Session started for {phoneNumber}</p>
                    <p className="text-gray-500">[DEBUG] Loading service configuration...</p>
                    <p className="text-gray-500">[DEBUG] Service loaded successfully</p>
                    <p className="text-gray-500">[DEBUG] Session timeout set to 120 seconds</p>
                    <p className="text-blue-600">[INFO] Displaying welcome menu</p>
                    {sessionHistory
                      .filter((item) => item.type !== "system")
                      .map((item, index) => (
                        <div key={index}>
                          {item.type === "user" ? (
                            <p className="text-blue-600">[INFO] User input: {item.content}</p>
                          ) : (
                            <p className="text-gray-500">[DEBUG] Sending response to user</p>
                          )}
                        </div>
                      ))}
                  </>
                ) : (
                  <p className="text-muted-foreground">No active session. Start a session to view logs.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="variables" className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50 h-[350px] overflow-y-auto">
                {sessionActive ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Session Variables</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-mono bg-white p-2 rounded border">sessionId: "ussd-test-123"</div>
                        <div className="font-mono bg-white p-2 rounded border">phoneNumber: "{phoneNumber}"</div>
                        <div className="font-mono bg-white p-2 rounded border">
                          startTime: "{new Date().toISOString()}"
                        </div>
                        <div className="font-mono bg-white p-2 rounded border">currentMenu: "main"</div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">User Data</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-mono bg-white p-2 rounded border">accountBalance: "1250.00"</div>
                        <div className="font-mono bg-white p-2 rounded border">accountNumber: "1234567890"</div>
                        <div className="font-mono bg-white p-2 rounded border">accountType: "Savings"</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No active session. Start a session to view variables.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="performance" className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50 h-[350px] overflow-y-auto">
                {sessionActive ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Response Times</h3>
                      <div className="space-y-2">
                        <div className="bg-white p-3 rounded border">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Menu Load Time</span>
                            <span className="text-sm font-mono">45ms</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">User Input Processing</span>
                            <span className="text-sm font-mono">78ms</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Response Generation</span>
                            <span className="text-sm font-mono">112ms</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Session Statistics</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white p-2 rounded border">
                          <div className="text-muted-foreground">Total Interactions</div>
                          <div className="font-medium">{Math.floor(sessionHistory.length / 2)}</div>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <div className="text-muted-foreground">Session Duration</div>
                          <div className="font-medium">00:01:23</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No active session. Start a session to view performance metrics.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" disabled={!sessionActive}>
            Export Test Results
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
