import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/ui/button";
import SearchInput from "@/components/SearchInput";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterPanel?: React.ReactNode;
  onAdd?: () => void;
  addLabel?: string;
  total?: number;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  icon,
  action,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  filterPanel,
  onAdd,
  addLabel = "Add",
  total,
  className,
}: PageHeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);

  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (!onSearchChange || localSearch === searchValue) return;
    const timeout = setTimeout(() => {
      onSearchChange(localSearch);
    }, 400);
    return () => clearTimeout(timeout);
  }, [localSearch, onSearchChange, searchValue]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value);
      if (value === "") {
        onSearchChange?.("");
      }
    },
    [onSearchChange],
  );

  return (
    <header className={cn("flex flex-col sm:flex-row sm:items-center gap-4 mb-8 p-6 bg-card rounded-xl border border-border", className)}>
      <div className="flex items-center gap-4 shrink-0">
        {icon ? (
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
            {icon}
          </div>
        ) : (
          <div className="w-1 h-12 bg-primary rounded-full"></div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {total !== undefined && (
              <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground">
                {total}
              </span>
            )}
          </div>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>

      {(onSearchChange || filterPanel) && (
        <div className="flex items-center gap-2 flex-1 min-w-0 max-w-md">
          {onSearchChange && (
            <SearchInput
              className="flex-1"
              placeholder={searchPlaceholder}
              value={localSearch}
              onChange={handleSearchChange}
            />
          )}
          {filterPanel}
        </div>
      )}

      {(action || onAdd) && (
        <div className="flex items-center gap-2 ml-auto shrink-0">
          {action}
          {onAdd && (
            <Button size="sm" onClick={onAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4 mr-1" /> {addLabel}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
