import { apiRequest } from "./api";
import type { ApiItemResponse, ApiListResponse } from "@/services/api-types";
import { getItemsFromListResponse } from "@/services/api-types";

export interface ExcludedApp {
  id: string;
  packageName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ExcludedAppsResponse = ApiListResponse<ExcludedApp>;

export type ExcludedAppResponse = ApiItemResponse<ExcludedApp>;

export type DeletedExcludedAppResponse = ApiItemResponse<{ id: string; packageName: string }>;

export function getExcludedAppsList(apiResponse: ExcludedAppsResponse | undefined): ExcludedApp[] {
  return getItemsFromListResponse(apiResponse);
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
