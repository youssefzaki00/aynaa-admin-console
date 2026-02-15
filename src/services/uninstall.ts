import { apiRequest } from "./api";
import type { Pagination } from "./categories";

export interface UninstallRequest {
  id: string;
  deviceId: {
    deviceId: string;
    metadata: {
      model: string;
      androidVersion: string;
    };
  };
  reason: string;
  imageUrls: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminNote: string | null;
  unlockCode: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UninstallResponse {
  success: boolean;
  message: string;
  data: {
    requests: UninstallRequest[];
    pagination: Pagination;
  };
}

export interface UninstallReviewResponse {
  success: boolean;
  message: string;
  data: {
    requestId: string;
    status: string;
    unlockCode?: string;
    adminNote?: string;
  };
}

export const uninstallService = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    apiRequest<UninstallResponse>("/admin/uninstall/requests", { params: params as Record<string, string | number | boolean | undefined> }),

  review: (id: string, body: { status: "APPROVED" | "REJECTED"; adminNote?: string }) =>
    apiRequest<UninstallReviewResponse>(`/admin/uninstall/review/${id}`, { method: "PATCH", body }),
};
