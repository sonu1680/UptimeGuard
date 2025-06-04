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





export const MENU_ITEMS = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: BarChart3,
    description: "System overview",
  },
  {
    title: "Monitors",
    url: "/dashboard",
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