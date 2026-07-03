import { apiRequest, uploadRequest } from "./api";
import type { CategoryRef, Pagination } from "./categories";

export interface Site {
  id: string;
  url: string;
  category: CategoryRef;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** GET /sites list payload — `{ sites, pagination }`. */
export interface SitesListData {
  sites: Site[];
  pagination: Pagination;
}

export interface SitesResponse {
  success?: boolean;
  message?: string;
  data: SitesListData;
}

export interface SiteResponse {
  success: boolean;
  message: string;
  data: { site: Site };
}

export interface SiteCreateBody {
  name: string;
  url: string;
  categoryId: string;
  isBlocked: boolean;
}

export interface SiteUpdateBody {
  name?: string;
  url?: string;
  categoryId?: string;
  isBlocked?: boolean;
}

export function getSitesListFromResponse(responseBody: unknown): Site[] {
  if (!responseBody || typeof responseBody !== "object") return [];
  const payload = responseBody as Record<string, unknown>;
  const dataPayload = payload.data;
  if (dataPayload && typeof dataPayload === "object") {
    const sites = (dataPayload as SitesListData).sites;
    if (Array.isArray(sites)) return sites;
  }
  return [];
}

export const sitesService = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    apiRequest<SitesResponse>("/sites", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  create: (body: SiteCreateBody) =>
    apiRequest<SiteResponse>("/sites", { method: "POST", body }),

  update: (id: string, body: SiteUpdateBody) =>
    apiRequest<SiteResponse>(`/sites/${id}`, { method: "PATCH", body }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string }>(`/sites/${id}`, { method: "DELETE" }),

  upload: (payload: { file: File; categoryId: string }) => {
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append("categoryId", payload.categoryId);
    return uploadRequest<{ success: boolean; message: string }>("/sites/upload", formData);
  },
};
