import { useState, useEffect } from "react";
import { getStoredAdminKey, setAdminKey, clearAdminKey } from "@/services/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getStoredAdminKey());

  useEffect(() => {
    setIsAuthenticated(!!getStoredAdminKey());
  }, []);

  const login = (key: string) => {
    setAdminKey(key);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAdminKey();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
