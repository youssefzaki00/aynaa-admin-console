import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "@/services/categories";
import { toast } from "sonner";

export function useCategories(params?: { page?: number; limit?: number; isActive?: boolean }) {
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string; displayName?: string; description?: string }) =>
      categoriesService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useToggleCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesService.toggle(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category toggled");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
