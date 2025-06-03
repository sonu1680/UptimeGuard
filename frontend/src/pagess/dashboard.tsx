"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  MoreHorizontal,
  ExternalLink,
  Edit,
  Trash2,
  RefreshCw,
  Filter,
  BarChart3,
  Globe,
  AlertTriangle,
  Clock,
  Sparkles,
  TrendingUp,
  Eye,
} from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { StatsCard } from "@/components/stats-card";
import { WebsiteStatusBadge } from "@/components/website-status-badge";
import { ResponseTimeChart } from "@/components/response-time-chart";


interface Website {
  id: string;
  name: string;
  url: string;
  status: "online" | "offline" | "warning" | "checking";
  responseTime: number;
  lastCheck: string;
  uptime: number;
  responseHistory: number[];
  favicon?: string;
}

// Mock data - Extended with more entries to test scrolling
const mockWebsites: Website[] = [
  {
    id: "1",
    name: "Company Website",
    url: "https://company.com",
    status: "online",
    responseTime: 245,
    lastCheck: "2024-01-15T10:30:00Z",
    uptime: 99.98,
    responseHistory: [
      245, 230, 267, 189, 234, 256, 198, 245, 267, 234, 189, 245,
    ],
    favicon: "🌐",
  },
  {
    id: "2",
    name: "API Gateway",
    url: "https://api.company.com",
    status: "online",
    responseTime: 89,
    lastCheck: "2024-01-15T10:29:45Z",
    uptime: 99.95,
    responseHistory: [89, 95, 78, 102, 87, 91, 85, 89, 94, 88, 92, 89],
    favicon: "⚡",
  },
  {
    id: "3",
    name: "Documentation",
    url: "https://docs.company.com",
    status: "warning",
    responseTime: 1250,
    lastCheck: "2024-01-15T10:29:30Z",
    uptime: 98.5,
    responseHistory: [
      1250, 1180, 1340, 1200, 1290, 1150, 1380, 1250, 1200, 1300, 1180, 1250,
    ],
    favicon: "📚",
  },
  {
    id: "4",
    name: "Blog",
    url: "https://blog.company.com",
    status: "offline",
    responseTime: 0,
    lastCheck: "2024-01-15T10:25:00Z",
    uptime: 95.2,
    responseHistory: [0, 0, 0, 450, 423, 467, 445, 0, 0, 0, 0, 0],
    favicon: "📝",
  },
  {
    id: "5",
    name: "CDN Endpoint",
    url: "https://cdn.company.com",
    status: "online",
    responseTime: 45,
    lastCheck: "2024-01-15T10:30:15Z",
    uptime: 99.99,
    responseHistory: [45, 42, 48, 39, 44, 46, 41, 45, 47, 43, 40, 45],
    favicon: "🚀",
  },
  {
    id: "6",
    name: "Payment Gateway",
    url: "https://payments.company.com",
    status: "checking",
    responseTime: 156,
    lastCheck: "2024-01-15T10:30:20Z",
    uptime: 99.92,
    responseHistory: [
      156, 148, 162, 145, 159, 151, 164, 156, 149, 158, 152, 156,
    ],
    favicon: "💳",
  },
  {
    id: "7",
    name: "Mobile App API",
    url: "https://mobile-api.company.com",
    status: "online",
    responseTime: 123,
    lastCheck: "2024-01-15T10:30:10Z",
    uptime: 99.87,
    responseHistory: [
      123, 118, 134, 120, 129, 115, 138, 123, 120, 130, 118, 123,
    ],
    favicon: "📱",
  },
  {
    id: "8",
    name: "Admin Dashboard",
    url: "https://admin.company.com",
    status: "online",
    responseTime: 567,
    lastCheck: "2024-01-15T10:29:55Z",
    uptime: 99.76,
    responseHistory: [
      567, 580, 534, 590, 529, 615, 538, 567, 520, 580, 518, 567,
    ],
    favicon: "⚙️",
  },
  {
    id: "9",
    name: "Customer Portal",
    url: "https://portal.company.com",
    status: "warning",
    responseTime: 2340,
    lastCheck: "2024-01-15T10:29:40Z",
    uptime: 97.8,
    responseHistory: [
      2340, 2180, 2540, 2200, 2390, 2150, 2580, 2340, 2200, 2400, 2180, 2340,
    ],
    favicon: "👥",
  },
  {
    id: "10",
    name: "Analytics Service",
    url: "https://analytics.company.com",
    status: "online",
    responseTime: 78,
    lastCheck: "2024-01-15T10:30:05Z",
    uptime: 99.94,
    responseHistory: [78, 82, 74, 85, 77, 81, 75, 78, 84, 73, 80, 78],
    favicon: "📊",
  },
  {
    id: "11",
    name: "File Storage",
    url: "https://files.company.com",
    status: "online",
    responseTime: 234,
    lastCheck: "2024-01-15T10:29:50Z",
    uptime: 99.89,
    responseHistory: [
      234, 228, 247, 219, 234, 256, 218, 234, 247, 224, 219, 234,
    ],
    favicon: "📁",
  },
  {
    id: "12",
    name: "Email Service",
    url: "https://mail.company.com",
    status: "checking",
    responseTime: 445,
    lastCheck: "2024-01-15T10:30:25Z",
    uptime: 99.67,
    responseHistory: [
      445, 438, 467, 429, 445, 456, 428, 445, 467, 434, 429, 445,
    ],
    favicon: "📧",
  },
];

export default function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredWebsites = websites.filter((website) => {
    const matchesSearch =
      website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || website.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleAddWebsite = () => {
    if (newWebsite.name && newWebsite.url) {
      const website: Website = {
        id: Date.now().toString(),
        name: newWebsite.name,
        url: newWebsite.url,
        status: "checking",
        responseTime: 0,
        lastCheck: new Date().toISOString(),
        uptime: 100,
        responseHistory: [],
        favicon: "🌐",
      };
      setWebsites([...websites, website]);
      setNewWebsite({ name: "", url: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteWebsite = (id: string) => {
    setWebsites(websites.filter((w) => w.id !== id));
  };

  const overallStats = {
    total: websites.length,
    online: websites.filter((w) => w.status === "online").length,
    offline: websites.filter((w) => w.status === "offline").length,
    warning: websites.filter((w) => w.status === "warning").length,
    avgResponseTime: Math.round(
      websites
        .filter((w) => w.responseTime > 0)
        .reduce((acc, w) => acc + w.responseTime, 0) /
        websites.filter((w) => w.responseTime > 0).length
    ),
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* dynamic Background */}
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
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg sm:rounded-xl">
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent truncate">
                      Website Monitors
                    </h1>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      Real-time monitoring dashboard
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 text-xs sm:text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  <span className="hidden sm:inline">
                    All Systems Operational
                  </span>
                  <span className="sm:hidden">Online</span>
                </Badge>
                <ThemeToggle />
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 group text-xs sm:text-sm px-2 sm:px-4"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      <span className="hidden sm:inline">Add Monitor</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-border/50 mx-4">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span>Add New Monitor</span>
                      </DialogTitle>
                      <DialogDescription>
                        Add a new website or API endpoint to monitor for uptime
                        and performance.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Display Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="My Website"
                          value={newWebsite.name}
                          onChange={(e) =>
                            setNewWebsite({
                              ...newWebsite,
                              name: e.target.value,
                            })
                          }
                          className="bg-muted/50 border-border/50 focus:border-primary/50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="url" className="text-sm font-medium">
                          URL
                        </Label>
                        <Input
                          id="url"
                          placeholder="https://example.com"
                          value={newWebsite.url}
                          onChange={(e) =>
                            setNewWebsite({
                              ...newWebsite,
                              url: e.target.value,
                            })
                          }
                          className="bg-muted/50 border-border/50 focus:border-primary/50"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={handleAddWebsite}
                        className="bg-gradient-to-r from-primary to-primary/80"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Monitor
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </header>

            {/* scrollable main content */}
            <ScrollArea className="flex-1 h-full">
              <main className="space-y-4 sm:space-y-6 p-4 sm:p-6 mb-20">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <StatsCard
                    title="Total Monitors"
                    value={overallStats.total}
                    icon={BarChart3}
                    gradient="from-blue-500 to-blue-600"
                    trend={{ value: 12, isPositive: true }}
                  />
                  <StatsCard
                    title="Online"
                    value={overallStats.online}
                    icon={Globe}
                    gradient="from-green-500 to-green-600"
                    trend={{ value: 2.1, isPositive: true }}
                  />
                  <StatsCard
                    title="Issues"
                    value={overallStats.offline + overallStats.warning}
                    icon={AlertTriangle}
                    gradient="from-red-500 to-red-600"
                    trend={{ value: 1.2, isPositive: false }}
                  />
                  <StatsCard
                    title="Avg Response"
                    value={`${overallStats.avgResponseTime}ms`}
                    icon={Clock}
                    gradient="from-purple-500 to-purple-600"
                    trend={{ value: 5.4, isPositive: false }}
                  />
                </div>

                {/* filters and search */}
                <Card className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search monitors..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 text-sm"
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/50 border-border/50 hover:bg-muted/50 text-xs sm:text-sm"
                          >
                            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">
                              Status:{" "}
                              {statusFilter === "all" ? "All" : statusFilter}
                            </span>
                            <span className="sm:hidden">
                              {statusFilter === "all" ? "All" : statusFilter}
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-background/95 backdrop-blur-xl border-border/50"
                        >
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("all")}
                          >
                            All Statuses
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("online")}
                          >
                            Online
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("offline")}
                          >
                            Offline
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("warning")}
                          >
                            Warning
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("checking")}
                          >
                            Checking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>

                {/* monitors table */}
                <Card className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border/50">
                  <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent p-3 sm:p-6">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <span className="text-sm sm:text-base">
                          Monitors ({filteredWebsites.length})
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary text-xs"
                      >
                        Live Data
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* mobile card view */}
                    <div className="block sm:hidden">
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-3 p-4">
                          {filteredWebsites.map((website) => (
                            <Card
                              key={website.id}
                              className="bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                              onClick={() =>
                                window.open(`/monitor/${website.id}`, "_blank")
                              }
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-lg">
                                        {website.favicon}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                      <div className="font-semibold text-foreground truncate">
                                        {website.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground truncate">
                                        {website.url}
                                      </div>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0 hover:bg-muted/50"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="bg-background/95 backdrop-blur-xl border-border/50"
                                    >
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuItem
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(
                                            `/monitor/${website.id}`,
                                            "_blank"
                                          );
                                        }}
                                      >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Monitor
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteWebsite(website.id);
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <div className="text-muted-foreground mb-1">
                                      Status
                                    </div>
                                    <WebsiteStatusBadge
                                      status={website.status}
                                    />
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground mb-1">
                                      Response
                                    </div>
                                    <span className="font-mono font-semibold">
                                      {website.responseTime > 0
                                        ? `${website.responseTime}ms`
                                        : "—"}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground mb-1">
                                      Uptime
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-mono font-semibold">
                                        {website.uptime}%
                                      </span>
                                      <div className="w-12 h-2 bg-muted/50 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full rounded-full transition-all duration-500 ${
                                            website.uptime >= 99.5
                                              ? "bg-gradient-to-r from-green-500 to-green-400"
                                              : website.uptime >= 95
                                              ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                                              : "bg-gradient-to-r from-red-500 to-red-400"
                                          }`}
                                          style={{
                                            width: `${website.uptime}%`,
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground mb-1">
                                      Last Check
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-medium">
                                        {formatLastCheck(website.lastCheck)}
                                      </span>
                                      {website.status === "checking" && (
                                        <RefreshCw className="h-3 w-3 animate-spin text-primary" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* desktop table view */}
                    <div className="hidden sm:block">
                      <ScrollArea className="h-[400px] w-full">
                        <Table>
                          <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                            <TableRow className="border-border/50 hover:bg-muted/20">
                              <TableHead className="font-semibold">
                                Website
                              </TableHead>
                              <TableHead className="font-semibold">
                                Status
                              </TableHead>
                              <TableHead className="font-semibold">
                                Response Time
                              </TableHead>
                              <TableHead className="font-semibold">
                                Uptime
                              </TableHead>
                              <TableHead className="font-semibold">
                                Last Check
                              </TableHead>
                              <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredWebsites.map((website) => (
                              <TableRow
                                key={website.id}
                                className="border-border/50 hover:bg-muted/20 transition-colors duration-200 group cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    `/monitor/${website.id}`,
                                    "_blank"
                                  )
                                }
                              >
                                <TableCell>
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-lg">
                                        {website.favicon}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {website.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground flex items-center group-hover:text-foreground/70 transition-colors">
                                        {website.url}
                                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <WebsiteStatusBadge status={website.status} />
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-mono font-semibold">
                                      {website.responseTime > 0
                                        ? `${website.responseTime}ms`
                                        : "—"}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-3">
                                    <span className="font-mono font-semibold">
                                      {website.uptime}%
                                    </span>
                                    <div className="w-20 h-2 bg-muted/50 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                          website.uptime >= 99.5
                                            ? "bg-gradient-to-r from-green-500 to-green-400"
                                            : website.uptime >= 95
                                            ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                                            : "bg-gradient-to-r from-red-500 to-red-400"
                                        }`}
                                        style={{ width: `${website.uptime}%` }}
                                      />
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">
                                      {formatLastCheck(website.lastCheck)}
                                    </span>
                                    {website.status === "checking" && (
                                      <RefreshCw className="h-3 w-3 animate-spin text-primary" />
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0 hover:bg-muted/50"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="bg-background/95 backdrop-blur-xl border-border/50"
                                    >
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuItem
                                        className="hover:bg-muted/50"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(
                                            `/monitor/${website.id}`,
                                            "_blank"
                                          );
                                        }}
                                      >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="hover:bg-muted/50">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Monitor
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="hover:bg-muted/50">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Visit Site
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-red-600 hover:bg-red-500/10"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteWebsite(website.id);
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

         
              </main>
            </ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
