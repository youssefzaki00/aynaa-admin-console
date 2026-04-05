import { useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customizationService } from "@/services/customization";
import { useFilters } from "@/hooks/use-filters";
import { useDialog } from "@/lib/dialog-context";
import { getCustomizationColumns } from "@/config/columns/customization.columns";
import { mutationCallbacks, normalizePagination } from "@/lib/utils";

export function useCustomizationRequests(params?: { status?: string; type?: string; deviceId?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["customization", params],
    queryFn: () => customizationService.getAll(params),
  });
}

export function useReviewCustomization() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, adminNote }: { id: string; status: "APPROVED" | "REJECTED"; adminNote?: string }) =>
      customizationService.review(id, { status, adminNote }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["customization"] }); },
  });
}

export function useCustomizationPage() {
  const filtersHook = useFilters({ initialFilters: { status: "PENDING" } });
  const statusFilter = filtersHook.filters.status ?? "PENDING";
  const { openDialog } = useDialog();

  const { data, isLoading, error } = useCustomizationRequests({
    page: filtersHook.page,
    limit: 20,
    status: statusFilter || undefined,
  });
  const reviewMutation = useReviewCustomization();

  const requests = data?.data?.requests ?? [];
  const pagination = normalizePagination(data?.data?.pagination);

  const onReview = useCallback(
    (item: any, action: "APPROVED" | "REJECTED") => {
      openDialog("review", {
        title: `${action === "APPROVED" ? "Approve" : "Reject"} Request`,
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

  const columns = useMemo(
    () => getCustomizationColumns({ onReview }),
    [onReview],
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
