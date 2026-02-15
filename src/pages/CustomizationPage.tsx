import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControls";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useCustomizationRequests, useReviewCustomization } from "@/hooks/useCustomization";
import { Check, X } from "lucide-react";
import type { CustomizationRequest } from "@/services/customization";

export default function CustomizationPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("PENDING");
  const { data, isLoading, error } = useCustomizationRequests({ page, limit: 20, status: statusFilter || undefined });
  const reviewMutation = useReviewCustomization();

  const [reviewDialog, setReviewDialog] = useState<{ req: CustomizationRequest; action: "APPROVED" | "REJECTED" } | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const handleReview = () => {
    if (!reviewDialog) return;
    reviewMutation.mutate(
      { id: reviewDialog.req.id, status: reviewDialog.action, adminNote: adminNote || undefined },
      { onSuccess: () => { setReviewDialog(null); setAdminNote(""); } }
    );
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={(error as Error).message} />;

  const requests = data?.data.requests ?? [];
  const pagination = data?.data.pagination;

  return (
    <div>
      <PageHeader
        title="Customization Requests"
        description="Review device customization requests"
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
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No requests found</TableCell>
              </TableRow>
            ) : (
              requests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-sm">{r.content || r.appName}</TableCell>
                  <TableCell className="text-xs">{r.type.replace(/CUSTOM_/g, "").replace(/_/g, " ")}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r.deviceId}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{r.reason}</TableCell>
                  <TableCell>
                    <StatusBadge variant={r.status === "PENDING" ? "pending" : r.status === "APPROVED" ? "approved" : "rejected"}>
                      {r.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {r.status === "PENDING" && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success" onClick={() => setReviewDialog({ req: r, action: "APPROVED" })}>
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setReviewDialog({ req: r, action: "REJECTED" })}>
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

      <Dialog open={!!reviewDialog} onOpenChange={() => setReviewDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{reviewDialog?.action === "APPROVED" ? "Approve" : "Reject"} Request</DialogTitle>
          </DialogHeader>
          <Input placeholder="Admin note (optional)" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialog(null)}>Cancel</Button>
            <Button onClick={handleReview} disabled={reviewMutation.isPending}>
              {reviewDialog?.action === "APPROVED" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
