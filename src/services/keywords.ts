import { apiRequest } from "./api";
import type { Pagination } from "./categories";

export interface Keyword {
  id: string;
  word: string;
  category: {
    id: string;
    name: string;
    displayName: string;
  };
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KeywordsResponse {
  success: boolean;
  message: string;
  data: {
    keywords: Keyword[];
    pagination: Pagination;
  };
}

export interface KeywordResponse {
  success: boolean;
  message: string;
  data: { keyword: Keyword };
}

export const keywordsService = {
  getAll: (params?: { page?: number; limit?: number; categoryId?: string; isEnabled?: boolean }) =>
    apiRequest<KeywordsResponse>("/admin/keywords", { params: params as Record<string, string | number | boolean | undefined> }),

  create: (body: { word: string; categoryId: string }) =>
    apiRequest<KeywordResponse>("/admin/keywords", { method: "POST", body }),

  update: (id: string, body: { word?: string; categoryId?: string }) =>
    apiRequest<KeywordResponse>(`/admin/keywords/${id}`, { method: "PATCH", body }),

  toggle: (id: string) =>
    apiRequest<KeywordResponse>(`/admin/keywords/${id}/toggle`, { method: "PATCH" }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string }>(`/admin/keywords/${id}`, { method: "DELETE" }),
};
