import { apiRequest } from "./api";
import type { CategoryRef } from "./categories";
import type { ApiItemResponse, ApiListResponse } from "@/services/api-types";
import { getItemsFromListResponse } from "@/services/api-types";

export interface Keyword {
  id: string;
  word: string;
  category: CategoryRef;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type KeywordsResponse = ApiListResponse<Keyword>;

export function getKeywordsList(apiResponse: KeywordsResponse | undefined): Keyword[] {
  return getItemsFromListResponse(apiResponse);
}

export type KeywordResponse = ApiItemResponse<Keyword>;

export const keywordsService = {
  getAll: (params?: { categoryId?: string; isEnabled?: boolean; search?: string }) =>
    apiRequest<KeywordsResponse>("/keywords", { params: params as Record<string, string | number | boolean | undefined> }),

  create: (body: { word: string; categoryId: string }) =>
    apiRequest<KeywordResponse>("/keywords", { method: "POST", body }),

  update: (id: string, body: { word?: string; categoryId?: string }) =>
    apiRequest<KeywordResponse>(`/keywords/${id}`, { method: "PATCH", body }),

  toggle: (id: string) =>
    apiRequest<KeywordResponse>(`/keywords/${id}/toggle`, { method: "PATCH" }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string; data: { item: { id: string; word: string } } }>(
      `/keywords/${id}`,
      { method: "DELETE" },
    ),
};
