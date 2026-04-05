import { apiRequest } from "./api";
import type { Pagination } from "./categories";

export interface CustomizationRequest {
  id: string;
  deviceId: string;
  type: "CUSTOM_BLOCK_KEYWORD" | "CUSTOM_ALLOW_KEYWORD" | "CUSTOM_WHITELIST_APP" | "CUSTOM_BLACKLIST_APP";
  content: string;
  appName: string | null;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminNote: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomizationResponse {
  success: boolean;
  message: string;
  data: {
    requests: CustomizationRequest[];
    pagination: Pagination;
  };
}

export const customizationService = {
  getAll: (params?: { status?: string; type?: string; deviceId?: string; page?: number; limit?: number }) =>
    apiRequest<CustomizationResponse>("/customization/admin/requests", { params: params as Record<string, string | number | boolean | undefined> }),

  review: (id: string, body: { status: "APPROVED" | "REJECTED"; adminNote?: string }) =>
    apiRequest<{ success: boolean; message: string }>(`/customization/admin/review/${id}`, { method: "PATCH", body }),
};
