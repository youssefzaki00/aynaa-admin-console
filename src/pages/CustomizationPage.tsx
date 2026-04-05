import DataPageLayout from "@/components/DataPageLayout";
import StatusFilterPanel from "@/components/StatusFilterPanel";
import { useCustomizationPage } from "@/hooks/useCustomization";
import { Settings } from "lucide-react";

export default function CustomizationPage() {
  const { data, isLoading, error, columns, pagination, statusFilter, filtersHook } = useCustomizationPage();

  return (
    <DataPageLayout
      title="Customization Requests"
      description="Review device customization requests"
      icon={<Settings className="h-6 w-6" />}
      data={data}
      isLoading={isLoading}
      error={error}
      columns={columns}
      pagination={pagination}
      currentPage={filtersHook.page}
      onPageChange={filtersHook.setPage}
      filterPanel={
        <StatusFilterPanel
          value={statusFilter}
          onChange={(v) => { filtersHook.handleFilterChange("status", v); filtersHook.setPage(1); }}
        />
      }
    />
  );
}
