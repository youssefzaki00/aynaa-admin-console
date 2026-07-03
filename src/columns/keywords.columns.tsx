import { textColumn, statusColumn, actionsColumn } from "@/lib/column-builders";
import { Badge } from "@/ui/badge";

export type KeywordColumnsHandlers = {
  onToggle: (id: string) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

export function getKeywordColumns(handlers: KeywordColumnsHandlers) {
  const { onToggle, onEdit, onDelete } = handlers;

  return [
    textColumn("Word", (k) => k.word, "font-mono text-xs", "word"),
    {
      key: "category",
      label: "Category",
      render: (item: { category?: { displayName?: string } }) => (
        <Badge variant="secondary" className="font-medium">
          {item.category?.displayName || "—"}
        </Badge>
      ),
    },
    statusColumn("Active", onToggle, "isEnabled"),
    actionsColumn("Actions", { onEdit, onDelete }),
  ];
}
