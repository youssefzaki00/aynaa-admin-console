import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  totalItems?: number;
  pageSize?: number;
}

type PageItem = number | "ellipsis";

function getPageRange(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range: PageItem[] = [];
  const delta = 1;
  const left = current - delta;
  const right = current + delta;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i <= right)) {
      range.push(i);
    } else if (range[range.length - 1] !== "ellipsis") {
      range.push("ellipsis");
    }
  }

  return range;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  totalItems,
  pageSize = 20,
}: CustomPaginationProps) {
  const pages = getPageRange(currentPage, totalPages);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const rangeStart = totalItems ? (currentPage - 1) * pageSize + 1 : undefined;
  const rangeEnd = totalItems
    ? Math.min(currentPage * pageSize, totalItems)
    : undefined;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground tabular-nums">
        {totalItems != null && rangeStart != null && rangeEnd != null ? (
          <>
            Showing <span className="font-medium text-foreground">{rangeStart}</span>
            {" – "}
            <span className="font-medium text-foreground">{rangeEnd}</span>
            {" of "}
            <span className="font-medium text-foreground">{totalItems}</span>
          </>
        ) : (
          <>
            Page <span className="font-medium text-foreground">{currentPage}</span>
            {" of "}
            <span className="font-medium text-foreground">{totalPages}</span>
          </>
        )}
      </p>

      <nav
        role="navigation"
        aria-label="pagination"
        className="flex items-center justify-center gap-1"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          aria-label="Go to previous page"
          className="h-9 gap-1 px-3 text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center gap-1 px-1">
          {pages.map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden
                className="flex h-9 w-9 items-center justify-center text-muted-foreground"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                variant={item === currentPage ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(item)}
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`Go to page ${item}`}
                className={cn(
                  "h-9 w-9 text-sm font-medium tabular-nums",
                  item === currentPage
                    ? "pointer-events-none shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item}
              </Button>
            ),
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="Go to next page"
          className="h-9 gap-1 px-3 text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}
