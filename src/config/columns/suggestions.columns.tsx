import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Check, X } from "lucide-react";

export type SuggestionsColumnsHandlers = {
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export function getSuggestionColumns(handlers: SuggestionsColumnsHandlers) {
  const { onApprove, onReject } = handlers;

  return [
    {
      key: "content",
      label: "Content",
      render: (item: any) => (
        <span className="font-mono text-sm">{item.content}</span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (item: any) => (
        <span className="text-xs">{item.type.replace(/_/g, " ")}</span>
      ),
    },
    {
      key: "device",
      label: "Device",
      render: (item: any) => (
        <span className="text-xs text-muted-foreground">{item.deviceId?.deviceId}</span>
      ),
    },
    {
      key: "note",
      label: "Note",
      render: (item: any) => (
        <span className="text-sm text-muted-foreground max-w-xs truncate block">{item.note}</span>
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
            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600" onClick={() => onApprove(item.id)}>
              <Check className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onReject(item.id)}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : null,
    },
  ];
}
