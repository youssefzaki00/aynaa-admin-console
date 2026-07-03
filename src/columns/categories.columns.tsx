import { textColumn, statusColumn, actionsColumn } from "@/lib/column-builders";

export type CategoryColumnsHandlers = {
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

export function getCategoryColumns(handlers: CategoryColumnsHandlers) {
  const { onToggle, onEdit, onDelete } = handlers;

  return [
    textColumn("Name", (c) => c.name, "font-mono text-xs", "name"),
    textColumn("Display Name", (c) => c.displayName, undefined, "displayName"),
    {
      key: "description",
      label: "Description",
      render: (item: { description: string | null }) => (
        <span className="text-muted-foreground text-sm max-w-xs truncate block">
          {item.description || "—"}
        </span>
      ),
    },
    statusColumn("Status", onToggle),
    actionsColumn("Actions", { onEdit, onDelete }),
  ];
}
