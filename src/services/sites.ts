import { apiRequest, uploadRequest } from "./api";

export interface Site {
  id: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Matches GET /sites list envelope (`data.sites` + optional `pagination`). */
export interface SitesListData {
  sites: Site[];
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    pages?: number;
  };
}

export interface SitesResponse {
  success: boolean;
  data: SitesListData;
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

  upload: (payload: { file: File; categoryId: string }) => {
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append("categoryId", payload.categoryId);
    return uploadRequest<{ success: boolean; message: string }>("/sites/upload", formData);
  },
};
