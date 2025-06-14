"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { MonitorDetailView } from "@/types";
import { useParams } from "next/navigation";
import { useData } from "@/providers/websiteProvider";
import axios from "axios";
import { toast } from "sonner";
import LoadingPage from "@/components/loadingPage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateSiteDialog from "@/components/updateSiteDialog";

export default function MonitorDetail() {
  const [monitor, setMonitor] = useState<MonitorDetailView | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const params = useParams();
  const monitorId = params.id;

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getDetailView?monitorid=${monitorId}`
    );
    // console.log(res.data?.data?.data)
    setMonitor(res.data?.data?.data);
  };

  useEffect(() => {
    if (monitorId) {
      getData();
    }
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [monitorId]);

  const formatLastCheck = (timestamp: Date) => {
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
      case "telegram":
        return <Smartphone className="h-4 w-4" />;

      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  if (!monitor) {
    return <LoadingPage />;
  }

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
                    <AvatarImage src={monitor.icon || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-sm sm:text-lg">
                      {monitor.websiteName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h1 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent truncate">
                      {monitor.websiteName}
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
                  status={monitor.status || "checking"}
                  className="text-xs"
                />
                <ThemeToggle />

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
                      <div
                        className={`text-lg sm:text-2xl font-bold ${
                          monitor.status === "online"
                            ? "text-green-600 dark:text-green-400"
                            : monitor.status === "offline"
                            ? "text-red-600 dark:text-red-400"
                            : "text-yellow-600 dark:yellow-red-400"
                        }`}
                      >
                        {monitor.status || "checking"}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Last: {formatLastCheck(monitor.lastCheckAt)}
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
                      <p className="text-xs text-muted-foreground">
                        Last check
                      </p>
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
                      {/* <p className="text-xs text-muted-foreground">Last 30d</p> */}
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Check Interval
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-lg sm:text-2xl font-bold">
                        {parseInt(monitor.checkInterval) < 60
                          ? `${monitor.checkInterval} Min`
                          : parseInt(monitor.checkInterval) < 1440
                          ? "1 Hr"
                          : "1 D"}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {monitor.location || "India"}
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
                        {(["24h"] as const).map((range) => (
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
                      data={monitor.responseLog}
                      timeRange={"24h"}
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
                        onClick={() => toast("comming soon!")}
                        size="sm"
                        className="bg-gradient-to-r from-primary to-primary/80 w-full sm:w-auto"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Add Method
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      {["emailId", "telegramId"].map((method, index) => {
                        const methodValue =
                          monitor?.notification?.[
                            method as "emailId" | "telegramId"
                          ];

                        return (
                          <Card
                            key={index}
                            className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50"
                          >
                            <CardHeader className="pb-3 p-4 sm:p-6">
                              <CardTitle className="flex items-center justify-between text-sm sm:text-base">
                                <div className="flex items-center space-x-2">
                                  {getMethodIcon(method)}
                                  <span className="capitalize">{method}</span>
                                </div>
                                <Badge
                                  className={`text-xs ${
                                    methodValue
                                      ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
                                      : "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
                                  }`}
                                >
                                  {methodValue ? "Enabled" : "Disabled"}
                                </Badge>
                              </CardTitle>
                            </CardHeader>

                            <CardContent className="p-4 sm:p-6 pt-0">
                              <div className="text-sm text-muted-foreground mb-3 truncate">
                                {methodValue || "Not configured"}
                              </div>
                              <div className="flex space-x-2">
                                <Dialog
                                  open={isAddDialogOpen}
                                  onOpenChange={setIsAddDialogOpen}
                                >
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex-1 text-xs"
                                    >
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <UpdateSiteDialog
                                    monitorId={monitor.monitorId}
                                    emailId={monitor.notification.emailId}
                                    telegramId={monitor.notification.telegramId}
                                    checkInterval={monitor.checkInterval}
                                    url={monitor.url}
                                    websiteName={monitor.websiteName}
                                    isEmail={monitor.notification.isEmail}
                                    isTelegram={monitor.notification.isTelegram}
                                    closeDialog={() =>
                                      setIsAddDialogOpen(false)
                                    }
                                  />
                                </Dialog>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
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
