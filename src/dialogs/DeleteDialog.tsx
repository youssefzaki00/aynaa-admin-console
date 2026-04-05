import BaseDialog from "@/components/BaseDialog";
import DialogActionButtons from "@/components/DialogActionButtons";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title = "Delete",
  description = "Are you sure you want to delete this item?",
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
            submitLabel="Confirm Delete"
            onSubmit={onConfirm}
          />
        </div>
      </div>
    </BaseDialog>
  );
}
