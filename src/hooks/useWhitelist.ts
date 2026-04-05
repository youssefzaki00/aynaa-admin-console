import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { whitelistService } from "@/services/whitelist";

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
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["whitelist"] }); },
  });
}

export function useUpdateWhitelist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { packageName?: string; appName?: string } }) =>
      whitelistService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["whitelist"] }); },
  });
}

export function useRemoveFromWhitelist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => whitelistService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["whitelist"] }); },
  });
}
