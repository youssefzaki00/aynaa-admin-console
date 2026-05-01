import { apiRequest, uploadRequest } from "./api";

/** GET list item — may include category linkage from the API. */
export interface Site {
  id: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name?: string;
  categoryId?: string;
  category?: { id?: string; name?: string; displayName?: string };
  isBlocked?: boolean;
}

export interface SitesListPagination {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  pages?: number;
}

/** When GET /sites nests rows under `data.sites` instead of a bare `data` array. */
export interface SitesListEnvelope {
  sites: Site[];
  pagination?: SitesListPagination;
}

/** GET /sites — `data` may be `Site[]` or `{ sites, pagination }`. */
export interface SitesResponse {
  success?: boolean;
  data: Site[] | SitesListEnvelope;
  pagination?: SitesListPagination;
}


export interface SiteResponse {
  success: boolean;
  message: string;
  data: Site;
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

/** Table rows from GET /sites (`data` as array or `{ sites }`). */
export function getSitesListFromResponse(responseBody: unknown): Site[] {
  if (!responseBody || typeof responseBody !== "object") return [];
  const payload = responseBody as Record<string, unknown>;
  const dataPayload = payload.data;
  if (Array.isArray(dataPayload)) return dataPayload as Site[];
  if (dataPayload && typeof dataPayload === "object") {
    const sitesNested = (dataPayload as Record<string, unknown>).sites;
    if (Array.isArray(sitesNested)) return sitesNested as Site[];
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
