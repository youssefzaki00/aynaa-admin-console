import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { cn } from "@/lib/utils";

interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function BaseDialog({
  open,
  onClose,
  title,
  children,
  className,
  maxWidth = "max-w-lg",
}: BaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => (!o && onClose())}>
      <DialogContent
        className={cn(
          "bg-card border-border max-h-[80vh] overflow-y-auto",
          maxWidth,
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
