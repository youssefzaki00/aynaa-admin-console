import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appsService } from "@/services/apps";

export function useApps(params?: { lastSync?: string }) {
  return useQuery({
    queryKey: ["apps", params],
    queryFn: () => appsService.getAll(params),
  });
}

export function useCreateApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { packageName: string; isActive?: boolean }) =>
      appsService.create({ packageName: payload.packageName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}

export function useUpdateApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { packageName?: string; isActive?: boolean };
    }) =>
      appsService.update(id, {
        packageName: data.packageName,
        isActive: data.isActive,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}

export function useDeleteApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => appsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}
