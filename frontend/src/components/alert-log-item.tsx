import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertLogItemProps } from "@/types"
import { AlertTriangle, CheckCircle, Clock, Mail, MessageSquare, Smartphone } from "lucide-react"


export function AlertLogItem({ alert }: AlertLogItemProps) {
  const getAlertIcon = () => {
    switch (alert.type) {
      case "down":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "up":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "slow":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getMethodIcon = () => {
    switch (alert.method) {
      case "email":
        return <Mail className="h-3 w-3" />
      case "sms":
        return <Smartphone className="h-3 w-3" />
      case "slack":
        return <MessageSquare className="h-3 w-3" />
      case "webhook":
        return <Clock className="h-3 w-3" />
      default:
        return <Mail className="h-3 w-3" />
    }
  }

  const getAlertColor = () => {
    switch (alert.type) {
      case "down":
        return "border-l-red-500 bg-red-500/5"
      case "up":
        return "border-l-green-500 bg-green-500/5"
      case "slow":
        return "border-l-yellow-500 bg-yellow-500/5"
      case "warning":
        return "border-l-orange-500 bg-orange-500/5"
      default:
        return "border-l-muted bg-muted/5"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <Card
      className={`border-l-4 ${getAlertColor()} bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border-border/50`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="mt-0.5">{getAlertIcon()}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-foreground">{alert.message}</span>
                {alert.responseTime && (
                  <Badge variant="outline" className="text-xs">
                    {alert.responseTime}ms
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{formatTimestamp(alert.timestamp)}</span>
                <div className="flex items-center space-x-1">
                  {getMethodIcon()}
                  <span className="capitalize">{alert.method}</span>
                </div>
                {alert.resolved && (
                  <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 text-xs">
                    Resolved
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
