import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { sitesService, type SiteCreateBody, type SiteUpdateBody } from "@/services/sites";

export function useSites(params?: { search?: string }) {
  return useQuery({
    queryKey: ["sites", params],
    queryFn: () => sitesService.getAll(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SiteCreateBody) => sitesService.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });
}

export function useUpdateSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SiteUpdateBody }) =>
      sitesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });
}

export function useDeleteSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => sitesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });
}

export function useUploadSites() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { file: File; categoryId: string }) => sitesService.upload(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });
}
