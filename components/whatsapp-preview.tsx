"use client"
import { FileImage, FileText, Mic, Video } from "lucide-react"

interface WhatsAppPreviewProps {
  messageType: string
  text: string
  mediaUrl?: string
  templateId?: string
}

export function WhatsAppPreview({ messageType, text, mediaUrl, templateId }: WhatsAppPreviewProps) {
  // Template content mapping
  const templateContent = {
    welcome: {
      text: "Hello {{1}}, welcome to KasaSMS! We're excited to have you on board. Feel free to explore our services and reach out if you have any questions.",
      header: "Welcome to KasaSMS",
    },
    order_confirmation: {
      text: "Hi {{1}}, your order #{{2}} has been confirmed and is being processed. Expected delivery: {{3}}. Thank you for your purchase!",
      header: "Order Confirmation",
    },
    payment_reminder: {
      text: "Hello {{1}}, this is a friendly reminder that your payment of {{2}} is due on {{3}}. Please make your payment to avoid service interruption.",
      header: "Payment Reminder",
    },
    appointment: {
      text: "Hi {{1}}, this is a reminder of your appointment scheduled for {{2}} at {{3}}. Please confirm your attendance.",
      header: "Appointment Reminder",
    },
    feedback: {
      text: "Hello {{1}}, thank you for using our service. We'd love to hear your feedback about your recent experience with us.",
      header: "We Value Your Feedback",
    },
  }

  const getTemplatePreview = () => {
    if (!templateId || !templateContent[templateId as keyof typeof templateContent]) {
      return "Select a template to preview"
    }

    const template = templateContent[templateId as keyof typeof templateContent]
    return (
      <div className="space-y-2">
        <div className="font-medium text-sm">{template.header}</div>
        <div className="text-sm">{template.text.replace(/\{\{(\d+)\}\}/g, "...")}</div>
      </div>
    )
  }

  const getMediaPreview = () => {
    if (!mediaUrl) {
      return (
        <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-md">
          <FileImage className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Media preview will appear here</span>
        </div>
      )
    }

    // For demo purposes, show a placeholder based on URL
    if (mediaUrl.includes("image")) {
      return (
        <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-md">
          <FileImage className="h-8 w-8 text-orange-500 mb-2" />
          <span className="text-sm">Image</span>
        </div>
      )
    } else if (mediaUrl.includes("video")) {
      return (
        <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-md">
          <Video className="h-8 w-8 text-orange-500 mb-2" />
          <span className="text-sm">Video</span>
        </div>
      )
    } else if (mediaUrl.includes("audio")) {
      return (
        <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-md">
          <Mic className="h-8 w-8 text-orange-500 mb-2" />
          <span className="text-sm">Audio</span>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-md">
          <FileText className="h-8 w-8 text-orange-500 mb-2" />
          <span className="text-sm">Document</span>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[300px]">
        <div className="bg-gray-100 rounded-t-lg p-2 text-center text-xs text-gray-500">WhatsApp</div>
        <div className="bg-[#e5ddd5] p-4 h-[400px] overflow-y-auto">
          <div className="flex justify-end mb-4">
            <div className="bg-[#dcf8c6] rounded-lg p-3 max-w-[80%] shadow-sm">
              <p className="text-sm">Hey there! How can I help you today?</p>
              <p className="text-[10px] text-gray-500 text-right mt-1">10:30 AM</p>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
              <p className="text-sm">I'd like to know more about your services.</p>
              <p className="text-[10px] text-gray-500 text-right mt-1">10:31 AM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#dcf8c6] rounded-lg p-3 max-w-[80%] shadow-sm">
              {messageType === "text" && text ? (
                <p className="text-sm">{text}</p>
              ) : messageType === "template" ? (
                getTemplatePreview()
              ) : messageType === "media" ? (
                <div className="space-y-2">
                  {getMediaPreview()}
                  {text && <p className="text-sm">{text}</p>}
                </div>
              ) : messageType === "interactive" ? (
                <div className="space-y-2">
                  <p className="font-medium text-sm">Interactive Message</p>
                  <p className="text-sm">This is an interactive message with buttons or list options.</p>
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    <div className="bg-white text-center rounded p-1 text-xs">Option 1</div>
                    <div className="bg-white text-center rounded p-1 text-xs">Option 2</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Message preview will appear here</p>
              )}
              <p className="text-[10px] text-gray-500 text-right mt-1">Now</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-b-lg p-2 flex items-center justify-between">
          <div className="w-full h-6 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
