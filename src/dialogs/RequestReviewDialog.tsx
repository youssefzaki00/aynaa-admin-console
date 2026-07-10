import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import BaseDialog from "@/components/BaseDialog";
import DialogActionButtons from "@/components/DialogActionButtons";
import { Badge } from "@/ui/badge";
import { cn } from "@/lib/utils";
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
    title: "Approve request",
    description: "This will mark the request as approved. You can’t undo this action.",
    confirmLabel: "Approve",
    loadingLabel: "Approving...",
    submitVariant: "success" as const,
    Icon: CheckCircle2,
    iconClass: "text-success bg-success/10",
  },
  reject: {
    title: "Reject request",
    description: "This will mark the request as rejected. You can’t undo this action.",
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

        <div className="rounded-lg border border-border/60 bg-muted/30 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <DetailRow label="Type">
              <Badge variant="secondary" className="font-medium">
                {request.type || "—"}
              </Badge>
            </DetailRow>
            <DetailRow label="Status">
              <span className="text-warning font-medium">{request.status}</span>
            </DetailRow>
          </div>
          <DetailRow label="User ID">
            <span className="font-mono text-xs">{request.userId || "—"}</span>
          </DetailRow>
          {request.message ? (
            <DetailRow label="Message">
              <span className="text-muted-foreground">{request.message}</span>
            </DetailRow>
          ) : null}
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
