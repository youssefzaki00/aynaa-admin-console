import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { whitelistService } from "@/services/whitelist";
import { toast } from "sonner";

export function useWhitelist(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["whitelist", params],
    queryFn: () => whitelistService.getAll(params),
  });
}

export function useAddToWhitelist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: whitelistService.add,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["whitelist"] });
      toast.success("App added to whitelist");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateWhitelist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string; packageName?: string; appName?: string }) =>
      whitelistService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["whitelist"] });
      toast.success("Whitelist app updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useRemoveFromWhitelist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => whitelistService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["whitelist"] });
      toast.success("App removed from whitelist");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
