interface SMSGatewayConfig {
  host: string
  port: number
  username: string
  password: string
  clientIP: string
}

interface SMSMessage {
  to: string
  from: string
  message: string
  type?: "text" | "unicode"
}

interface SMSResponse {
  success: boolean
  messageId?: string
  error?: string
  cost?: number
}

class SMSGateway {
  private config: SMSGatewayConfig

  constructor() {
    this.config = {
      host: "eme.npontutechnologies.com",
      port: 62143,
      username: "skelebo@gmail.com",
      password: "2a06dc@2023$",
      clientIP: "198.57.148.31",
    }
  }

  async sendSMS(message: SMSMessage): Promise<SMSResponse> {
    try {
      const payload = {
        username: this.config.username,
        password: this.config.password,
        to: message.to,
        from: message.from,
        text: message.message,
        type: message.type || "text",
        clientIP: this.config.clientIP,
      }

      const response = await fetch(`http://${this.config.host}:${this.config.port}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-IP": this.config.clientIP,
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        return {
          success: true,
          messageId: result.messageId,
          cost: this.calculateCost(message.message),
        }
      } else {
        return {
          success: false,
          error: result.error || "Failed to send SMS",
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  async sendBulkSMS(messages: SMSMessage[]): Promise<SMSResponse[]> {
    const results: SMSResponse[] = []

    for (const message of messages) {
      const result = await this.sendSMS(message)
      results.push(result)

      // Add small delay to prevent rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return results
  }

  async checkBalance(): Promise<{ balance: number; currency: string }> {
    try {
      const response = await fetch(`http://${this.config.host}:${this.config.port}/api/balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-IP": this.config.clientIP,
        },
        body: JSON.stringify({
          username: this.config.username,
          password: this.config.password,
        }),
      })

      const result = await response.json()
      return {
        balance: result.balance || 0,
        currency: "GH₵",
      }
    } catch (error) {
      return { balance: 0, currency: "GH₵" }
    }
  }

  private calculateCost(message: string): number {
    const smsLength = 160
    const segments = Math.ceil(message.length / smsLength)
    const costPerSMS = 0.03 // GH₵ 0.030 per SMS
    return segments * costPerSMS
  }

  async getDeliveryReport(messageId: string): Promise<{
    status: "delivered" | "pending" | "failed"
    timestamp?: string
  }> {
    try {
      const response = await fetch(`http://${this.config.host}:${this.config.port}/api/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-IP": this.config.clientIP,
        },
        body: JSON.stringify({
          username: this.config.username,
          password: this.config.password,
          messageId,
        }),
      })

      const result = await response.json()
      return {
        status: result.status || "pending",
        timestamp: result.timestamp,
      }
    } catch (error) {
      return { status: "failed" }
    }
  }
}

export const smsGateway = new SMSGateway()
export type { SMSMessage, SMSResponse }
