import { apiRequest } from "./api";
import type { Pagination } from "./categories";

export interface Suggestion {
  id: string;
  deviceId: { deviceId: string };
  type: "BLOCK_WORD" | "UNBLOCK_WORD" | "WHITELIST_APP";
  content: string;
  note: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface SuggestionsResponse {
  success: boolean;
  message: string;
  data: {
    suggestions: Suggestion[];
    pagination: Pagination;
  };
}

export const suggestionsService = {
  getAll: (params?: { status?: string; type?: string; page?: number; limit?: number }) =>
    apiRequest<SuggestionsResponse>("/admin/suggestions", { params: params as Record<string, string | number | boolean | undefined> }),

  review: (id: string, body: { status: "APPROVED" | "REJECTED" }) =>
    apiRequest<{ success: boolean; message: string }>(`/admin/suggestions/review/${id}`, { method: "PATCH", body }),
};
