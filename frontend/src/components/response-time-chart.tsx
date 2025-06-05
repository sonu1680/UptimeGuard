"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponseTimeChartProps } from "@/types"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"


export function ResponseTimeChart({ data, siteName, status }: ResponseTimeChartProps) {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const avgValue = Math.round(data.reduce((a, b) => a + b, 0) / data.length)

  const getResponseTimeTrend = () => {
    if (data.length < 2) return "stable"
    const recent = data.slice(-3).reduce((a, b) => a + b, 0) / 3
    const previous = data.slice(-6, -3).reduce((a, b) => a + b, 0) / 3

    if (recent > previous * 1.1) return "up"
    if (recent < previous * 0.9) return "down"
    return "stable"
  }

  const trend = getResponseTimeTrend()

  const getStatusGradient = () => {
    switch (status) {
      case "online":
        return "from-green-500/20 to-green-500/5"
      case "offline":
        return "from-red-500/20 to-red-500/5"
    
      default:
        return "from-blue-500/20 to-blue-500/5"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="truncate">{siteName}</span>
          <div className="flex items-center space-x-1">
            {trend === "up" && <TrendingUp className="h-3 w-3 text-red-500" />}
            {trend === "down" && <TrendingDown className="h-3 w-3 text-green-500" />}
            {trend === "stable" && <Minus className="h-3 w-3 text-muted-foreground" />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`relative h-16 bg-gradient-to-r ${getStatusGradient()} rounded-lg p-2 overflow-hidden`}>
          <div className="flex items-end space-x-1 h-full">
            {data.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-primary/60 to-primary/30 hover:from-primary/80 hover:to-primary/50 transition-all duration-200 rounded-sm flex-1 min-w-[2px] group-hover:shadow-sm"
                style={{
                  height: `${Math.max((value / maxValue) * 100, 5)}%`,
                }}
                title={`${value}ms`}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="font-mono font-semibold text-green-600 dark:text-green-400">{minValue}ms</div>
            <div className="text-muted-foreground">Min</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="font-mono font-semibold text-primary">{avgValue}ms</div>
            <div className="text-muted-foreground">Avg</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="font-mono font-semibold text-orange-600 dark:text-orange-400">{maxValue}ms</div>
            <div className="text-muted-foreground">Max</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
