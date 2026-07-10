import { useDialog } from "@/lib/dialog-context";
import { toast } from "sonner";
import { useUpdateRequest } from "@/hooks/useRequests";
import type { FiltersHook } from "@/hooks/use-filters";
import type { AppRequest, RequestStatus } from "@/services/requests";

export function useRequestCustomSetup(_args: {
  filtersHook: FiltersHook;
  data: AppRequest[];
  rawData: unknown;
}) {
  const { openDialog } = useDialog();
  const update = useUpdateRequest();

  const openReview = (item: AppRequest, status: RequestStatus) => {
    const isApprove = status === "APPROVED";

    openDialog("request-review", {
      variant: isApprove ? "approve" : "reject",
      request: item,
      onConfirm: async () => {
        try {
          await update.mutateAsync({ id: item.id, data: { status } });
          toast.success(isApprove ? "Request approved" : "Request rejected");
        } catch (err) {
          const message =
            err && typeof err === "object" && "message" in err
              ? String((err as { message?: string }).message)
              : undefined;
          toast.error(message ?? "Something went wrong");
          throw err;
        }
      },
    });
  };

  return {
    customColumnHandlers: {
      onApprove: (item: AppRequest) => openReview(item, "APPROVED"),
      onReject: (item: AppRequest) => openReview(item, "REJECTED"),
    },
  };
}
