import { apiRequest } from "./api";
import type { ApiListResponse } from "@/services/api-types";
import { getItemsFromListResponse } from "@/services/api-types";

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AppRequest {
  id: string;
  userId: string;
  reason: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RequestsListParams {
  userId?: string;
  status?: RequestStatus;
  page?: number;
  limit?: number;
}

export interface RequestsPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface RequestsResponse extends ApiListResponse<AppRequest> {
  data: ApiListResponse<AppRequest>["data"] & {
    pagination: RequestsPagination;
  };
}

export interface UpdateRequestResponse {
  success: boolean;
  data: { request: AppRequest };
}

export function getRequestsList(apiResponse: RequestsResponse | undefined): AppRequest[] {
  return getItemsFromListResponse(apiResponse);
}

export const requestsService = {
  getAll: (params?: RequestsListParams) =>
    apiRequest<RequestsResponse>("/requests", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  update: (id: string, body: { status: RequestStatus }) =>
    apiRequest<UpdateRequestResponse>(`/requests/${id}`, { method: "PATCH", body }),
};
