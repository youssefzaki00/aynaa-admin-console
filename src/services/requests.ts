import { apiRequest } from "./api";

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

export interface RequestsResponse {
  success: boolean;
  message?: string;
  data: {
    requests: AppRequest[];
    pagination: RequestsPagination;
  };
}

export interface UpdateRequestResponse {
  success: boolean;
  message: string;
  data: { request: AppRequest };
}

export function getRequestsList(apiResponse: RequestsResponse | undefined): AppRequest[] {
  return apiResponse?.data?.requests ?? [];
}

export const requestsService = {
  getAll: (params?: { type?: string; page?: number; limit?: number }) =>
    apiRequest<RequestsResponse>("/requests", {
      params: params as Record<string, string | number | boolean | undefined>,
    }),

  update: (id: string, body: { status?: RequestStatus; message?: string }) =>
    apiRequest<UpdateRequestResponse>(`/requests/${id}`, { method: "PATCH", body }),
};
