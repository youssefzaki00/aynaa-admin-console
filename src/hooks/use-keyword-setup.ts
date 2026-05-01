import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { FiltersHook } from "@/hooks/use-filters";
import type { Keyword } from "@/services/keywords";
import { getCategoriesList } from "@/services/categories";

export function useKeywordCustomSetup(_args: { filtersHook: FiltersHook; data: Keyword[]; rawData: unknown }) {
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const debouncedCategorySearch = useDebouncedValue(categorySearchQuery, 250);

  const { data: categoriesResponse } = useCategories({
    limit: 20,
    search: debouncedCategorySearch.trim() || undefined,
  });

  const categoryOptions = useMemo(
    () =>
      getCategoriesList(categoriesResponse).map((category) => ({
        value: category.id,
        label: category.displayName || category.name,
      })),
    [categoriesResponse],
  );

  return {
    extraDialogParams: {
      categories: categoryOptions,
      categoryRemoteSearch: setCategorySearchQuery,
    },
    transformEditData: (item: Keyword) => ({
      ...item,
      categoryId: item.category?.id ?? "",
    }),
  };
}
