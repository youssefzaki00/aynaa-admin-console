import { apiRequest } from "./api";
import type { Pagination } from "./categories";

export interface WhitelistApp {
  id: string;
  packageName: string;
  appName: string;
  createdAt: string;
  updatedAt: string;
}

export interface WhitelistResponse {
  success: boolean;
  message: string;
  data: {
    whitelist: WhitelistApp[];
    pagination: Pagination;
  };
}

export interface WhitelistAppResponse {
  success: boolean;
  message: string;
  data: { app: WhitelistApp };
}

export const whitelistService = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiRequest<WhitelistResponse>("/admin/whitelist", { params: params as Record<string, string | number | boolean | undefined> }),

  add: (body: { packageName: string; appName: string }) =>
    apiRequest<WhitelistAppResponse>("/admin/whitelist", { method: "POST", body }),

  update: (id: string, body: { packageName?: string; appName?: string }) =>
    apiRequest<WhitelistAppResponse>(`/admin/whitelist/${id}`, { method: "PATCH", body }),

  remove: (id: string) =>
    apiRequest<{ success: boolean; message: string; data: { deletedApp: { id: string; packageName: string; appName: string } } }>(`/admin/whitelist/${id}`, { method: "DELETE" }),
};
