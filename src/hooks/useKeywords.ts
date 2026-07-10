import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { keywordsService } from "@/services/keywords";

export function useKeywords(params?: { categoryId?: string; isEnabled?: boolean; search?: string }) {
  return useQuery({
    queryKey: ["keywords", params],
    queryFn: () => keywordsService.getAll(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateKeyword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: keywordsService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["keywords"] }); },
  });
}

export function useUpdateKeyword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { word?: string; categoryId?: string } }) =>
      keywordsService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["keywords"] }); },
  });
}

export function useToggleKeyword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => keywordsService.toggle(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["keywords"] }); },
  });
}

export function useDeleteKeyword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => keywordsService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["keywords"] }); },
  });
}
