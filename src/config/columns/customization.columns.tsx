import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Check, X } from "lucide-react";

export type CustomizationColumnsHandlers = {
  onReview: (item: any, action: "APPROVED" | "REJECTED") => void;
};

export function getCustomizationColumns(handlers: CustomizationColumnsHandlers) {
  const { onReview } = handlers;

  return [
    {
      key: "content",
      label: "Content",
      render: (item: any) => (
        <span className="font-mono text-sm">{item.content || item.appName}</span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (item: any) => (
        <span className="text-xs">{item.type.replace(/CUSTOM_/g, "").replace(/_/g, " ")}</span>
      ),
    },
    {
      key: "device",
      label: "Device",
      render: (item: any) => (
        <span className="text-xs text-muted-foreground">{item.deviceId}</span>
      ),
    },
    {
      key: "reason",
      label: "Reason",
      render: (item: any) => (
        <span className="text-sm text-muted-foreground max-w-xs truncate block">{item.reason}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: any) => (
        <Badge variant={item.status === "PENDING" ? "secondary" : item.status === "APPROVED" ? "default" : "destructive"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center" as const,
      render: (item: any) =>
        item.status === "PENDING" ? (
          <div className="flex gap-1 justify-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => onReview(item, "APPROVED")}>
              <Check className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onReview(item, "REJECTED")}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : null,
    },
  ];
}
