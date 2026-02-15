import { apiRequest } from "./api";

export interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string;
  isActive: boolean;
  keywordCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
    pagination: Pagination;
  };
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: { category: Category };
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const categoriesService = {
  getAll: (params?: { page?: number; limit?: number; isActive?: boolean }) =>
    apiRequest<CategoriesResponse>("/admin/categories", { params: params as Record<string, string | number | boolean | undefined> }),

  getById: (id: string) =>
    apiRequest<CategoryResponse>(`/admin/categories/${id}`),

  create: (body: { name: string; displayName: string; description?: string }) =>
    apiRequest<CategoryResponse>("/admin/categories", { method: "POST", body }),

  update: (id: string, body: { displayName?: string; description?: string }) =>
    apiRequest<CategoryResponse>(`/admin/categories/${id}`, { method: "PATCH", body }),

  toggle: (id: string) =>
    apiRequest<CategoryResponse>(`/admin/categories/${id}/toggle`, { method: "PATCH" }),

  delete: (id: string) =>
    apiRequest<{ success: boolean; message: string; data: { deletedCategory: { id: string; name: string; displayName: string } } }>(`/admin/categories/${id}`, { method: "DELETE" }),
};
