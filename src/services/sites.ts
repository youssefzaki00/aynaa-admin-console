import { apiRequest } from "./api";

export interface Site {
  id: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SitesResponse {
  success: boolean;
  data: Site[];
}

export interface SiteResponse {
  success: boolean;
  message: string;
  data: Site;
}

export const sitesService = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    apiRequest<SitesResponse>("/sites", { params: params as Record<string, string | number | boolean | undefined> }),

  create: (body: { url: string }) =>
    apiRequest<SiteResponse>("/sites", { method: "POST", body }),

  update: (id: string, body: { url?: string }) =>
    apiRequest<SiteResponse>(`/sites/${id}`, { method: "PATCH", body }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string }>(`/sites/${id}`, { method: "DELETE" }),
};
