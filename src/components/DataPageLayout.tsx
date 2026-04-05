import React from "react";
import DataTable from "@/components/DataTable";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import type { Pagination } from "@/hooks/use-crud-manager";

interface DataPageLayoutProps<T extends { id: string }> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  data: T[];
  isLoading: boolean;
  error: any;
  columns: any[];
  onAdd?: () => void;
  addLabel?: string;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  pagination?: Pagination;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterPanel?: React.ReactNode;
}

export default function DataPageLayout<T extends { id: string }>({
  title,
  description,
  icon,
  data,
  isLoading,
  error,
  columns,
  onAdd,
  addLabel,
  searchPlaceholder,
  children,
  pagination,
  currentPage,
  onPageChange,
  searchValue,
  onSearchChange,
  filterPanel,
}: DataPageLayoutProps<T>) {
  const isServerSide = !!pagination && !!onPageChange;

  return (
    <PageWrapper isLoading={isLoading} error={error}>
      <DataTable
        title={title}
        description={description}
        data={data}
        columns={columns}
        header={
          <PageHeader
            title={title}
            description={description}
            icon={icon}
            searchPlaceholder={searchPlaceholder}
            searchValue={searchValue ?? ""}
            onSearchChange={onSearchChange}
            onAdd={onAdd}
            addLabel={addLabel}
            total={pagination?.total}
            filterPanel={filterPanel}
          />
        }
        serverSide={isServerSide}
        serverTotalPages={pagination?.totalPages}
        serverCurrentPage={currentPage}
        onServerPageChange={onPageChange}
      />
      {children}
    </PageWrapper>
  );
}
