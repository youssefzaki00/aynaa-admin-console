import { useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uninstallService } from "@/services/uninstall";
import { useFilters } from "@/hooks/use-filters";
import { useDialog } from "@/lib/dialog-context";
import { getUninstallColumns } from "@/config/columns/uninstall.columns";
import { mutationCallbacks, normalizePagination } from "@/lib/utils";

export function useUninstallRequests(params?: { status?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["uninstall", params],
    queryFn: () => uninstallService.getAll(params),
  });
}

export function useReviewUninstall() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, adminNote }: { id: string; status: "APPROVED" | "REJECTED"; adminNote?: string }) =>
      uninstallService.review(id, { status, adminNote }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["uninstall"] }); },
  });
}

export function useUninstallPage() {
  const filtersHook = useFilters({ initialFilters: { status: "PENDING" } });
  const statusFilter = filtersHook.filters.status ?? "PENDING";
  const { openDialog } = useDialog();

  const { data, isLoading, error } = useUninstallRequests({
    page: filtersHook.page,
    limit: 20,
    status: statusFilter || undefined,
  });
  const reviewMutation = useReviewUninstall();

  const requests = data?.data?.requests ?? [];
  const pagination = normalizePagination(data?.data?.pagination);

  const onReview = useCallback(
    (item: any, action: "APPROVED" | "REJECTED") => {
      openDialog("review", {
        title: `${action === "APPROVED" ? "Approve" : "Reject"} Uninstall`,
        onConfirm: (adminNote?: string) => {
          reviewMutation.mutate(
            { id: item.id, status: action, adminNote },
            mutationCallbacks("Request reviewed"),
          );
        },
      });
    },
    [openDialog, reviewMutation],
  );

  const onImagePreview = useCallback(
    (urls: string[]) => openDialog("image-preview", { urls }),
    [openDialog],
  );

  const columns = useMemo(
    () => getUninstallColumns({ onReview, onImagePreview }),
    [onReview, onImagePreview],
  );

  return {
    data: requests,
    isLoading,
    error,
    columns,
    pagination,
    statusFilter,
    filtersHook,
  };
}
