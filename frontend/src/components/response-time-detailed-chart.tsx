"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { ResponseTimeDetailedChartProps } from "@/types"


export function ResponseTimeDetailedChart({ data, timeRange }: ResponseTimeDetailedChartProps) {
  const maxValue = Math.max(...data.map((d) => parseInt(d.responseTime)))
  const minValue = Math.min(...data.filter((d) => parseInt(d.responseTime )> 0).map((d) => parseInt(d.responseTime)))
  const avgValue = Math.round(
    data.filter((d) => parseInt(d.responseTime) > 0).reduce((acc, d) => acc + parseInt(d.responseTime), 0) /
      data.filter((d) => parseInt(d.responseTime) > 0).length,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-gradient-to-t from-green-500/60 to-green-500/30"
      case "error":
        return "bg-gradient-to-t from-red-500/60 to-red-500/30"
      case "timeout":
        return "bg-gradient-to-t from-yellow-500/60 to-yellow-500/30"
      default:
        return "bg-gradient-to-t from-primary/60 to-primary/30"
    }
  }

  const formatTimestamp = (timestamp: Date|string) => {
    const date = new Date(timestamp)
    if (timeRange === "24h") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (timeRange === "7d") {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const getTrend = () => {
    if (data.length < 10) return "stable"
    const recent =
      data
        .slice(-5)
        .filter((d) => parseInt(d.responseTime) > 0)
        .reduce((acc, d) => acc + parseInt(d.responseTime), 0) / 5
    const previous =
      data
        .slice(-10, -5)
        .filter((d) => parseInt(d.responseTime) > 0)
        .reduce((acc, d) => acc + parseInt(d.responseTime), 0) / 5

    if (recent > previous * 1.1) return "up"
    if (recent < previous * 0.9) return "down"
    return "stable"
  }

  const trend = getTrend()

  return (
    <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Response Time - {timeRange.toUpperCase()}</span>
          <div className="flex items-center space-x-2">
            {trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
            {trend === "down" && (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
            {trend === "stable" && (
              <Minus className="h-4 w-4 text-muted-foreground" />
            )}
            <Badge variant="outline" className="border-primary/30 text-primary">
              {trend === "up"
                ? "Slower"
                : trend === "down"
                ? "Faster"
                : "Stable"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* chart */}
        <div className="relative h-64 bg-gradient-to-r from-muted/20 to-muted/10 rounded-lg p-4 overflow-hidden">
          <div className="flex items-end justify-between h-full space-x-1">
            {data.map((point, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 h-full justify-end group"
              >
                <div
                  className={`${getStatusColor(
                    point.status || "success"
                  )} hover:opacity-80 transition-all duration-200 rounded-sm min-w-[2px] cursor-pointer relative`}
                  style={{
                    height:
                      parseInt(point.responseTime) > 0
                        ? `${Math.max(
                            (parseInt(point.responseTime) / maxValue) * 100,
                            2
                          )}%`
                        : "2%",
                  }}
                  title={`${formatTimestamp(point.checkAt)}: ${
                  parseInt(point.responseTime) > 0
                      ? `${point.responseTime}ms`
                      : "Timeout"
                  } (${point.status})`}
                >
                  {/* tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background/95 backdrop-blur-sm border border-border/50 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {formatTimestamp(point.checkAt)}
                    <br />
                    {parseInt(point.responseTime) > 0
                      ? `${point.responseTime}ms`
                      : "Timeout"}
                    <br />
                    <span className="capitalize">{point.status||"up|down"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* y-axis label */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground py-4">
            <span>{maxValue}ms</span>
            <span>{Math.round(maxValue / 2)}ms</span>
            <span>0ms</span>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="font-mono font-semibold text-green-600 dark:text-green-400 text-lg">
              {minValue}ms
            </div>
            <div className="text-xs text-muted-foreground">Minimum</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="font-mono font-semibold text-primary text-lg">
              {avgValue}ms
            </div>
            <div className="text-xs text-muted-foreground">Average</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="font-mono font-semibold text-orange-600 dark:text-orange-400 text-lg">
              {maxValue}ms
            </div>
            <div className="text-xs text-muted-foreground">Maximum</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="font-mono font-semibold text-blue-600 dark:text-blue-400 text-lg">
              {Math.round(
                (data.filter((d) => d.status === "success").length /
                  data.length) *
                  100
              )}
              %
            </div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* time range labels */}
        <div className="flex justify-between text-xs text-muted-foreground px-4">
          <span>
            {formatTimestamp(data[0]?.checkAt || new Date().toISOString())}
          </span>
          <span>
            {formatTimestamp(
              data[data.length - 1]?.checkAt || new Date().toISOString()
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
