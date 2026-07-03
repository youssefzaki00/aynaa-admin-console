import { Badge } from "@/ui/badge";
import { Switch } from "@/ui/switch";
import { cn } from "@/lib/utils";
import TableActions from "@/components/TableActions";
import type { DialogName, DialogParamsMap } from "./dialog-types";

export type OpenDialogFn = <K extends DialogName>(
  name: K,
  params: DialogParamsMap[K],
) => void;

export const deleteAction = (
  title: string,
  description: string,
  onDelete: (id: string) => void,
  openDialog: OpenDialogFn,
) => {
  return (item: any) =>
    openDialog("delete", {
      title,
      description,
      onConfirm: () => onDelete(item.id),
      data: item,
    });
};

export const textColumn = (
  label: string,
  getValue: (item: any) => string,
  className?: string,
  dataKey?: string,
) => ({
  key: dataKey || label,
  label,
  render: (item: any) => (
    <span className={cn("font-medium text-foreground", className)}>
      {getValue(item)}
    </span>
  ),
});

export const badgeColumn = (
  label: string,
  getValue: (item: any) => any,
  suffix = "",
  dataKey?: string,
) => ({
  key: dataKey || label,
  label,
  align: "center" as const,
  render: (item: any) => (
    <Badge variant="secondary" className="font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
      {getValue(item)} {suffix}
    </Badge>
  ),
});

export const statusColumn = (
  label: string,
  onToggle: (id: string, checked: boolean) => void,
  statusKey = "isActive",
) => ({
  key: statusKey,
  label,
  align: "center" as const,
  render: (item: any) => (
    <div className="flex items-center justify-center">
      <Switch
        checked={item[statusKey]}
        onCheckedChange={(checked) => onToggle(item.id, checked)}
      />
    </div>
  ),
});

export const actionsColumn = (
  label: string,
  config: {
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
  },
) => ({
  key: "actions",
  label,
  align: "center" as const,
  render: (item: any) => (
    <TableActions
      onEdit={config.onEdit ? () => config.onEdit!(item) : undefined}
      onDelete={config.onDelete ? () => config.onDelete!(item) : undefined}
    />
  ),
});
