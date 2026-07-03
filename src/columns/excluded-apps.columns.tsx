import { textColumn, statusColumn, actionsColumn } from "@/lib/column-builders";

export type ExcludedAppsColumnsHandlers = {
  onToggle: (id: string, checked: boolean) => void;
  onEdit: (item: unknown) => void;
  onDelete: (item: unknown) => void;
};

export function getExcludedAppsColumns(handlers: ExcludedAppsColumnsHandlers) {
  const { onToggle, onEdit, onDelete } = handlers;

  return [
    textColumn("Package Name", (a) => a.packageName, "font-mono text-xs", "packageName"),
    statusColumn("Active", onToggle, "isActive"),
    actionsColumn("Actions", { onEdit, onDelete }),
  ];
}
