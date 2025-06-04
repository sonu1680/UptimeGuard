import { LucideIcon } from "lucide-react";


 interface responseLog{
  id:string,
  responseTime:string,
  lastCheckAt:Date,
 monitorId:string
 }
 interface alertLog{
  id:string,
  msg:string,
  alertType:string,
  sentAt:Date

 }
export interface Website {
  monitorId: string;
  websiteName: string;
  url: string;
  createdAt:Date,
  isPaused:boolean,
  checkInterval:string,
  lastCheckAt:Date,
  responseLogs: responseLog[];
  alertLogs:alertLog[]
  responseTime:string
  uptime:string
  icon?:string
  
  status?: "UP" | "DOWN" | "warning" | "checking";

}

export interface AlertLog {
  id: string;
  type: "down" | "up" | "slow" | "warning";
  message: string;
  timestamp: string;
  method: "email" | "sms" | "slack" | "webhook";
  resolved: boolean;
  responseTime?: number;
}

export interface MonitorDetailTYPE {
  id: string;
  name: string;
  url: string;
  status: "online" | "offline" | "warning" | "checking";
  responseTime: number;
  lastCheck: string;
  uptime: number;
  favicon: string;
  location: string;
  checkInterval: number;
  alertMethods: Array<{
    type: "email" | "sms" | "slack" | "webhook";
    target: string;
    enabled: boolean;
  }>;
  responseHistory: Array<{
    timestamp: string;
    responseTime: number;
    status: "success" | "error" | "timeout";
  }>;
  alertLogs: AlertLog[];
}


export interface SocialButtonProps {
  icon: LucideIcon;
  provider: string;
  onClick?: () => void;
  className?: string;
}
  

export interface AlertLog {
  id: string;
  type: "down" | "up" | "slow" | "warning";
  message: string;
  timestamp: string;
  method: "email" | "sms" | "slack" | "webhook";
  resolved: boolean;
  responseTime?: number;
}

export interface AlertLogItemProps {
  alert: AlertLog;
}
  

export interface ResponseTimeChartProps {
  data: number[];
  siteName: string;
  status: "online" | "offline" | "warning" | "checking";
}
  

export interface ResponseTimeDetailedChartProps {
  data: Array<{
    timestamp: string;
    responseTime: number;
    status: "success" | "error" | "timeout";
  }>;
  timeRange: "24h" | "7d" | "30d";
}
  
export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: string;
}
  

export interface WebsiteStatusBadgeProps {
  status: "online" | "offline" | "warning" | "checking"|"UP"|"DOWN";
  className?: string;
}