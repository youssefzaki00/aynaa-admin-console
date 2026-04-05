import { Pencil, Trash2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableActionsProps {
  onInfo?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export default function TableActions({
  onInfo,
  onEdit,
  onDelete,
  className,
}: TableActionsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {onInfo && (
        <button
          type="button"
          onClick={onInfo}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="Details"
        >
          <Info className="h-3.5 w-3.5" />
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
