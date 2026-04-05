import BaseDialog from "@/components/BaseDialog";

interface ImagePreviewDialogProps {
  open: boolean;
  onClose: () => void;
  urls: string[];
}

export default function ImagePreviewDialog({ open, onClose, urls }: ImagePreviewDialogProps) {
  return (
    <BaseDialog open={open} onClose={onClose} title="Attached Images" className="max-w-2xl">
      <div className="grid grid-cols-2 gap-3">
        {urls?.map((url, i) => (
          <img key={i} src={url} alt={`Attachment ${i + 1}`} className="rounded-md w-full object-cover" />
        ))}
      </div>
    </BaseDialog>
  );
}
