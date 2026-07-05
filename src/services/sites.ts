import { apiRequest, uploadRequest } from "./api";
import type { Pagination } from "./categories";

/** Category embedded on a site list item (no id; displayName may be omitted). */
export interface SiteCategory {
  name: string;
  displayName?: string;
}

export interface Site {
  id: string;
  url: string;
  category: SiteCategory | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function siteCategoryLabel(category: SiteCategory | null | undefined): string {
  if (!category) return "—";
  return category.displayName || category.name || "—";
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
  isActive: boolean;
}

export interface SiteUpdateBody {
  name?: string;
  url?: string;
  categoryId?: string;
  isActive?: boolean;
}

export function getSitesListFromResponse(responseBody: unknown): Site[] {
  if (!responseBody) return [];
  if (Array.isArray(responseBody)) return responseBody as Site[];

  if (typeof responseBody !== "object") return [];
  const payload = responseBody as Record<string, unknown>;

  const dataPayload = payload.data;
  if (Array.isArray(dataPayload)) return dataPayload as Site[];

  if (dataPayload && typeof dataPayload === "object") {
    const sites = (dataPayload as SitesListData).sites;
    if (Array.isArray(sites)) return sites;
  }

  if (Array.isArray(payload.sites)) return payload.sites as Site[];

  return [];
}

export const sitesService = {
  getAll: (params?: { search?: string }) =>
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
