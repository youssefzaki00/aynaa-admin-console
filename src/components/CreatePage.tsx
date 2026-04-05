import React, { useMemo, useCallback } from "react";
import { useFilters } from "@/hooks/use-filters";
import { useCrudManager } from "@/hooks/use-crud-manager";
import type { CrudMutations, CrudMessages, Pagination } from "@/hooks/use-crud-manager";
import type { FiltersHook } from "@/hooks/use-filters";
import type { DialogName } from "@/lib/dialog-types";
import type { UseMutationResult } from "@tanstack/react-query";
import DataPageLayout from "./DataPageLayout";

const EMPTY_SETUP: {
  customColumnHandlers: Record<string, any>;
  extraDialogParams: Record<string, any>;
  overrideData?: undefined;
  transformEditData?: undefined;
} = {
  customColumnHandlers: {},
  extraDialogParams: {},
};

function useNoopSetup() {
  return EMPTY_SETUP;
}

export interface PageConfig<TRow extends { id: string }> {
  useQuery: (params: any) => {
    data?: any;
    isLoading: boolean;
    error: any;
  };
  mapQueryParams: (
    page: number,
    search: string,
    filters: Record<string, string>,
  ) => any;
  dataPath: (raw: any) => TRow[];

  useCreate: () => UseMutationResult<any, any, any>;
  useUpdate: () => UseMutationResult<any, any, any>;
  useDelete: () => UseMutationResult<any, any, any>;
  useToggle?: () => UseMutationResult<any, any, any> | undefined;

  dialogId: DialogName;
  messages: CrudMessages;
  columnGenerator: (handlers: any) => any[];
  filterDefaults: Record<string, string>;

  useCustomSetup?: (ctx: {
    filtersHook: FiltersHook;
    data: TRow[];
    rawData: any;
  }) => {
    customColumnHandlers?: Record<string, any>;
    extraDialogParams?: Record<string, any>;
    overrideData?: TRow[];
    transformEditData?: (item: TRow) => any;
  };
}

interface CreatePageProps<TRow extends { id: string }> {
  config: PageConfig<TRow>;
  title: string;
  description: string;
  icon?: React.ReactNode;
  addLabel?: string;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export default function CreatePage<TRow extends { id: string }>({
  config,
  title,
  description,
  icon,
  addLabel,
  searchPlaceholder,
  children,
}: CreatePageProps<TRow>) {
  const filtersHook = useFilters({
    initialFilters: config.filterDefaults,
  });

  const queryParams = config.mapQueryParams(
    filtersHook.page,
    filtersHook.search,
    filtersHook.filters,
  );
  const query = config.useQuery(queryParams);

  const createMutation = config.useCreate();
  const updateMutation = config.useUpdate();
  const deleteMutation = config.useDelete();
  const toggleMutation = config.useToggle?.();

  const mutations: CrudMutations<TRow, any> = useMemo(
    () => ({
      create: createMutation,
      update: updateMutation,
      remove: deleteMutation,
      toggle: toggleMutation || undefined,
    }),
    [createMutation, updateMutation, deleteMutation, toggleMutation],
  );

  const rawData = query.data;
  const rows: TRow[] = useMemo(
    () => config.dataPath(rawData) ?? [],
    [rawData, config],
  );

  const customSetupHook = config.useCustomSetup ?? useNoopSetup;
  const {
    customColumnHandlers = {},
    extraDialogParams = {},
    overrideData,
    transformEditData,
  } = customSetupHook({ filtersHook, data: rows, rawData: query.data });

  const finalData = overrideData ?? rows;

  const columnGenerator = useCallback(
    (handlers: any) =>
      config.columnGenerator({ ...handlers, ...customColumnHandlers }),
    [config.columnGenerator, customColumnHandlers],
  );

  const pagination: Pagination | undefined = useMemo(() => {
    const p = rawData?.data?.pagination ?? rawData?.pagination;
    if (!p) return undefined;
    return {
      total: p.total ?? 0,
      page: p.page ?? 1,
      limit: p.limit ?? 20,
      totalPages: p.totalPages ?? p.pages ?? 1,
    };
  }, [rawData]);

  const management = useCrudManager<TRow, any>({
    data: finalData,
    queryMeta: {
      isLoading: query.isLoading,
      error: query.error,
      pagination,
    },
    mutations,
    dialogId: config.dialogId,
    messages: config.messages,
    columnGenerator,
    filtersHook,
    extraDialogParams,
    customHandlers: customColumnHandlers,
    transformEditData,
  });

  return (
    <DataPageLayout
      title={title}
      description={description}
      icon={icon}
      data={management.data}
      isLoading={management.isLoading}
      error={management.error}
      columns={management.columns}
      onAdd={management.onAdd}
      addLabel={addLabel}
      searchPlaceholder={searchPlaceholder}
      pagination={management.pagination}
      currentPage={management.currentPage}
      onPageChange={management.onPageChange}
      searchValue={management.searchValue}
      onSearchChange={management.onSearchChange}
    >
      {children}
    </DataPageLayout>
  );
}

export { useNoopSetup };
