"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,

  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Bell,
  Eye,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { COMPANIES, FEATURES, INTEGRATION, STATS, TESTIMONIALS } from "@/constant";
import { useRouter } from "next/navigation";

export default function UptimeMonitorLanding() {
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
const router=useRouter()
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);





  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative transition-colors duration-300">
      {/* dynamic background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        {/* animated mesh gradient */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
          }}
        />

        {/* grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted-foreground)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted-foreground)/0.03)_1px,transparent_1px)] bg-[size:72px_72px]"></div>

        {/* floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-r from-primary/5 to-primary/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navbar />

      <main className="relative z-10 pt-14 sm:pt-16">
        {/* hero section */}
        <section className="px-4 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 group hover:border-primary/30 transition-all duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-primary">
                All systems operational
              </span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                Monitor everything.
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Miss nothing.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Next-generation uptime monitoring with AI-powered insights and
              predictive analytics.
              <span className="text-foreground font-medium">
                {" "}
                Get alerted before your users notice issues.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg mx-auto mb-6 sm:mb-8 px-4">
              <div className="relative flex-1 w-full group">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50 backdrop-blur-sm border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 h-11 sm:h-12 pr-4 group-hover:border-primary/50 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-md blur opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>
              <Button
                size="lg"
                onClick={() => router.push("/auth")}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 h-11 sm:h-12 px-6 sm:px-8 group w-full sm:w-auto"
              >
                <span className="mr-2">Start Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* stats section */}
        <section className="px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm border border-border rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                    <stat.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* companies section */}
        <section className="px-4 py-12 sm:py-16 border-y border-border bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-xs sm:text-sm">
              Trusted by engineering teams at leading companies worldwide
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 items-center">
              {COMPANIES.map((company, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-muted-foreground font-medium text-xs sm:text-sm group-hover:text-foreground  p-3 sm:p-4 rounded-lg group-hover:bg-muted/50 group-hover:scale-105 transition-all duration-300">
                    {company}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* features section */}
        <section className="px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <Badge
                variant="secondary"
                className="mb-4 sm:mb-6 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Premium Features
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Everything you need for
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  bulletproof monitoring
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Advanced monitoring capabilities designed to scale with your
                business and keep your services running at peak performance with
                AI-powered insights.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {FEATURES.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/30 text-primary w-fit"
                      >
                        {feature.stats}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* testimonials section */}
        <section className="px-4 py-16 sm:py-20 lg:py-24 bg-muted/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Loved by developers
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                trusted by enterprises
              </span>
            </h2>

            <Card className="bg-gradient-to-br from-card/80 to-muted/50 backdrop-blur-sm border-border p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground mb-4 sm:mb-6 leading-relaxed">
                  "{TESTIMONIALS[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                  <img
                    src={
                      TESTIMONIALS[currentTestimonial].avatar ||
                      "/placeholder.svg"
                    }
                    alt={TESTIMONIALS[currentTestimonial].name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-sm sm:text-base">
                      {TESTIMONIALS[currentTestimonial].name}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {TESTIMONIALS[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-primary w-6 sm:w-8"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* integrations section */}
        <section className="px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Integrates with your
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                favorite tools
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 sm:mb-16 max-w-2xl mx-auto">
              Connect with 50+ popular tools and services to streamline your
              monitoring workflow.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
              {INTEGRATION.map((integration, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:scale-110 cursor-pointer"
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                      {integration.icon}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {integration.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* dashboard preview */}
        <section className="px-4 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent to-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Beautiful dashboards that
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  tell the full story
                </span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <Card className="relative bg-gradient-to-br from-card/80 to-muted/50 backdrop-blur-xl border-border p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      Real-time insights at your fingertips
                    </h3>
                    <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                      Get comprehensive visibility into your infrastructure with
                      beautiful, customizable dashboards that update in
                      real-time with AI-powered predictions.
                    </p>
                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {[
                        {
                          icon: TrendingUp,
                          text: "Predictive analytics & forecasting",
                        },
                        {
                          icon: Bell,
                          text: "Smart alerting with ML-powered filtering",
                        },
                        {
                          icon: Eye,
                          text: "Custom dashboards & team collaboration",
                        },
                        {
                          icon: Smartphone,
                          text: "Mobile app with push notifications",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 group"
                        >
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <span className="text-foreground group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 group">
                      <span className="mr-2">Explore Dashboard</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-card/80 to-muted/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border">
                      <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            System Status
                          </span>
                          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 text-xs">
                            All Systems Operational
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 border border-border">
                            <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">
                              99.98%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Uptime
                            </div>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-3 sm:p-4 border border-border">
                            <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-1">
                              245ms
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Response
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-muted-foreground">
                              API Endpoints
                            </span>
                            <span className="text-green-500">12/12 Online</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="pt-3 sm:pt-4 border-t border-border">
                          <div className="text-xs text-muted-foreground mb-2">
                            Recent Activity
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-xs">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-muted-foreground">
                                API response time improved
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-muted-foreground">
                                New monitor added
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* final CTA */}
        <section className="px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Ready to never miss
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                an outage again?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of teams who trust UptimeGuard to keep their
              services running smoothly and their customers happy with
              AI-powered monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg group w-full sm:w-auto"
              >
                <span className="mr-2">Start Free Trial</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-muted-foreground hover:bg-muted/50 hover:border-primary/50 hover:text-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="border-t border-border px-4 py-8 sm:py-12 bg-muted/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  UptimeGuard
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Next-generation uptime monitoring with AI-powered insights for
                modern engineering teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4">
                Product
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  API
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Integrations
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4">
                Company
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4">
                Support
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Status
                </Link>
                <Link
                  href="#"
                  className="block hover:text-foreground transition-colors"
                >
                  Security
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-border space-y-4 sm:space-y-0">
            <div className="text-xs sm:text-sm text-muted-foreground">
              © 2025 UptimeGuard. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
