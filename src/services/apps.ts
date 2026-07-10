import { apiRequest } from "./api";
import type { ApiItemResponse, ApiListResponse } from "@/services/api-types";
import { getItemsFromListResponse } from "@/services/api-types";

export interface App {
  id: string;
  packageName: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AppsResponse = ApiListResponse<App>;

export type AppResponse = ApiItemResponse<App>;

export type DeletedAppResponse = ApiItemResponse<{ id: string; packageName: string }>;

export function getAppsList(apiResponse: AppsResponse | undefined): App[] {
  return getItemsFromListResponse(apiResponse);
}

export const appsService = {
  getAll: (params?: { lastSync?: string; search?: string }) =>
    apiRequest<AppsResponse>("/apps", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  create: (body: { packageName: string }) =>
    apiRequest<AppResponse>("/apps", { method: "POST", body }),

  update: (id: string, body: { packageName?: string; isActive?: boolean; isDeleted?: boolean }) =>
    apiRequest<AppResponse>(`/apps/${id}`, { method: "PATCH", body }),

  delete: (id: string) =>
    apiRequest<DeletedAppResponse>(`/apps/${id}`, { method: "DELETE" }),
};
