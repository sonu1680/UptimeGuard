"use client";

import type React from "react";
import { signIn } from "next-auth/react";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Activity,

  AlertCircle,

  Check,
  Github,

} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { SocialButton } from "./social-button";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      setError("");
       await signIn(provider,{ callbackUrl: "/dashboard" });

      setSuccess(`Redirecting to ${provider}`);
     
    } catch (err) {
      console.error(err)
      setError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-card/80 to-muted/50 backdrop-blur-xl border-border/50 shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="relative">
            <Activity className="h-10 w-10 text-primary" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Welcome to UptimeGuard
        </CardTitle>
        <CardDescription>Monitor your websites with confidence</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert
            variant="destructive"
            className="bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400">
            <Check className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        <Tabs defaultValue="signup" className="w-full">
          <TabsContent value="signup" className="space-y-4 pt-4">
            <div className="grid gap-3">
              <SocialButton
                icon={Github}
                provider="GitHub"
                onClick={() => handleSocialLogin("github")}
                isLoading={isLoading}
                //@ts-ignore
                disabled={isLoading}
              />
              <SocialButton
                //@ts-ignore
                icon={(props) => (
                  <svg viewBox="0 0 24 24" {...props}>
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                provider="Google"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-center text-xs text-muted-foreground">
        By continuing, you agree to UptimeGuard's{" "}
        <Link href="#" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </CardFooter>
    </Card>
  );
}
