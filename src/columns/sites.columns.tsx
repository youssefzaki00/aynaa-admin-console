import { textColumn, statusColumn, actionsColumn } from "@/lib/column-builders";
import type { Site } from "@/services/sites";

export type SiteColumnsHandlers = {
  onToggle: (id: string, checked: boolean) => void;
  onEdit: (item: unknown) => void;
  onDelete: (item: unknown) => void;
};

export function getSiteColumns(handlers: SiteColumnsHandlers) {
  const { onToggle, onEdit, onDelete } = handlers;

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
    statusColumn("Active", onToggle, "isActive"),
    actionsColumn("Actions", { onEdit, onDelete }),
  ];
}
