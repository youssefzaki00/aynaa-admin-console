import { useState } from "react";
import { Shield, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginPageProps {
  onLogin: (key: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) onLogin(key.trim());
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-xl font-semibold text-foreground">Wekayaa Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your admin key to continue</p>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Admin key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="w-full" disabled={!key.trim()}>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
