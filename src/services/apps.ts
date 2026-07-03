import { apiRequest } from "./api";

export interface App {
  id: string;
  packageName: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppsResponse {
  success: boolean;
  message?: string;
  data: {
    apps: App[];
  };
}

export interface AppResponse {
  success: boolean;
  message: string;
  data: { app: App };
}

export interface DeletedAppResponse {
  success: boolean;
  message: string;
  data: { deletedApp: { id: string; packageName: string } };
}

export function getAppsList(apiResponse: AppsResponse | undefined): App[] {
  return apiResponse?.data?.apps ?? [];
}

export const appsService = {
  getAll: (params?: { lastSync?: string }) =>
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
