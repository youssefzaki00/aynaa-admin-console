import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getCategoriesList } from "@/services/categories";
import type { FormConfig } from "@/dialogs/FormDialog";

function formNeedsCategories(fields: FormConfig["fields"]): boolean {
  return fields.some((fieldOrRow) => {
    const row = Array.isArray(fieldOrRow) ? fieldOrRow : [fieldOrRow];
    return row.some((field) => field.optionsKey === "categories");
  });
}

/** Loads category options for forms — only when the dialog is open. */
export function useCategoryFormOptions(open: boolean, fields: FormConfig["fields"]) {
  const needsCategories = useMemo(() => formNeedsCategories(fields), [fields]);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(categorySearchQuery, 250);

  const { data: categoriesResponse } = useCategories(
    { limit: 20, search: debouncedSearch.trim() || undefined },
    { enabled: open && needsCategories },
  );

  const categories = useMemo(
    () =>
      getCategoriesList(categoriesResponse).map((category) => ({
        value: category.id,
        label: category.displayName || category.name,
      })),
    [categoriesResponse],
  );

  return {
    categories,
    categoryRemoteSearch: setCategorySearchQuery,
  };
}
