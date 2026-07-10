import { apiRequest, uploadRequest } from "./api";
import type { ApiItemResponse, ApiListResponse } from "@/services/api-types";
import { getItemsFromListResponse } from "@/services/api-types";

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

export type SitesResponse = ApiListResponse<Site>;

export type SiteResponse = ApiItemResponse<Site>;

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
  if (!responseBody || typeof responseBody !== "object") return [];
  return getItemsFromListResponse(responseBody as SitesResponse);
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
