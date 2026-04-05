import { useState } from "react";
import BaseDialog from "@/components/BaseDialog";
import DialogActionButtons from "@/components/DialogActionButtons";
import { Input } from "@/ui/input";

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (adminNote?: string) => void;
}

export default function ReviewDialog({ open, onClose, title, onConfirm }: ReviewDialogProps) {
  const [adminNote, setAdminNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    onConfirm(adminNote || undefined);
    setAdminNote("");
    setLoading(false);
    onClose();
  };

  return (
    <BaseDialog open={open} onClose={onClose} title={title}>
      <div className="space-y-4">
        <Input
          placeholder="Admin note (optional)"
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
        />
        <DialogActionButtons
          onCancel={onClose}
          onSubmit={handleConfirm}
          submitLabel="Confirm"
          isLoading={loading}
        />
      </div>
    </BaseDialog>
  );
}
