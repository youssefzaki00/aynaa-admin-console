import { AlertCircle } from "lucide-react";

export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-12 gap-2 text-destructive">
      <AlertCircle className="h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
