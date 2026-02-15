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
import { useKeywords, useCreateKeyword, useUpdateKeyword, useToggleKeyword, useDeleteKeyword } from "@/hooks/useKeywords";
import { useCategories } from "@/hooks/useCategories";
import { Plus, Pencil, Trash2, Power } from "lucide-react";
import type { Keyword } from "@/services/keywords";

export default function KeywordsPage() {
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const { data, isLoading, error } = useKeywords({ page, limit: 50, categoryId: filterCategory || undefined });
  const { data: catData } = useCategories({ limit: 100 });
  const createMutation = useCreateKeyword();
  const updateMutation = useUpdateKeyword();
  const toggleMutation = useToggleKeyword();
  const deleteMutation = useDeleteKeyword();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Keyword | null>(null);
  const [form, setForm] = useState({ word: "", categoryId: "" });

  const categories = catData?.data.categories ?? [];

  const openCreate = () => {
    setEditing(null);
    setForm({ word: "", categoryId: categories[0]?.id || "" });
    setDialogOpen(true);
  };

  const openEdit = (kw: Keyword) => {
    setEditing(kw);
    setForm({ word: kw.word, categoryId: kw.category.id });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, word: form.word, categoryId: form.categoryId }, {
        onSuccess: () => setDialogOpen(false),
      });
    } else {
      createMutation.mutate(form, { onSuccess: () => setDialogOpen(false) });
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={(error as Error).message} />;

  const keywords = data?.data.keywords ?? [];
  const pagination = data?.data.pagination;

  return (
    <div>
      <PageHeader
        title="Keywords"
        description="Manage blocked keywords"
        action={
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={(v) => { setFilterCategory(v === "all" ? "" : v); setPage(1); }}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.displayName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" onClick={openCreate}>
              <Plus className="h-4 w-4 mr-1" /> Add Keyword
            </Button>
          </div>
        }
      />

      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">No keywords found</TableCell>
              </TableRow>
            ) : (
              keywords.map((kw) => (
                <TableRow key={kw.id}>
                  <TableCell className="font-mono text-sm">{kw.word}</TableCell>
                  <TableCell>
                    <StatusBadge variant="active">{kw.category.displayName}</StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge variant={kw.isEnabled ? "active" : "inactive"}>
                      {kw.isEnabled ? "Enabled" : "Disabled"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleMutation.mutate(kw.id)}>
                        <Power className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(kw)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(kw.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pagination && <div className="px-4 pb-3"><PaginationControls pagination={pagination} onPageChange={setPage} /></div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Keyword" : "New Keyword"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Keyword"
              value={form.word}
              onChange={(e) => setForm({ ...form, word: e.target.value })}
            />
            <Select value={form.categoryId} onValueChange={(v) => setForm({ ...form, categoryId: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.displayName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
