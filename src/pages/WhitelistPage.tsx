import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import PaginationControls from "@/components/PaginationControls";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useWhitelist, useAddToWhitelist, useUpdateWhitelist, useRemoveFromWhitelist } from "@/hooks/useWhitelist";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { WhitelistApp } from "@/services/whitelist";

export default function WhitelistPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useWhitelist({ page, limit: 50 });
  const addMutation = useAddToWhitelist();
  const updateMutation = useUpdateWhitelist();
  const removeMutation = useRemoveFromWhitelist();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<WhitelistApp | null>(null);
  const [form, setForm] = useState({ packageName: "", appName: "" });

  const openCreate = () => {
    setEditing(null);
    setForm({ packageName: "", appName: "" });
    setDialogOpen(true);
  };

  const openEdit = (app: WhitelistApp) => {
    setEditing(app);
    setForm({ packageName: app.packageName, appName: app.appName });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...form }, { onSuccess: () => setDialogOpen(false) });
    } else {
      addMutation.mutate(form, { onSuccess: () => setDialogOpen(false) });
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={(error as Error).message} />;

  // Fallback to packageName if id is missing (backend issue)
  const whitelistData = data?.data.whitelist ?? [];
  const apps = Array.isArray(whitelistData)
    ? whitelistData
        .filter((app): app is WhitelistApp => !!app && !!(app.id || app.packageName))
        .map(app => ({
          ...app,
          id: app.id || app.packageName
        }))
    : [];
  const pagination = data?.data.pagination;

  return (
    <div>
      <PageHeader
        title="Whitelist"
        description="Manage whitelisted applications"
        action={
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-1" /> Add App
          </Button>
        }
      />

      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App Name</TableHead>
              <TableHead>Package Name</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground py-8">No apps found</TableCell>
              </TableRow>
            ) : (
              apps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.appName}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{app.packageName}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(app)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeMutation.mutate(app.id)}>
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
            <DialogTitle>{editing ? "Edit App" : "Add App to Whitelist"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="App Name" value={form.appName} onChange={(e) => setForm({ ...form, appName: e.target.value })} />
            <Input placeholder="Package Name (e.g. com.whatsapp)" value={form.packageName} onChange={(e) => setForm({ ...form, packageName: e.target.value })} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={addMutation.isPending || updateMutation.isPending}>
              {editing ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
