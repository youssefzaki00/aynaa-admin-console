import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sitesService } from "@/services/sites";

export function useSites(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: ["sites", params],
    queryFn: () => sitesService.getAll(params),
  });
}

export function useCreateSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sitesService.create,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["sites"] }); },
  });
}

export function useUpdateSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; url?: string; category?: string; isBlocked?: boolean } }) =>
      sitesService.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["sites"] }); },
  });
}

export function useDeleteSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sitesService.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["sites"] }); },
  });
}
