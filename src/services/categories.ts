import { apiRequest } from "./api";
import type { ApiItemResponse, ApiListResponse, Pagination } from "@/services/api-types";
import { getItemsFromListResponse } from "@/services/api-types";

export type { Pagination } from "@/services/api-types";

/** Nested category reference on keywords, sites, etc. */
export interface CategoryRef {
  id: string;
  name: string;
  displayName: string;
}

export interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  isActive: boolean;
  keywordCount?: number;
  createdAt: string;
  updatedAt: string;
}

/** GET /admin/categories — `{ success, message, data: { items, pagination } }`. */
export type CategoriesResponse = ApiListResponse<Category>;

/** Categories rows from the list endpoint (TanStack Query `data`). */
export function getCategoriesList(apiResponse: CategoriesResponse | undefined): Category[] {
  return getItemsFromListResponse(apiResponse);
}

export type CategoryResponse = ApiItemResponse<Category>;

export const categoriesService = {
  getAll: (params?: { page?: number; limit?: number; isActive?: boolean; search?: string }) =>
    apiRequest<CategoriesResponse>("/admin/categories", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  getById: (id: string) =>
    apiRequest<CategoryResponse>(`/admin/categories/${id}`),

  create: (body: { name: string; displayName: string; description?: string }) =>
    apiRequest<CategoryResponse>("/admin/categories", { method: "POST", body }),

  update: (id: string, body: { displayName?: string; description?: string }) =>
    apiRequest<CategoryResponse>(`/admin/categories/${id}`, { method: "PATCH", body }),

  toggle: (id: string) =>
    apiRequest<CategoryResponse>(`/admin/categories/${id}/toggle`, { method: "PATCH" }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string; data: { item: { id: string; name: string; displayName: string } } }>(
      `/admin/categories/${id}`,
      { method: "DELETE" },
    ),
};
