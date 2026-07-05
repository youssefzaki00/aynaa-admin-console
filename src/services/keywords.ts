import { apiRequest } from "./api";
import type { CategoryRef, Pagination } from "./categories";

export interface Keyword {
  id: string;
  word: string;
  category: CategoryRef;
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
  getAll: (params?: { categoryId?: string; isEnabled?: boolean }) =>
    apiRequest<KeywordsResponse>("/keywords", { params: params as Record<string, string | number | boolean | undefined> }),

  create: (body: { word: string; categoryId: string }) =>
    apiRequest<KeywordResponse>("/keywords", { method: "POST", body }),

  update: (id: string, body: { word?: string; categoryId?: string }) =>
    apiRequest<KeywordResponse>(`/keywords/${id}`, { method: "PATCH", body }),

  toggle: (id: string) =>
    apiRequest<KeywordResponse>(`/keywords/${id}/toggle`, { method: "PATCH" }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string; data: { deletedKeyword: { id: string; word: string } } }>(`/keywords/${id}`, { method: "DELETE" }),
};
