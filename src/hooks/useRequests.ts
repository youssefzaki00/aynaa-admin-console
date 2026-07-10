import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  requestsService,
  type RequestStatus,
  type RequestsListParams,
} from "@/services/requests";

export function useRequests(params?: RequestsListParams) {
  return useQuery({
    queryKey: ["requests", params],
    queryFn: () => requestsService.getAll(params),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { status: RequestStatus };
    }) => requestsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
