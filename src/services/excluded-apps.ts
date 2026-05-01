import { apiRequest } from "./api";

export interface ExcludedApp {
  id: string;
  packageName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExcludedAppsListData {
  excludedApps: ExcludedApp[];
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    pages?: number;
  };
}

export interface ExcludedAppsResponse {
  success: boolean;
  data: ExcludedAppsListData;
}

export interface ExcludedAppResponse {
  success: boolean;
  message: string;
  data: { excludedApp: ExcludedApp };
}

export interface DeletedExcludedAppResponse {
  success: boolean;
  message: string;
  data: { deletedExcludedApp: { id: string; packageName: string } };
}

export const excludedAppsService = {
  getAll: (params?: { lastSync?: string; page?: number; limit?: number; search?: string }) =>
    apiRequest<ExcludedAppsResponse>("/excluded-apps", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  create: (body: { packageName: string }) =>
    apiRequest<ExcludedAppResponse>("/excluded-apps", { method: "POST", body }),

  update: (id: string, body: { packageName?: string; isActive?: boolean }) =>
    apiRequest<ExcludedAppResponse>(`/excluded-apps/${id}`, { method: "PATCH", body }),

  delete: (id: string) =>
    apiRequest<DeletedExcludedAppResponse>(`/excluded-apps/${id}`, { method: "DELETE" }),
};
