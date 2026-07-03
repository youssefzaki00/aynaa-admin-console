import { textColumn, actionsColumn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";
import type { Site } from "@/services/sites";

export type SiteColumnsHandlers = {
  onToggle: (id: string) => void;
  onEdit: (item: unknown) => void;
  onDelete: (item: unknown) => void;
};

export function getSiteColumns(handlers: SiteColumnsHandlers) {
  const { onEdit, onDelete } = handlers;

  return [
    textColumn("URL", (s: Site) => s.url, "font-mono text-xs", "url"),
    {
      key: "category",
      label: "Category",
      render: (item: Site) => (
        <span className="text-sm text-muted-foreground">
          {item.category.displayName || item.category.name}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      align: "center" as const,
      render: (item: Site) => (
        <Badge variant={item.isActive ? "default" : "secondary"} className="font-medium">
          {item.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    actionsColumn("Actions", { onEdit, onDelete }),
  ];
}
