"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Activity, ChevronDown, Menu, X, Zap, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-border shadow-2xl shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Activity className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-all duration-300"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            UptimeGuard
          </span>
        </Link>

        {/* desktop navigation */}
        <nav className="hidden lg:flex ml-12 space-x-8">
          <div className="relative group">
            <Link
              href="#"
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 py-2"
            >
              <span>Platform</span>
              <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            <div className="absolute top-full left-0 w-56 bg-background/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2">
              <div className="p-2">
                <Link
                  href="#"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-colors group/item"
                >
                  <Activity className="h-5 w-5 text-primary group-hover/item:scale-110 transition-transform duration-200" />
                  <div>
                    <div className="text-sm font-medium">Website Monitoring</div>
                    <div className="text-xs text-muted-foreground">Monitor your websites 24/7</div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-colors group/item"
                >
                  <Zap className="h-5 w-5 text-primary group-hover/item:scale-110 transition-transform duration-200" />
                  <div>
                    <div className="text-sm font-medium">API Monitoring</div>
                    <div className="text-xs text-muted-foreground">Track API performance</div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-colors group/item"
                >
                  <BarChart3 className="h-5 w-5 text-primary group-hover/item:scale-110 transition-transform duration-200" />
                  <div>
                    <div className="text-sm font-medium">Analytics</div>
                    <div className="text-xs text-muted-foreground">Detailed insights & reports</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group py-2"
          >
            Documentation
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group py-2"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <div className="relative group">
            <Link
              href="#"
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 py-2"
            >
              <span>Resources</span>
              <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            <div className="absolute top-full left-0 w-48 bg-background/95 dark:bg-slate-900/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2">
              <div className="p-2">
                <Link
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm">Security</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Blog</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/auth"
            className="hidden lg:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Sign in
          </Link>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 border-0"
          >
            <span className="relative z-10">Start Free</span>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-border transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="px-4 py-6 space-y-4">
          <Link
            href="#"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Platform
          </Link>
          <Link
            href="#"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Documentation
          </Link>
          <Link
            href="#"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Resources
          </Link>
          <div className="pt-4 border-t border-border">
            <Link
              href="#"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Sign in
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
