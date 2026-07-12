import type { LucideIcon } from "lucide-react";
import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/lib/utils";

export interface ViewTooltipProps {
  value?: string | null;
  triggerLabel: string;
  triggerIcon: LucideIcon;
  title: string;
  subtitle: string;
  headerIcon?: LucideIcon;
  footer?: (value: string) => string;
  ariaLabel?: string;
  valueClassName?: string;
}

export default function ViewTooltip({
  value,
  triggerLabel,
  triggerIcon: TriggerIcon,
  title,
  subtitle,
  headerIcon,
  footer,
  ariaLabel,
  valueClassName,
}: ViewTooltipProps) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return <span className="text-muted-foreground text-xs">—</span>;
  }

  const HeaderIcon = headerIcon ?? TriggerIcon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-xs border-dashed border-border/70 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5"
          aria-label={ariaLabel ?? `View ${triggerLabel.toLowerCase()}`}
        >
          <TriggerIcon className="h-3.5 w-3.5" />
          {triggerLabel}
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
            <HeaderIcon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground">{title}</p>
            <p className="text-[11px] text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto px-4 py-3.5 bg-card">
          <p
            className={cn(
              "text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words",
              valueClassName,
            )}
          >
            {trimmed}
          </p>
        </div>
        {footer && (
          <div className="border-t border-border/60 bg-muted/30 px-4 py-2">
            <p className="text-[11px] text-muted-foreground tabular-nums">
              {footer(trimmed)}
            </p>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
