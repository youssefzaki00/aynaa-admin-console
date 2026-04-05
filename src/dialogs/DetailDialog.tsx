import BaseDialog from "@/components/BaseDialog";
import type { DetailRow } from "@/config/common/details.config";
import { DetailRowItem } from "@/components/DetailRowItem";

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  rows: DetailRow[];
}

export default function DetailDialog({ open, onClose, title, rows }: DetailDialogProps) {
  const inlineRows = rows.filter(r => !r.fullWidth);
  const fullWidthRows = rows.filter(r => r.fullWidth);

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {inlineRows.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {inlineRows.map((row, i) => (
              <DetailRowItem key={i} row={row} />
            ))}
          </div>
        )}

        {fullWidthRows.length > 0 && (
          <div className="space-y-3">
            {fullWidthRows.map((row, i) => (
              <DetailRowItem key={i} row={row} />
            ))}
          </div>
        )}
      </div>
    </BaseDialog>
  );
}
