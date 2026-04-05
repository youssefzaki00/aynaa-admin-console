import { useState } from "react";
import { User, Loader2 } from "lucide-react";
import { Button } from "@/ui/button";
import AuthLayout from "@/components/AuthLayout";
import IconInput from "@/components/IconInput";
import PasswordInput from "@/components/PasswordInput";
import { useLogin } from "@/hooks/useAuth";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { submit, isLoading } = useLogin(onLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(username, password);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <img src="/شعار عينا احمر.png" alt="Aynaa" className="h-16 w-auto mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Aynaa Admin</h1>
        <p className="text-sm text-muted-foreground">Sign in to manage the application</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <IconInput
          icon={<User className="h-4 w-4" />}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/25 transition-all duration-200"
          disabled={isLoading || !username.trim() || !password.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
