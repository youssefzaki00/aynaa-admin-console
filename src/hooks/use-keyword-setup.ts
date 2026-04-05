import { useMemo } from "react";
import { useCategories } from "@/hooks/useCategories";
import type { FiltersHook } from "@/hooks/use-filters";
import type { Keyword } from "@/services/keywords";

export function useKeywordCustomSetup({ filtersHook, data, rawData }: {
  filtersHook: FiltersHook;
  data: Keyword[];
  rawData: any;
}) {
  const { data: catData } = useCategories({ limit: 100 });

  const categoryOptions = useMemo(
    () => (catData?.data?.categories ?? []).map((c) => ({ value: c.id, label: c.displayName })),
    [catData],
  );

  return {
    extraDialogParams: {
      categories: categoryOptions,
    },
    transformEditData: (item: Keyword) => ({
      ...item,
      categoryId: item.category?.id || "",
    }),
  };
}
