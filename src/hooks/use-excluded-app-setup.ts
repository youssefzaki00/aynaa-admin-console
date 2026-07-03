import { useCallback } from "react";
import { useUpdateExcludedApp } from "@/hooks/useExcludedApps";
import { mutationCallbacks } from "@/lib/utils";
import type { FiltersHook } from "@/hooks/use-filters";
import type { ExcludedApp } from "@/services/excluded-apps";

export function useExcludedAppCustomSetup(_args: {
  filtersHook: FiltersHook;
  data: ExcludedApp[];
  rawData: unknown;
}) {
  const updateMutation = useUpdateExcludedApp();

  const onToggle = useCallback(
    (id: string, checked: boolean) => {
      updateMutation.mutate(
        { id, data: { isActive: checked } },
        mutationCallbacks("Excluded app status updated", "Failed to update excluded app status"),
      );
    },
    [updateMutation],
  );

  return {
    customColumnHandlers: { onToggle },
  };
}
