import { useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suggestionsService } from "@/services/suggestions";
import { useFilters } from "@/hooks/use-filters";
import { getSuggestionColumns } from "@/config/columns/suggestions.columns";
import { mutationCallbacks, normalizePagination } from "@/lib/utils";
import type { Suggestion } from "@/services/suggestions";

export function useSuggestions(params?: { status?: string; type?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["suggestions", params],
    queryFn: () => suggestionsService.getAll(params),
  });
}

export function useReviewSuggestion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) =>
      suggestionsService.review(id, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["suggestions"] }); },
  });
}

export function useSuggestionsPage() {
  const filtersHook = useFilters({ initialFilters: { status: "PENDING" } });
  const statusFilter = filtersHook.filters.status ?? "PENDING";

  const { data, isLoading, error } = useSuggestions({
    page: filtersHook.page,
    limit: 20,
    status: statusFilter || undefined,
  });
  const reviewMutation = useReviewSuggestion();

  const suggestions: Suggestion[] = data?.data?.suggestions ?? [];
  const pagination = normalizePagination(data?.data?.pagination);

  const onApprove = useCallback(
    (id: string) => reviewMutation.mutate({ id, status: "APPROVED" }, mutationCallbacks("Suggestion approved")),
    [reviewMutation],
  );
  const onReject = useCallback(
    (id: string) => reviewMutation.mutate({ id, status: "REJECTED" }, mutationCallbacks("Suggestion rejected")),
    [reviewMutation],
  );

  const columns = useMemo(
    () => getSuggestionColumns({ onApprove, onReject }),
    [onApprove, onReject],
  );

  return {
    data: suggestions,
    isLoading,
    error,
    columns,
    pagination,
    statusFilter,
    filtersHook,
  };
}
