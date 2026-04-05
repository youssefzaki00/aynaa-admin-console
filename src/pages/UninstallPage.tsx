import DataPageLayout from "@/components/DataPageLayout";
import StatusFilterPanel from "@/components/StatusFilterPanel";
import { useUninstallPage } from "@/hooks/useUninstall";
import { Trash2 } from "lucide-react";

export default function UninstallPage() {
  const { data, isLoading, error, columns, pagination, statusFilter, filtersHook } = useUninstallPage();

  return (
    <DataPageLayout
      title="Uninstall Requests"
      description="Review app uninstall requests"
      icon={<Trash2 className="h-6 w-6" />}
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
