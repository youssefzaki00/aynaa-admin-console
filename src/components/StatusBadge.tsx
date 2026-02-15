import { cn } from "@/lib/utils";

type StatusVariant = "active" | "inactive" | "pending" | "approved" | "rejected";

const variants: Record<StatusVariant, string> = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
}

export default function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", variants[variant])}>
      {children}
    </span>
  );
}
