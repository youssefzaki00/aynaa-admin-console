import { Check, Pencil, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  className?: string;
}

export default function TableActions({
  onEdit,
  onDelete,
  onApprove,
  onReject,
  className,
}: TableActionsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {onApprove && (
        <button
          type="button"
          onClick={onApprove}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-500/10 transition-colors"
          title="Approve"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
      )}
      {onReject && (
        <button
          type="button"
          onClick={onReject}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors"
          title="Reject"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
