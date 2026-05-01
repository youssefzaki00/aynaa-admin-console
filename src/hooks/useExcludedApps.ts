import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { excludedAppsService } from "@/services/excluded-apps";

export function useExcludedApps(params?: { lastSync?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["excluded-apps", params],
    queryFn: () => excludedAppsService.getAll(params),
  });
}

export function useCreateExcludedApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { packageName: string; isActive?: boolean }) =>
      excludedAppsService.create({ packageName: payload.packageName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["excluded-apps"] });
    },
  });
}

export function useUpdateExcludedApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { packageName: string; isActive: boolean };
    }) =>
      excludedAppsService.update(id, {
        packageName: data.packageName,
        isActive: data.isActive,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["excluded-apps"] });
    },
  });
}

export function useDeleteExcludedApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => excludedAppsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["excluded-apps"] });
    },
  });
}
