import { cn } from "@/lib/utils";
import type { DetailRow } from "@/config/common/details.config";
import { FileText, Copy } from "lucide-react";
import { handleCopy } from "@/lib/utils";

interface DetailRowItemProps {
  row: DetailRow;
}

export function DetailRowItem({ row }: DetailRowItemProps) {
  const isId = row.label === "ID";

  if (row.fullWidth) {
    return (
      <div className="bg-accent/30 rounded-lg px-4 py-3 border border-border/50 w-full">
        <h3 className="font-semibold text-sm text-foreground mb-1">
          {row.label}
        </h3>
        <div className="text-muted-foreground text-sm">
          {row.value}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors",
        row.variant === "status" ? "bg-primary/10" : "bg-accent/30",
      )}
    >
      {isId ? (
        <button
          onClick={() => handleCopy(row.value as string)}
          className="hover:opacity-70 transition-opacity"
          title="Copy"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      ) : (
        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
      )}
      <span className="font-medium whitespace-nowrap">{row.label}:</span>
      <span className={cn("font-medium", isId ? "truncate max-w-[200px] font-mono text-xs" : "")}>
        {row.value}
      </span>
    </div>
  );
}
