import { Label } from "@/ui/label";
import { cn } from "@/lib/utils";

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
  required?: boolean;
}

export default function FormGroup({
  label,
  children,
  className,
  error,
  required,
}: FormGroupProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-sm font-medium text-foreground flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        {children}
      </div>
      {error && (
        <p className="text-sm text-destructive font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
