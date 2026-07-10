import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import BaseDialog from "@/components/BaseDialog";
import DialogActionButtons from "@/components/DialogActionButtons";
import StatusBadge from "@/components/StatusBadge";
import { cn, formatAbsoluteTime, formatRelativeTime } from "@/lib/utils";
import type { AppRequest } from "@/services/requests";

export type RequestReviewVariant = "approve" | "reject";

interface RequestReviewDialogProps {
  open: boolean;
  onClose: () => void;
  variant: RequestReviewVariant;
  request: AppRequest;
  onConfirm: () => Promise<void> | void;
}

const variantConfig = {
  approve: {
    title: "Approve uninstall request",
    description: "This will mark the uninstall request as approved. You can’t undo this action.",
    confirmLabel: "Approve",
    loadingLabel: "Approving...",
    submitVariant: "success" as const,
    Icon: CheckCircle2,
    iconClass: "text-success bg-success/10",
  },
  reject: {
    title: "Reject uninstall request",
    description: "This will mark the uninstall request as rejected. You can’t undo this action.",
    confirmLabel: "Reject",
    loadingLabel: "Rejecting...",
    submitVariant: "destructive" as const,
    Icon: XCircle,
    iconClass: "text-destructive bg-destructive/10",
  },
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <div className="text-sm text-foreground break-words">{children}</div>
    </div>
  );
}

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

export default function RequestReviewDialog({
  open,
  onClose,
  variant,
  request,
  onConfirm,
}: RequestReviewDialogProps) {
  const [loading, setLoading] = useState(false);
  const config = variantConfig[variant];
  const { Icon } = config;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      // Error toast is handled by the mutation caller
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseDialog open={open} onClose={loading ? () => {} : onClose} title={config.title} maxWidth="max-w-md">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              config.iconClass,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pt-2">
            {config.description}
          </p>
        </div>

        <div className="rounded-lg border border-border/60 bg-muted/30 p-4 space-y-4">
          <DetailRow label="Reason">
            <p className="text-foreground leading-relaxed">{request.reason || "—"}</p>
          </DetailRow>

          <div className="flex items-start justify-between gap-4">
            <DetailRow label="User ID">
              <span className="font-mono text-xs">{request.userId || "—"}</span>
            </DetailRow>
            <DetailRow label="Status">
              <StatusBadge variant={statusVariant(request.status)}>
                {request.status}
              </StatusBadge>
            </DetailRow>
          </div>

          <DetailRow label="Submitted">
            <span
              className="text-muted-foreground"
              title={formatAbsoluteTime(request.createdAt)}
            >
              {formatRelativeTime(request.createdAt)}
            </span>
          </DetailRow>
        </div>

        <DialogActionButtons
          onCancel={onClose}
          onSubmit={handleConfirm}
          submitLabel={config.confirmLabel}
          loadingLabel={config.loadingLabel}
          isLoading={loading}
          submitVariant={config.submitVariant}
          className="pt-0"
        />
      </div>
    </BaseDialog>
  );
}
