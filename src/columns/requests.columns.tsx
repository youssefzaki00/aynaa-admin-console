import { textColumn, actionsColumn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";
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

export type RequestsColumnsHandlers = {
  onEdit: (item: unknown) => void;
};

export function getRequestsColumns(handlers: RequestsColumnsHandlers) {
  const { onEdit } = handlers;

  return [
  textColumn("User ID", (r) => r.userId || "—", "text-muted-foreground text-xs max-w-xs", "userId"),
    {
      key: "type",
      label: "Type",
      render: (item: AppRequest) => (
        <Badge variant="secondary" className="font-medium">
          {item.type}
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
    textColumn("Message", (r) => r.message || "—", "text-muted-foreground text-xs max-w-xs", "message"),
    actionsColumn("Actions", { onEdit }),
  ];
}
