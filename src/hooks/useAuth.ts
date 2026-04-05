import { useState, useEffect, useCallback } from "react";
import { getToken, setToken, clearToken, login as loginApi } from "@/services/api";
import { toast } from "sonner";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const handleToken = useCallback((token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login: handleToken, logout };
}

export function useLogin(onSuccess: (token: string) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const submit = useCallback(
    async (username: string, password: string) => {
      if (!username.trim() || !password.trim()) return;
      setIsLoading(true);
      try {
        const response = await loginApi({ username, password });
        if (response.data?.token) {
          onSuccess(response.data.token);
          toast.success("Welcome back!");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to login");
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess],
  );

  return { submit, isLoading };
}
