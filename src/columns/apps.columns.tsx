import { textColumn, statusColumn, actionsColumn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";
import type { App } from "@/services/apps";

export type AppsColumnsHandlers = {
  onToggle: (id: string, checked: boolean) => void;
  onEdit: (item: unknown) => void;
  onDelete: (item: unknown) => void;
};

export function getAppsColumns(handlers: AppsColumnsHandlers) {
  const { onToggle, onEdit, onDelete } = handlers;

  return [
    textColumn("Package Name", (a) => a.packageName, "font-mono text-xs", "packageName"),
    {
      key: "isDeleted",
      label: "Deleted",
      align: "center" as const,
      render: (item: App) => (
        <Badge variant={item.isDeleted ? "destructive" : "secondary"} className="font-medium">
          {item.isDeleted ? "Yes" : "No"}
        </Badge>
      ),
    },
    statusColumn("Active", onToggle, "isActive"),
    actionsColumn("Actions", { onEdit, onDelete }),
  ];
}
