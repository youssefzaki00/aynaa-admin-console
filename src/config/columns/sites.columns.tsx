import { textColumn, actionsColumn, detailAction, type OpenDialogFn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";

export type SiteColumnsHandlers = {
  onToggle: (id: string) => void;
  openDialog: OpenDialogFn;
  onEdit: (item: unknown) => void;
  onDelete: (item: unknown) => void;
};

function categoryLabel(item: {
  category?: { displayName?: string; name?: string };
  categoryId?: string;
}) {
  return item.category?.displayName ?? item.category?.name ?? item.categoryId ?? "—";
}

export function getSiteColumns(handlers: SiteColumnsHandlers) {
  const { openDialog, onEdit, onDelete } = handlers;

  return [
    // textColumn("Name", (s) => (s as { name?: string }).name || "—", "font-medium max-w-[140px] truncate", "name"),
    textColumn("URL", (s) => (s as { url: string }).url, "font-mono text-xs", "url"),
    {
      key: "category",
      label: "Category",
      render: (item: Parameters<typeof categoryLabel>[0]) => (
        <span className="text-sm text-muted-foreground">{categoryLabel(item)}</span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      align: "center" as const,
      render: (item: { isActive?: boolean }) => (
        <Badge variant={item.isActive ? "default" : "secondary"} className="font-medium">
          {item.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    actionsColumn("Actions", {
      onInfo: detailAction("site", openDialog),
      onEdit,
      onDelete,
    }),
  ];
}
