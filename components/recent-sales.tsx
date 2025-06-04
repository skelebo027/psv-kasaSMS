import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>FM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Flash Marketing</p>
          <p className="text-sm text-muted-foreground">Promotional SMS Campaign</p>
        </div>
        <div className="ml-auto font-medium">+1,250 SMS</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Tech Solutions</p>
          <p className="text-sm text-muted-foreground">Email Newsletter</p>
        </div>
        <div className="ml-auto font-medium">+5,000 Emails</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>GS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Global Services</p>
          <p className="text-sm text-muted-foreground">Voice Notifications</p>
        </div>
        <div className="ml-auto font-medium">+750 Calls</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Retail Store</p>
          <p className="text-sm text-muted-foreground">WhatsApp Promotions</p>
        </div>
        <div className="ml-auto font-medium">+320 Messages</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>HS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Health Services</p>
          <p className="text-sm text-muted-foreground">Appointment Reminders</p>
        </div>
        <div className="ml-auto font-medium">+890 SMS</div>
      </div>
    </div>
  )
}
