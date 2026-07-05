import { textColumn, statusColumn, actionsColumn } from "@/lib/column-builders";
import { siteCategoryLabel, type Site } from "@/services/sites";

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
          {siteCategoryLabel(item.category)}
        </span>
      ),
    },
    statusColumn("Active", onToggle, "isActive"),
    actionsColumn("Actions", { onEdit, onDelete }),
  ];
}
