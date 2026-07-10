import { Check, X } from "lucide-react";
import { textColumn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import StatusBadge from "@/components/StatusBadge";
import type { AppRequest } from "@/services/requests";

function statusVariant(status: string): "pending" | "approved" | "declined" | "rejected" | "inactive" {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "pending";
    case "APPROVED":
      return "approved";
    case "DECLINED":
      return "declined";
    case "REJECTED":
      return "rejected";
    default:
      return "inactive";
  }
}

function formatType(type: string) {
  if (!type) return "—";
  return type
    .toLowerCase()
    .split(/[_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export type RequestsColumnsHandlers = {
  onApprove: (item: AppRequest) => void;
  onReject: (item: AppRequest) => void;
};

export function getRequestsColumns(handlers: RequestsColumnsHandlers) {
  const { onApprove, onReject } = handlers;

  return [
    textColumn("User ID", (r) => r.userId || "—", "text-muted-foreground text-xs font-mono max-w-xs", "userId"),
    {
      key: "type",
      label: "Type",
      render: (item: AppRequest) => (
        <Badge variant="secondary" className="font-medium">
          {formatType(item.type)}
        </Badge>
      ),
    },
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
      key: "message",
      label: "Message",
      render: (item: AppRequest) => (
        <p
          className="text-muted-foreground text-xs max-w-[240px] truncate"
          title={item.message || undefined}
        >
          {item.message || "—"}
        </p>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center" as const,
      render: (item: AppRequest) => {
        const isPending = item.status?.toUpperCase() === "PENDING";
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
