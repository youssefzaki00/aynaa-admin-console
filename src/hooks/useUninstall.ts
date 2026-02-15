import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uninstallService } from "@/services/uninstall";
import { toast } from "sonner";

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
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["uninstall"] });
      if (data.data.unlockCode) {
        toast.success(`Approved! Unlock code: ${data.data.unlockCode}`);
      } else {
        toast.success("Request reviewed");
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
