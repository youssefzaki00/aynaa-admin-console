import { useState, useCallback } from "react";

export interface FilterValues {
  [key: string]: string;
}

export interface UseFiltersProps {
  initialFilters?: FilterValues;
  onFilterChange?: (filters: FilterValues) => void;
}

export function useFilters({
  initialFilters = {},
  onFilterChange,
}: UseFiltersProps = {}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value };
        onFilterChange?.(next);
        return next;
      });
      setPage(1);
    },
    [onFilterChange],
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearch("");
    setPage(1);
  }, [initialFilters]);

  return {
    page,
    setPage,
    search,
    setSearch,
    filters,
    setFilters,
    handleSearchChange,
    handleFilterChange,
    resetFilters,
  };
}

export interface FiltersHook {
  page: number;
  setPage: (page: number) => void;
  search: string;
  filters: Record<string, string>;
  handleSearchChange: (value: string) => void;
  handleFilterChange: (key: string, value: string) => void;
}
