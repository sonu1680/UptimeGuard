import { Badge } from "@/components/ui/badge"
import { STATUS_CONFIG } from "@/constant";
import { WebsiteStatusBadgeProps } from "@/types"


export function WebsiteStatusBadge({ status, className }: WebsiteStatusBadgeProps) {

  const config = STATUS_CONFIG[status];
  const Icon = config.icon

  return (
    <Badge className={`${config.className} shadow-lg backdrop-blur-sm ${className}`}>
      <Icon className={`w-3 h-3 mr-1 ${status === "checking" ? "animate-spin" : ""}`} />
      {config.label}
    </Badge>
  )
}
