import DataPageLayout from "@/components/DataPageLayout";
import StatusFilterPanel from "@/components/StatusFilterPanel";
import { useSuggestionsPage } from "@/hooks/useSuggestions";
import { Lightbulb } from "lucide-react";

export default function SuggestionsPage() {
  const { data, isLoading, error, columns, pagination, statusFilter, filtersHook } = useSuggestionsPage();

  return (
    <DataPageLayout
      title="Suggestions"
      description="Review user suggestions"
      icon={<Lightbulb className="h-6 w-6" />}
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
