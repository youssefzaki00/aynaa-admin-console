import { useCallback } from "react";
import { useUpdateApp } from "@/hooks/useApps";
import { mutationCallbacks } from "@/lib/utils";
import type { FiltersHook } from "@/hooks/use-filters";
import type { App } from "@/services/apps";

export function useAppsCustomSetup(_args: {
  filtersHook: FiltersHook;
  data: App[];
  rawData: unknown;
}) {
  const updateMutation = useUpdateApp();

  const onToggle = useCallback(
    (id: string, checked: boolean) => {
      updateMutation.mutate(
        { id, data: { isActive: checked } },
        mutationCallbacks("App status updated", "Failed to update app status"),
      );
    },
    [updateMutation],
  );

  return {
    customColumnHandlers: { onToggle },
  };
}
