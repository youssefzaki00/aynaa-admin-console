import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

interface DialogActionButtonsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  loadingLabel?: string;
  cancelLabel?: string;
  submitVariant?: "default" | "destructive" | "success";
  className?: string;
}

const submitVariantClass: Record<NonNullable<DialogActionButtonsProps["submitVariant"]>, string> = {
  default: "bg-primary hover:bg-primary/90 text-primary-foreground",
  destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
  success: "bg-success hover:bg-success/90 text-success-foreground",
};

export default function DialogActionButtons({
  onCancel,
  onSubmit,
  isLoading,
  submitLabel = "Save",
  loadingLabel = "Saving...",
  cancelLabel = "Cancel",
  submitVariant = "default",
  className,
}: DialogActionButtonsProps) {
  return (
    <div className={cn("flex gap-3 pt-4", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="flex-1 bg-background/50 border-border/50"
      >
        {cancelLabel}
      </Button>
      <Button
        type={onSubmit ? "button" : "submit"}
        disabled={isLoading}
        onClick={onSubmit}
        className={cn("flex-1", submitVariantClass[submitVariant])}
      >
        {isLoading ? loadingLabel : submitLabel}
      </Button>
    </div>
  );
}
