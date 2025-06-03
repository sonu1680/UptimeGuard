import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

interface WebsiteStatusBadgeProps {
  status: "online" | "offline" | "warning" | "checking"
  className?: string
}

export function WebsiteStatusBadge({ status, className }: WebsiteStatusBadgeProps) {
  const statusConfig = {
    online: {
      icon: CheckCircle,
      label: "Online",
      className: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 shadow-green-500/10",
    },
    offline: {
      icon: XCircle,
      label: "Offline",
      className: "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30 shadow-red-500/10",
    },
    warning: {
      icon: AlertCircle,
      label: "Warning",
      className: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30 shadow-yellow-500/10",
    },
    checking: {
      icon: Clock,
      label: "Checking",
      className: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30 shadow-blue-500/10",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge className={`${config.className} shadow-lg backdrop-blur-sm ${className}`}>
      <Icon className={`w-3 h-3 mr-1 ${status === "checking" ? "animate-spin" : ""}`} />
      {config.label}
    </Badge>
  )
}
