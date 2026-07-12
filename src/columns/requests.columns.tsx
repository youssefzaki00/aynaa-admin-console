import { Check, Fingerprint, Hash, MessageSquare, User, X } from "lucide-react";
import { viewTooltipColumn } from "@/lib/column-builders";
import { formatAbsoluteTime, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/ui/button";
import StatusBadge from "@/components/StatusBadge";
import type { AppRequest } from "@/services/requests";

function statusVariant(status: string): "pending" | "approved" | "rejected" | "inactive" {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "pending";
    case "APPROVED":
      return "approved";
    case "REJECTED":
      return "rejected";
    default:
      return "inactive";
  }
}

export type RequestsColumnsHandlers = {
  onApprove: (item: AppRequest) => void;
  onReject: (item: AppRequest) => void;
};

export function getRequestsColumns(handlers: RequestsColumnsHandlers) {
  const { onApprove, onReject } = handlers;

  return [
    viewTooltipColumn<AppRequest>("id", "ID", (r) => r.id, {
      triggerLabel: "ID",
      triggerIcon: Hash,
      headerIcon: Fingerprint,
      title: "Request ID",
      subtitle: "Unique identifier for this request",
      footer: (value) => `${value.length} characters`,
      ariaLabel: "View request ID",
      valueClassName: "break-all font-mono",
    }),
    viewTooltipColumn<AppRequest>("userId", "User ID", (r) => r.userId, {
      triggerLabel: "User",
      triggerIcon: User,
      title: "User ID",
      subtitle: "Account that submitted this request",
      footer: (value) => `${value.length} characters`,
      ariaLabel: "View user ID",
      valueClassName: "break-all font-mono",
    }),
    viewTooltipColumn<AppRequest>("reason", "Reason", (r) => r.reason, {
      triggerLabel: "Reason",
      triggerIcon: MessageSquare,
      title: "Uninstall reason",
      subtitle: "Feedback provided by the user",
      footer: (value) => `${value.length} / 2000 characters`,
      ariaLabel: "View uninstall reason",
    }),
    {
      key: "status",
      label: "Status",
      align: "center" as const,
      render: (item: AppRequest) => (
        <StatusBadge variant={statusVariant(item.status)}>
          {item.status}
        </StatusBadge>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (item: AppRequest) => (
        <span
          className="text-muted-foreground text-xs whitespace-nowrap"
          title={formatAbsoluteTime(item.createdAt)}
        >
          {formatRelativeTime(item.createdAt)}
        </span>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated",
      render: (item: AppRequest) => (
        <span
          className="text-muted-foreground text-xs whitespace-nowrap"
          title={formatAbsoluteTime(item.updatedAt)}
        >
          {formatRelativeTime(item.updatedAt)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center" as const,
      render: (item: AppRequest) => {
        const isPending = item.status === "PENDING";
        if (!isPending) {
          return (
            <span className="text-muted-foreground/60 text-xs italic">Reviewed</span>
          );
        }

        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onApprove(item)}
              className="h-8 gap-1.5 border-success/30 text-success hover:bg-success/10 hover:text-success"
            >
              <Check className="h-3.5 w-3.5" />
              Approve
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => onReject(item)}
              className="h-8 gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
              Reject
            </Button>
          </div>
        );
      },
    },
  ];
}
