import type { FiltersHook } from "@/hooks/use-filters";
import type { Keyword } from "@/services/keywords";

export function useKeywordCustomSetup(_args: {
  filtersHook: FiltersHook;
  data: Keyword[];
  rawData: unknown;
}) {
  return {
    transformEditData: (item: Keyword) => ({
      ...item,
      categoryId: item.category?.id ?? "",
    }),
  };
}
