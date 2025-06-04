"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Activity, BarChart3, Settings, Globe, Bell, Users, LogOut, Zap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MENU_ITEMS } from "@/constant"
import { toast } from "sonner"
import { useAuth } from "@/providers/authProvider"
import { signOut } from "next-auth/react"


export function DashboardSidebar() {
const {user}=useAuth()
  return (
    <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="group">
              <Link
                href="/dashboard"
                className="hover:bg-primary/10 transition-all duration-300"
              >
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                  <Activity className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    UptimeGuard
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Dashboard
                  </span>
                </div>
                <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                  Pro
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => toast("Welcome To Dashboard!")}
                    asChild
                    isActive={item.isActive}
                    className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-primary/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 data-[active=true]:border-primary/20"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 p-3"
                    >
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          item.isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        <item.icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </div>
                      </div>

                      {item.isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-r-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 bg-gradient-to-r from-muted/20 to-transparent p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="group">
              <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer">
                <Avatar className="h-10 w-10 rounded-xl border-2 border-primary/20">
                  <AvatarImage
                    src={user?.image}
                    alt="User"
                  />
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
                <LogOut  onClick={(async()=>await signOut({callbackUrl:"/"}))} className="ml-auto hover:text-red-600 size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
