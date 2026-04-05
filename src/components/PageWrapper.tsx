import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  isLoading?: boolean;
  error?: any;
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ isLoading, error, children, className }: PageWrapperProps) {
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={(error as Error)?.message || "Failed to load data"} />;

  return (
    <div className={cn("animate-in fade-in duration-300", className)}>
      {children}
    </div>
  );
}
