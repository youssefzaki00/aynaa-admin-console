import { textColumn, statusColumn, actionsColumn, detailAction, type OpenDialogFn } from "@/lib/column-builders";

export type CategoryColumnsHandlers = {
  onToggle: (id: string, enabled: boolean) => void;
  openDialog: OpenDialogFn;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

export function getCategoryColumns(handlers: CategoryColumnsHandlers) {
  const { onToggle, openDialog, onEdit, onDelete } = handlers;

  return [
    textColumn("Name", (c) => c.name, "font-mono text-xs", "name"),
    textColumn("Display Name", (c) => c.displayName, undefined, "displayName"),
    {
      key: "description",
      label: "Description",
      render: (item: any) => (
        <span className="text-muted-foreground text-sm max-w-xs truncate block">
          {item.description || "—"}
        </span>
      ),
    },
    statusColumn("Status", onToggle),
    actionsColumn("Actions", {
      onInfo: detailAction("category", openDialog),
      onEdit,
      onDelete,
    }),
  ];
}
