import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "@/services/categories";

export function useCategories(params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
}) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoriesService.getAll(params),
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoriesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: categoriesService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); },
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { displayName?: string; description?: string } }) =>
      categoriesService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); },
  });
}

export function useToggleCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesService.toggle(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["categories"] }); },
  });
}
