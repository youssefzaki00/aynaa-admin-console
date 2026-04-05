import { textColumn, actionsColumn, detailAction, type OpenDialogFn } from "@/lib/column-builders";

export type WhitelistColumnsHandlers = {
  openDialog: OpenDialogFn;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

export function getWhitelistColumns(handlers: WhitelistColumnsHandlers) {
  const { openDialog, onEdit, onDelete } = handlers;

  return [
    textColumn("App Name", (a) => a.appName, "font-medium", "appName"),
    textColumn("Package Name", (a) => a.packageName, "font-mono text-xs text-muted-foreground", "packageName"),
    actionsColumn("Actions", {
      onInfo: detailAction("whitelist", openDialog),
      onEdit,
      onDelete,
    }),
  ];
}
