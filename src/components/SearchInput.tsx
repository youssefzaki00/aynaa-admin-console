import { Search, X } from "lucide-react";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  inputClassName,
}: SearchInputProps) {
  const hasValue = value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        role="searchbox"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "bg-background/50 border-border/50 pl-9",
          hasValue && "pr-9",
          inputClassName,
        )}
      />
      {hasValue && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
