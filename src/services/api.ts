const BASE_URL = import.meta.env.VITE_API_URL || "https://api.wekayaa.com/api/v1";

export function getToken(): string | null {
  return localStorage.getItem("wekayaa_admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("wekayaa_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("wekayaa_admin_token");
}

// Keep legacy key functions if needed elsewhere, but they are likely obsolete.
// Removing them to clean up as per new docs.
export function isAuthenticated(): boolean {
  return !!getToken();
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

const TOKEN_KEYS = ["token", "accessToken", "jwt", "jwtToken"] as const;

/** Reads a bearer token from common login API shapes (root or nested under `data`). */
export function extractTokenFromLoginResponse(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  for (const k of TOKEN_KEYS) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  const nested = o.data;
  if (nested && typeof nested === "object") {
    const n = nested as Record<string, unknown>;
    for (const k of TOKEN_KEYS) {
      const v = n[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
  }
  return null;
}

/** POST /auth/admin/login — body `{ username, password }`; token at `data.token`. */
export async function login(credentials: { username: string; password: string }) {
  const res = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, params, headers = {} } = options;

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const token = getToken();
  const authHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    authHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: authHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    // Handle 401 Unauthorized globally if needed (e.g. clear token)
    if (res.status === 401) {
      clearToken();
      // Optional: Redirect to login or notify app state
    }
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function uploadRequest<T>(endpoint: string, formData: FormData): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, { method: "POST", headers, body: formData });
  const data = await res.json();
  if (!res.ok || !data.success) {
    if (res.status === 401) clearToken();
    throw new Error(data.message || "Request failed");
  }
  return data;
}
