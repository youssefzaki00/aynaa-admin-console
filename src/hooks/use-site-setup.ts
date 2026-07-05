import { useCallback } from "react";
import { useUpdateSite } from "@/hooks/useSites";
import { mutationCallbacks } from "@/lib/utils";
import type { FiltersHook } from "@/hooks/use-filters";
import type { Site } from "@/services/sites";

export function useSiteCustomSetup(_args: { filtersHook: FiltersHook; data: Site[]; rawData: unknown }) {
  const updateMutation = useUpdateSite();

  const onToggle = useCallback(
    (id: string, checked: boolean) => {
      updateMutation.mutate(
        { id, data: { isActive: checked } },
        mutationCallbacks("Site status updated", "Failed to update site status"),
      );
    },
    [updateMutation],
  );

  return {
    transformEditData: (item: Site) => ({
      ...item,
      categoryId: item.category.id,
    }),
    customColumnHandlers: { onToggle },
  };
}
