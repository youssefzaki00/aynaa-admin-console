import { textColumn, statusColumn, actionsColumn, detailAction, type OpenDialogFn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";

export type KeywordColumnsHandlers = {
  onToggle: (id: string) => void;
  openDialog: OpenDialogFn;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

export function getKeywordColumns(handlers: KeywordColumnsHandlers) {
  const { onToggle, openDialog, onEdit, onDelete } = handlers;

  return [
    textColumn("Word", (k) => k.word, "font-mono text-xs", "word"),
    {
      key: "category",
      label: "Category",
      render: (item: any) => (
        <Badge variant="secondary" className="font-medium">
          {item.category?.displayName || "—"}
        </Badge>
      ),
    },
    statusColumn("Status", onToggle, "isEnabled"),
    actionsColumn("Actions", {
      onInfo: detailAction("keyword", openDialog),
      onEdit,
      onDelete,
    }),
  ];
}
