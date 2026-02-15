import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { keywordsService } from "@/services/keywords";
import { toast } from "sonner";

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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["keywords"] });
      toast.success("Keyword created");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateKeyword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string; word?: string; categoryId?: string }) =>
      keywordsService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["keywords"] });
      toast.success("Keyword updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useToggleKeyword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => keywordsService.toggle(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["keywords"] });
      toast.success("Keyword toggled");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteKeyword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => keywordsService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["keywords"] });
      toast.success("Keyword deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
