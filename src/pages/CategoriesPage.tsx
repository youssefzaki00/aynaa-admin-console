import CreatePage, { type PageConfig } from "@/components/CreatePage";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useToggleCategory,
  useDeleteCategory,
} from "@/hooks/useCategories";
import { getCategoryColumns } from "@/columns/categories.columns";
import { FolderOpen } from "lucide-react";
import { getCategoriesList, type Category } from "@/services/categories";

const config: PageConfig<Category> = {
  useQuery: (params) => useCategories(params),
  mapQueryParams: (page, search) => ({ page, limit: 20, search: search || undefined }),
  dataPath: (response) => getCategoriesList(response),
  useCreate: useCreateCategory,
  useUpdate: useUpdateCategory,
  useDelete: useDeleteCategory,
  useToggle: useToggleCategory,
  dialogId: "category-form",
  messages: {
    createSuccess: "Category created",
    updateSuccess: "Category updated",
    deleteSuccess: "Category deleted",
    toggleSuccess: "Category toggled",
  },
  columnGenerator: getCategoryColumns,
  filterDefaults: {},
  disableSearch: true,
};

export default function CategoriesPage() {
  return (
    <CreatePage
      config={config}
      title="Categories"
      description="Manage content categories"
      icon={<FolderOpen className="h-6 w-6" />}
      addLabel="Add Category"
      searchPlaceholder="Search categories..."
    />
  );
}
