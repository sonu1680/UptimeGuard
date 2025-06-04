"use client";

import { Button } from "@/components/ui/button";
import { SocialButtonProps } from "@/types";


export function SocialButton({
  icon: Icon,
  provider,
  onClick,
  className,
}: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      className={`relative flex w-full items-center justify-center gap-2 overflow-hidden bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all duration-300 group ${className}`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors duration-300" />
      <span>Continue with {provider}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Button>
  );
}
