import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CustomPagination from "@/components/CustomPagination";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  align?: "right" | "center" | "left";
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  header?: React.ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  serverSide?: boolean;
  serverTotalPages?: number;
  serverCurrentPage?: number;
  onServerPageChange?: (page: number) => void;
}

export default function DataTable<T>({
  data,
  columns,
  pageSize = 20,
  header,
  searchValue: controlledSearch,
  serverSide = false,
  serverTotalPages,
  serverCurrentPage,
  onServerPageChange,
}: DataTableProps<T>) {
  const [internalSearch, setInternalSearch] = useState("");
  const [page, setPage] = useState(1);

  const search = controlledSearch ?? internalSearch;

  useEffect(() => {
    if (!serverSide) setPage(1);
  }, [search, serverSide]);

  const filtered = serverSide
    ? data
    : data.filter((item) => {
        if (!search) return true;
        return columns.some((col) => {
          const val = (item as any)[col.key];
          return (
            typeof val === "string" &&
            val.toLowerCase().includes(search.toLowerCase())
          );
        });
      });

  const rows = serverSide
    ? filtered
    : filtered.slice((page - 1) * pageSize, page * pageSize);

  const totalPages = serverSide
    ? (serverTotalPages ?? 1)
    : Math.ceil(filtered.length / pageSize);

  const currentPage = serverSide ? (serverCurrentPage ?? 1) : page;
  const handlePageChange = serverSide
    ? (onServerPageChange ?? (() => {}))
    : setPage;

  return (
    <div className="space-y-4">
      {header}

      <div className="border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-accent/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-sm font-semibold text-foreground",
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                          ? "text-right"
                          : "text-left",
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                rows.map((item: any, idx: number) => (
                  <tr
                    key={(item as any).id ?? idx}
                    className="border-b border-border/30 hover:bg-accent/20 transition-colors"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-3 text-sm",
                          col.align === "center"
                            ? "text-center"
                            : col.align === "right"
                              ? "text-right"
                              : "text-left",
                        )}
                      >
                        {col.render
                          ? col.render(item)
                          : String((item as any)[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-border/50">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
