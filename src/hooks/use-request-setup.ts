import { useDialog } from "@/lib/dialog-context";
import { mutationCallbacks } from "@/lib/utils";
import { useUpdateRequest } from "@/hooks/useRequests";
import type { FiltersHook } from "@/hooks/use-filters";
import type { AppRequest, RequestStatus } from "@/services/requests";

export function useRequestCustomSetup(_args: {
  filtersHook: FiltersHook;
  data: AppRequest[];
  rawData: unknown;
}) {
  const { openDialog, closeDialog } = useDialog();
  const update = useUpdateRequest();

  const confirmStatusChange = (item: AppRequest, status: RequestStatus) => {
    const isApprove = status === "APPROVED";
    const action = isApprove ? "approve" : "reject";

    openDialog("delete", {
      title: isApprove ? "Approve Request" : "Reject Request",
      description: `Are you sure you want to ${action} this request? This action cannot be undone.`,
      confirmLabel: isApprove ? "Confirm Approve" : "Confirm Reject",
      onConfirm: () => {
        update.mutate(
          { id: item.id, data: { status } },
          mutationCallbacks(
            isApprove ? "Request approved" : "Request rejected",
            undefined,
            closeDialog,
          ),
        );
      },
    });
  };

  return {
    customColumnHandlers: {
      onApprove: (item: AppRequest) => confirmStatusChange(item, "APPROVED"),
      onReject: (item: AppRequest) => confirmStatusChange(item, "REJECTED"),
    },
  };
}
