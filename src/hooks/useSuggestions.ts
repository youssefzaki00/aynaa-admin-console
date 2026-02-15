import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suggestionsService } from "@/services/suggestions";
import { toast } from "sonner";

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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["suggestions"] });
      toast.success("Suggestion reviewed");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
