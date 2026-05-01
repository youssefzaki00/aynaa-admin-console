import { textColumn, actionsColumn, detailAction, type OpenDialogFn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";

export type ExcludedAppsColumnsHandlers = {
  openDialog: OpenDialogFn;
  onEdit: (item: unknown) => void;
  onDelete: (item: unknown) => void;
};

export function getExcludedAppsColumns(handlers: ExcludedAppsColumnsHandlers) {
  const { openDialog, onEdit, onDelete } = handlers;

  return [
    textColumn("Package Name", (a) => a.packageName, "font-mono text-xs", "packageName"),
    {
      key: "isActive",
      label: "Status",
      align: "center" as const,
      render: (item: { isActive: boolean }) => (
        <Badge variant={item.isActive ? "default" : "secondary"} className="font-medium">
          {item.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    actionsColumn("Actions", {
      onInfo: detailAction("excluded-app", openDialog),
      onEdit,
      onDelete,
    }),
  ];
}
