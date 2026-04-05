import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { keywordsService } from "@/services/keywords";

export function useKeywords(params?: { page?: number; limit?: number; categoryId?: string; isEnabled?: boolean }) {
  return useQuery({
    queryKey: ["keywords", params],
    queryFn: () => keywordsService.getAll(params),
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
