
import { AuthForm } from "@/components/auth/auth-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* dynamic background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        {/* animated mesh gradient */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-primary/5 to-primary/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted-foreground)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted-foreground)/0.03)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      </div>

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <AuthForm />
      </div>
    </div>
  );
}
