import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

interface DialogActionButtonsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
}

export default function DialogActionButtons({
  onCancel,
  onSubmit,
  isLoading,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  className,
}: DialogActionButtonsProps) {
  return (
    <div className={cn("flex gap-3 pt-4", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1 bg-background/50 border-border/50"
      >
        {cancelLabel}
      </Button>
      <Button
        type={onSubmit ? "button" : "submit"}
        disabled={isLoading}
        onClick={onSubmit}
        className="flex-1 bg-primary hover:bg-primary/90"
      >
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </div>
  );
}
