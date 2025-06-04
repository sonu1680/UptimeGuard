"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ExternalLink,
  Settings,
  RefreshCw,
  Clock,
  TrendingUp,
  Bell,
  Activity,
  Mail,
  MessageSquare,
  Smartphone,
  Webhook,
} from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


import Link from "next/link";
import { WebsiteStatusBadge } from "@/components/website-status-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ResponseTimeDetailedChart } from "@/components/response-time-detailed-chart";
import { AlertLogItem } from "@/components/alert-log-item";
import { MonitorDetailTYPE } from "@/types";
import { MOCK_MONITOR_DETAILS } from "@/constant";





export default function MonitorDetail() {
  const [monitor] = useState<MonitorDetailTYPE>(MOCK_MONITOR_DETAILS);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const formatLastCheck = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <Smartphone className="h-4 w-4" />;
      case "slack":
        return <MessageSquare className="h-4 w-4" />;
      case "webhook":
        return <Webhook className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* dynamic background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted-foreground)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted-foreground)/0.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <SidebarProvider>
        <div className="flex h-screen w-full relative z-10">
          <DashboardSidebar />
          <SidebarInset className="flex-1 flex flex-col">
            <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 sm:px-6 bg-background/80 backdrop-blur-xl">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-muted/50 p-1 sm:p-2"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Back to Monitors</span>
                    <span className="sm:hidden">Back</span>
                  </Button>
                </Link>
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-sm sm:text-lg">
                      {monitor.favicon}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h1 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent truncate">
                      {monitor.name}
                    </h1>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
                      <span className="truncate">{monitor.url}</span>
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <WebsiteStatusBadge
                  status={monitor.status}
                  className="text-xs"
                />
                <ThemeToggle />
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-background/50 border-border/50 hidden sm:flex"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-background/50 border-border/50 sm:hidden p-2"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <ScrollArea className="flex-1 h-full">
              <main className="space-y-4 sm:space-y-6 p-4 sm:p-6 mb-20">
                {/* Overview Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Current Status
                      </CardTitle>
                      <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                        Online
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last: {formatLastCheck(monitor.lastCheck)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Response Time
                      </CardTitle>
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-lg sm:text-2xl font-bold">
                        {monitor.responseTime}ms
                      </div>
                      <p className="text-xs text-muted-foreground">Avg 24h</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Uptime
                      </CardTitle>
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                        {monitor.uptime}%
                      </div>
                      <p className="text-xs text-muted-foreground">Last 30d</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Check Interval
                      </CardTitle>
                      <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-lg sm:text-2xl font-bold">
                        {monitor.checkInterval}s
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {monitor.location}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* tabs for different sections */}
                <Tabs
                  defaultValue="performance"
                  className="space-y-4 sm:space-y-6"
                >
                  <TabsList className="bg-muted/30 backdrop-blur-sm border border-border/50 w-full sm:w-auto">
                    <TabsTrigger
                      value="performance"
                      className="data-[state=active]:bg-primary/20 text-xs sm:text-sm"
                    >
                      Performance
                    </TabsTrigger>
                    <TabsTrigger
                      value="alerts"
                      className="data-[state=active]:bg-primary/20 text-xs sm:text-sm"
                    >
                      Alert Logs
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="data-[state=active]:bg-primary/20 text-xs sm:text-sm"
                    >
                      Alert Methods
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="performance"
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* time range selector */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-base sm:text-lg font-semibold">
                        Performance Analytics
                      </h2>
                      <div className="flex space-x-2">
                        {(["24h", "7d", "30d"] as const).map((range) => (
                          <Button
                            key={range}
                            variant={
                              timeRange === range ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setTimeRange(range)}
                            className={`${
                              timeRange === range
                                ? "bg-primary/20"
                                : "bg-background/50 border-border/50"
                            } text-xs sm:text-sm px-2 sm:px-3`}
                          >
                            {range.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* response time chart */}
                    <ResponseTimeDetailedChart
                      data={monitor.responseHistory}
                      timeRange={timeRange}
                    />
                  </TabsContent>

                  <TabsContent
                    value="alerts"
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-base sm:text-lg font-semibold">
                        Alert History
                      </h2>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary text-xs w-fit"
                      >
                        {monitor.alertLogs.length} Total Alerts
                      </Badge>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {monitor.alertLogs.map((alert) => (
                        <AlertLogItem key={alert.id} alert={alert} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="settings"
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-base sm:text-lg font-semibold">
                        Alert Methods
                      </h2>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-primary/80 w-full sm:w-auto"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Add Method
                      </Button>
                    </div>

                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      {monitor.alertMethods.map((method, index) => (
                        <Card
                          key={index}
                          className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50"
                        >
                          <CardHeader className="pb-3 p-4 sm:p-6">
                            <CardTitle className="flex items-center justify-between text-sm sm:text-base">
                              <div className="flex items-center space-x-2">
                                {getMethodIcon(method.type)}
                                <span className="capitalize">
                                  {method.type}
                                </span>
                              </div>
                              <Badge
                                className={`text-xs ${
                                  method.enabled
                                    ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
                                }`}
                              >
                                {method.enabled ? "Enabled" : "Disabled"}
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="text-sm text-muted-foreground mb-3 truncate">
                              {method.target}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs"
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs"
                              >
                                Test
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </main>
            </ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
