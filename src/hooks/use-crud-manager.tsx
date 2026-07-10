import { useMemo, useCallback } from "react";
import { useDialog } from "@/lib/dialog-context";
import { mutationCallbacks } from "@/lib/utils";
import type { UseMutationResult } from "@tanstack/react-query";
import type { DialogName } from "@/lib/dialog-types";
import type { FiltersHook } from "@/hooks/use-filters";

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CrudMessages {
  createSuccess: string;
  createError?: string;
  updateSuccess: string;
  updateError?: string;
  deleteSuccess: string;
  deleteError?: string;
  toggleSuccess?: string;
  toggleError?: string;
}

export interface CrudMutations<_T, TPayload> {
  create?: UseMutationResult<any, any, TPayload>;
  update?: UseMutationResult<any, any, { id: string; data: TPayload }>;
  remove?: UseMutationResult<any, any, string>;
  toggle?: UseMutationResult<any, any, string>;
}

interface UseCrudManagerProps<T, TPayload> {
  data: T[];
  queryMeta: {
    isLoading: boolean;
    error: any;
    pagination?: Pagination;
  };
  mutations: CrudMutations<T, TPayload>;
  dialogId?: DialogName;
  messages: CrudMessages;
  columnGenerator: (handlers: any) => any[];
  filtersHook?: FiltersHook;
  extraDialogParams?: Record<string, any>;
  customHandlers?: Record<string, any>;
  transformEditData?: (item: T) => any;
}

export type { FiltersHook } from "@/hooks/use-filters";

export function useCrudManager<T extends { id: string }, TPayload>({
  data,
  queryMeta,
  mutations,
  dialogId,
  messages,
  columnGenerator,
  filtersHook,
  extraDialogParams = {},
  customHandlers = {},
  transformEditData,
}: UseCrudManagerProps<T, TPayload>) {
  const { openDialog, closeDialog } = useDialog();

  const handleCreate = useCallback(
    (payload: TPayload) => {
      if (!mutations.create) return;
      mutations.create.mutate(
        payload,
        mutationCallbacks(
          messages.createSuccess,
          messages.createError,
          closeDialog,
        ),
      );
    },
    [mutations.create, messages, closeDialog],
  );

  const handleUpdate = useCallback(
    (id: string, payload: TPayload) => {
      if (!mutations.update) return;
      mutations.update.mutate(
        { id, data: payload },
        mutationCallbacks(
          messages.updateSuccess,
          messages.updateError,
          closeDialog,
        ),
      );
    },
    [mutations.update, messages, closeDialog],
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (!mutations.remove) return;
      mutations.remove.mutate(
        id,
        mutationCallbacks(
          messages.deleteSuccess,
          messages.deleteError,
          closeDialog,
        ),
      );
    },
    [mutations.remove, messages, closeDialog],
  );

  const handleToggle = useCallback(
    (id: string) => {
      if (!mutations.toggle) return;
      mutations.toggle.mutate(
        id,
        mutationCallbacks(
          messages.toggleSuccess || messages.updateSuccess,
          messages.toggleError || messages.updateError,
        ),
      );
    },
    [mutations.toggle, messages],
  );

  const handleSave = useCallback(
    (item: T | null, payload: TPayload) => {
      if (item) {
        handleUpdate(item.id, payload);
      } else {
        handleCreate(payload);
      }
    },
    [handleCreate, handleUpdate],
  );

  const columns = useMemo(
    () =>
      columnGenerator({
        onToggle: handleToggle,
        onEdit: dialogId
          ? (item: T) =>
              openDialog(dialogId, {
                editItem: transformEditData ? transformEditData(item) : item,
                onSave: (p: TPayload) => handleSave(item, p),
                ...extraDialogParams,
              })
          : undefined,
        onDelete: (item: T) =>
          openDialog("delete", {
            title: "Delete",
            description: "Are you sure you want to delete this item? This action cannot be undone.",
            onConfirm: () => handleDelete(item.id),
            data: item,
          }),
        openDialog,
        ...customHandlers,
      }),
    [
      handleToggle,
      handleSave,
      handleDelete,
      openDialog,
      dialogId,
      extraDialogParams,
      columnGenerator,
      customHandlers,
      transformEditData,
    ],
  );

  const onAdd = useCallback(
    () => {
      if (!dialogId) return;
      openDialog(dialogId, {
        onSave: (p: TPayload) => handleSave(null, p),
        ...extraDialogParams,
      });
    },
    [openDialog, dialogId, handleSave, extraDialogParams],
  );

  return {
    data: data ?? [],
    isLoading: queryMeta.isLoading,
    error: queryMeta.error,
    columns,
    onAdd,
    pagination: queryMeta.pagination,
    currentPage: filtersHook?.page,
    onPageChange: filtersHook?.setPage,
    searchValue: filtersHook?.search,
    onSearchChange: filtersHook?.handleSearchChange,
  };
}
