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
  
  status?: "online" | "offline" | "checking";

}



export interface MonitorDetailView {
  id: string;
  monitorId: string;
  websiteName: string;
  url: string;
  icon: string | null;
  createAt: string;
  location: string;
  isPaused: boolean;
  checkInterval: string;
  lastCheckAt: Date;
  status: "online" | "offline" |"checking";
  responseTime: string;
  uptime: string;
  userId: string;
  alertLogs: any[];
  notification: {
    id: string;
    emailId: string;
    telegramId: string;
    monitorId: string;
    isEmail?:boolean;
    isTelegram?:boolean
  } ;
  responseLog: Array<{
    id: string;
    responseTime: string;
    responseCode: string;
    checkAt: string;
    monitorId: string;
  }>;
}


export interface SocialButtonProps {
  icon: LucideIcon;
  provider: string;
  onClick?: () => void;
  className?: string;
  isLoading?:Boolean
}
export interface NewWebsite {
  websiteName: string | null;
  url: string | null;
  emailId: string | null;
  telegramId: string | null;
  checkInterval: string | null;
}
export interface updateWebsite {
  monitorId: string;
  websiteName: string | null;
  url: string | null;
  emailId: string | null;
  telegramId: string | null;
  checkInterval: string | null;
  isTelegram?: boolean;
  isEmail?: boolean;
  closeDialog?:()=>void;
}

export interface AlertLog {
  id: string;
  monitorId: string;
  sentAt: Date;
  msg: string;
  alertType: "EMAIL" | "TELEGRAM" | string; 
  responseTime: string;
  responseCode: string;
  status: "online" | "offline" | "checking" |string;
  errorMsg: string;
}



export interface AlertLogItemProps {
  alert: AlertLog;
}
  

export interface ResponseTimeChartProps {
  data: number[];
  siteName: string;
  status: "online" | "offline"  | "checking";
}
  

export interface ResponseTimeDetailedChartProps {
  data: Array<{
    checkAt: Date|string;
    responseTime: string;
    responseCode:string;
    monitorId:string;
    id:string
    status?: "offline"|"online"|"checking";
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
  status: "online" | "offline"  | "checking";
  className?: string;
}