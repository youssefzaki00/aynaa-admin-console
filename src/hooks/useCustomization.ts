import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customizationService } from "@/services/customization";
import { toast } from "sonner";

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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customization"] });
      toast.success("Request reviewed");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
