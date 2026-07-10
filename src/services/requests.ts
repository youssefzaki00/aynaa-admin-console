import { apiRequest } from "./api";
import type { ApiItemResponse, ApiListResponse } from "@/services/api-types";
import { getItemsFromListResponse } from "@/services/api-types";

export type RequestStatus = "PENDING" | "APPROVED" | "DECLINED" | "REJECTED";
export type RequestType = "UNINSTALL" | string;

export interface AppRequest {
  id: string;
  userId: string;
  type: RequestType;
  status: RequestStatus | string;
  message: string;
  details: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
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

export type UpdateRequestResponse = ApiItemResponse<AppRequest>;

export function getRequestsList(apiResponse: RequestsResponse | undefined): AppRequest[] {
  return getItemsFromListResponse(apiResponse);
}

export const requestsService = {
  getAll: (params?: { type?: string; page?: number; limit?: number }) =>
    apiRequest<RequestsResponse>("/requests", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  update: (id: string, body: { status?: RequestStatus; message?: string }) =>
    apiRequest<UpdateRequestResponse>(`/requests/${id}`, { method: "PATCH", body }),
};
