const BASE_URL = "https://api.wekayaa.com/api/v1";

function getAdminKey(): string {
  return localStorage.getItem("wekayaa_admin_key") || "";
}

export function setAdminKey(key: string) {
  localStorage.setItem("wekayaa_admin_key", key);
}

export function getStoredAdminKey(): string {
  return getAdminKey();
}

export function clearAdminKey() {
  localStorage.removeItem("wekayaa_admin_key");
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, params } = options;

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

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-admin-key": getAdminKey(),
  };

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
