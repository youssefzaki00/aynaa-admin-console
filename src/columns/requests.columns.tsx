import { Check, Eye, MessageSquare, X } from "lucide-react";
import { textColumn } from "@/lib/column-builders";
import { formatAbsoluteTime, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
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
    textColumn("User ID", (r) => r.userId || "—", "text-muted-foreground text-xs font-mono max-w-xs", "userId"),
    {
      key: "reason",
      label: "Reason",
      render: (item: AppRequest) =>
        item.reason ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs border-dashed border-border/70 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5"
                aria-label="View reason"
              >
                <Eye className="h-3.5 w-3.5" />
                View
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="start"
              sideOffset={8}
              className="p-0 max-w-md w-[min(28rem,calc(100vw-2rem))] overflow-hidden rounded-lg border-border/60 shadow-lg"
            >
              <div className="flex items-center gap-2 border-b border-border/60 bg-muted/50 px-4 py-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <MessageSquare className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">Uninstall reason</p>
                  <p className="text-[11px] text-muted-foreground">Submitted by user</p>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto px-4 py-3.5 bg-card">
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
                  {item.reason}
                </p>
              </div>
              <div className="border-t border-border/60 bg-muted/30 px-4 py-2">
                <p className="text-[11px] text-muted-foreground tabular-nums">
                  {item.reason.length} / 2000 characters
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
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
