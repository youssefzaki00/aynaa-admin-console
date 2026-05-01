import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { FiltersHook } from "@/hooks/use-filters";
import { getCategoriesList } from "@/services/categories";
import type { Site } from "@/services/sites";

export function useSiteCustomSetup(_args: { filtersHook: FiltersHook; data: Site[]; rawData: unknown }) {
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
    transformEditData: (item: Site) => ({
      ...item,
      categoryId: item.categoryId ?? item.category?.id ?? "",
      isBlocked: item.isBlocked ?? item.isActive ?? true,
    }),
  };
}
