import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Check, X, Image } from "lucide-react";

export type UninstallColumnsHandlers = {
  onReview: (item: any, action: "APPROVED" | "REJECTED") => void;
  onImagePreview: (urls: string[]) => void;
};

export function getUninstallColumns(handlers: UninstallColumnsHandlers) {
  const { onReview, onImagePreview } = handlers;

  return [
    {
      key: "device",
      label: "Device",
      render: (item: any) => (
        <span className="text-xs font-mono">{item.deviceId?.deviceId}</span>
      ),
    },
    {
      key: "model",
      label: "Model",
      render: (item: any) => (
        <span className="text-sm">{item.deviceId?.metadata?.model}</span>
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
      key: "images",
      label: "Images",
      render: (item: any) =>
        item.imageUrls?.length > 0 ? (
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onImagePreview(item.imageUrls)}>
            <Image className="h-3 w-3 mr-1" /> {item.imageUrls.length}
          </Button>
        ) : null,
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
      key: "unlockCode",
      label: "Unlock Code",
      render: (item: any) => (
        <span className="font-mono text-sm">{item.unlockCode || "—"}</span>
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
