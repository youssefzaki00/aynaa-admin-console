import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { requestsService, type RequestStatus } from "@/services/requests";

export function useRequests(params?: { type?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["requests", params],
    queryFn: () => requestsService.getAll(params),
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
      data: { status?: RequestStatus; message?: string };
    }) => requestsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
