import { useState, useEffect } from "react";
import { getToken, setToken, clearToken } from "@/services/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
