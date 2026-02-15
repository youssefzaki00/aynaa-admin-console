import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControls";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useSuggestions, useReviewSuggestion } from "@/hooks/useSuggestions";
import { Check, X } from "lucide-react";

export default function SuggestionsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("PENDING");
  const { data, isLoading, error } = useSuggestions({ page, limit: 20, status: statusFilter || undefined });
  const reviewMutation = useReviewSuggestion();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={(error as Error).message} />;

  const suggestions = data?.data.suggestions ?? [];
  const pagination = data?.data.pagination;

  return (
    <div>
      <PageHeader
        title="Suggestions"
        description="Review user suggestions"
        action={
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suggestions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No suggestions found</TableCell>
              </TableRow>
            ) : (
              suggestions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-sm">{s.content}</TableCell>
                  <TableCell className="text-xs">{s.type.replace(/_/g, " ")}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{s.deviceId?.deviceId}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{s.note}</TableCell>
                  <TableCell>
                    <StatusBadge variant={s.status === "PENDING" ? "pending" : s.status === "APPROVED" ? "approved" : "rejected"}>
                      {s.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {s.status === "PENDING" && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success" onClick={() => reviewMutation.mutate({ id: s.id, status: "APPROVED" })}>
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => reviewMutation.mutate({ id: s.id, status: "REJECTED" })}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pagination && <div className="px-4 pb-3"><PaginationControls pagination={pagination} onPageChange={setPage} /></div>}
      </div>
    </div>
  );
}
