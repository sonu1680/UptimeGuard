import { MonitorDetailTYPE, Website } from "@/types";
import {
  Activity,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export const MOCK_WEBSITE: Website[] = [
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


export const COMPANIES = [
  "Acme Corp",
  "TechFlow",
  "DataSync",
  "CloudBase",
  "DevTools",
  "AppStack",
  "WebCore",
  "SysOps",
];

export const FEATURES = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description:
      "Monitor your websites and APIs 24/7 with sub-second precision and instant notifications when issues arise.",
    gradient: "from-purple-500 to-pink-500",
    stats: "99.9% accuracy",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with SOC2 compliance, encrypted data transmission, and secure monitoring infrastructure.",
    gradient: "from-blue-500 to-cyan-500",
    stats: "SOC2 certified",
  },
  {
    icon: Zap,
    title: "Lightning Alerts",
    description:
      "Multi-channel notifications via email, SMS, Slack, Discord, Teams, and 50+ other integrations.",
    gradient: "from-yellow-500 to-orange-500",
    stats: "<30s response",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Monitor from 15+ locations worldwide with intelligent routing, failover detection, and regional insights.",
    gradient: "from-green-500 to-emerald-500",
    stats: "15+ locations",
  },
];

export const STATS = [
  {
    icon: BarChart3,
    value: "99.99%",
    label: "Uptime Guaranteed",
    color: "text-green-500",
  },
  {
    icon: Clock,
    value: "<30s",
    label: "Alert Response",
    color: "text-blue-500",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Happy Customers",
    color: "text-purple-500",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Global Locations",
    color: "text-orange-500",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    content:
      "UptimeGuard helped us achieve 99.99% uptime. The alerts are instant and the dashboard is incredibly intuitive.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Marcus Rodriguez",
    role: "DevOps Lead at DataSync",
    content:
      "Best monitoring solution we've used. The global monitoring network caught issues our previous tool missed.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Watson",
    role: "Engineering Manager at CloudBase",
    content:
      "The AI-powered insights have been game-changing. We now prevent outages before they happen.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export const INTEGRATION = [
  { name: "Slack", icon: "💬" },
  { name: "Discord", icon: "🎮" },
  { name: "Teams", icon: "👥" },
  { name: "PagerDuty", icon: "📟" },
  { name: "Webhook", icon: "🔗" },
  { name: "Email", icon: "📧" },
];



export const MOCK_MONITOR_DETAILS: MonitorDetailTYPE = {
  id: "1",
  name: "Company Website",
  url: "https://company.com",
  status: "online",
  responseTime: 245,
  lastCheck: "2024-01-15T10:30:00Z",
  uptime: 99.98,
  favicon: "🌐",
  location: "New York, US",
  checkInterval: 60,
  alertMethods: [
    { type: "email", target: "admin@company.com", enabled: true },
    { type: "slack", target: "#alerts", enabled: true },
    { type: "sms", target: "+1234567890", enabled: false },
    {
      type: "webhook",
      target: "https://hooks.company.com/alerts",
      enabled: true,
    },
  ],
  responseHistory: Array.from({ length: 48 }, (_, i) => ({
    timestamp: new Date(Date.now() - (47 - i) * 30 * 60 * 1000).toISOString(),
    responseTime: Math.floor(Math.random() * 300) + 150,
    status:
      Math.random() > 0.95
        ? Math.random() > 0.5
          ? "error"
          : "timeout"
        : ("success" as "success" | "error" | "timeout"),
  })),
  alertLogs: [
    {
      id: "1",
      type: "down",
      message: "Website is down - Connection timeout",
      timestamp: "2024-01-15T08:15:00Z",
      method: "email",
      resolved: true,
      responseTime: 0,
    },
    {
      id: "2",
      type: "up",
      message: "Website is back online",
      timestamp: "2024-01-15T08:18:00Z",
      method: "slack",
      resolved: true,
      responseTime: 234,
    },
    {
      id: "3",
      type: "slow",
      message: "Response time is slower than usual",
      timestamp: "2024-01-15T06:45:00Z",
      method: "email",
      resolved: true,
      responseTime: 2340,
    },
    {
      id: "4",
      type: "warning",
      message: "SSL certificate expires in 30 days",
      timestamp: "2024-01-14T12:00:00Z",
      method: "webhook",
      resolved: false,
    },
    {
      id: "5",
      type: "up",
      message: "Website recovered from maintenance",
      timestamp: "2024-01-14T09:30:00Z",
      method: "slack",
      resolved: true,
      responseTime: 189,
    },
  ],
};

export const MENU_ITEMS = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: BarChart3,
    description: "System overview",
  },
  {
    title: "Monitors",
    url: "/monitor/1",
    icon: Globe,
    isActive: false,
    description: "Website monitoring",
  },
];
  
export const STATUS_CONFIG = {
  online: {
    icon: CheckCircle,
    label: "Online",
    className:
      "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 shadow-green-500/10",
  },
  offline: {
    icon: XCircle,
    label: "Offline",
    className:
      "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30 shadow-red-500/10",
  },
  warning: {
    icon: AlertCircle,
    label: "Warning",
    className:
      "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30 shadow-yellow-500/10",
  },
  checking: {
    icon: Clock,
    label: "Checking",
    className:
      "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30 shadow-blue-500/10",
  },
};