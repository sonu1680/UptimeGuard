import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCardProps } from "@/types"
import type { LucideIcon } from "lucide-react"


export function StatsCard({ title, value, icon: Icon, trend, gradient }: StatsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className={`p-2 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {value}
          </div>
          {trend && (
            <div
              className={`text-xs flex items-center ${
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
