import BaseDialog from "@/components/BaseDialog";
import DialogActionButtons from "@/components/DialogActionButtons";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title = "Delete",
  description = "Are you sure you want to delete this item?",
  confirmLabel = "Confirm Delete",
}: DeleteDialogProps) {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center space-y-6">
        <p className="text-muted-foreground text-center">
          {description}
        </p>
        <div className="w-full">
          <DialogActionButtons
            onCancel={onClose}
            submitLabel={confirmLabel}
            onSubmit={onConfirm}
          />
        </div>
      </div>
    </BaseDialog>
  );
}
