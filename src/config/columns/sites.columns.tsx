import { textColumn, actionsColumn, detailAction, type OpenDialogFn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";

export type SiteColumnsHandlers = {
  onToggle: (id: string) => void;
  openDialog: OpenDialogFn;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

export function getSiteColumns(handlers: SiteColumnsHandlers) {
  const { openDialog, onEdit, onDelete } = handlers;

  return [
    textColumn("URL", (s) => s.url, "font-mono text-xs", "url"),
    {
      key: "isActive",
      label: "Status",
      align: "center" as const,
      render: (item: any) => (
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
