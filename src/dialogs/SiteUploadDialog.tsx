import { useMemo, useRef, useState } from "react";
import BaseDialog from "@/components/BaseDialog";
import DialogActionButtons from "@/components/DialogActionButtons";
import SearchableSelect from "@/components/SearchableSelect";
import { Label } from "@/ui/label";
import { useCategories } from "@/hooks/useCategories";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getCategoriesList } from "@/services/categories";
import { useUploadSites } from "@/hooks/useSites";
import { Upload, FileText } from "lucide-react";

interface SiteUploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SiteUploadDialog({ open, onClose }: SiteUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const debouncedCategorySearch = useDebouncedValue(categorySearchQuery, 250);
  const [fieldErrors, setFieldErrors] = useState<{ file?: string; categoryId?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categoriesResponse } = useCategories({
    limit: 20,
    search: debouncedCategorySearch.trim() || undefined,
  });

  const categoryOptions = useMemo(
    () =>
      getCategoriesList(categoriesResponse).map((category) => ({
        value: category.id,
        label: category.displayName || category.name,
      })),
    [categoriesResponse],
  );

  const uploadMutation = useUploadSites();

  const resetForm = () => {
    setFile(null);
    setCategoryId("");
    setCategorySearchQuery("");
    setFieldErrors({});
    uploadMutation.reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { file?: string; categoryId?: string } = {};
    if (!file) errs.file = "Please select a text file";
    if (!categoryId) errs.categoryId = "Please select a category";
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    uploadMutation.mutate({ file: file!, categoryId }, { onSuccess: handleClose });
  };

  return (
    <BaseDialog open={open} onClose={handleClose} title="Import Sites from File">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label>
            Text File <span className="text-destructive">*</span>
          </Label>
          <div
            role="button"
            tabIndex={0}
            aria-label="Select text file"
            className="relative border-2 border-dashed border-border/60 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          >
            {file ? (
              <div className="flex items-center justify-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <span className="font-medium truncate max-w-[200px]">{file.name}</span>
                <span className="text-muted-foreground shrink-0">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-8 w-8" />
                <span className="text-sm font-medium">Click to select a .txt file</span>
                <span className="text-xs">
                  Format:{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">0.0.0.0 example.com</code> —
                  one entry per line
                </span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,text/plain"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
                setFieldErrors((prev) => ({ ...prev, file: undefined }));
              }}
            />
          </div>
          {fieldErrors.file && (
            <p className="text-sm text-destructive">{fieldErrors.file}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>
            Category <span className="text-destructive">*</span>
          </Label>
          <SearchableSelect
            options={categoryOptions}
            value={categoryId || undefined}
            onChange={(id) => {
              setCategoryId(id);
              setFieldErrors((prev) => ({ ...prev, categoryId: undefined }));
            }}
            placeholder="Select a category"
            searchPlaceholder="Search categories…"
            onSearchChange={setCategorySearchQuery}
          />
          {fieldErrors.categoryId && (
            <p className="text-sm text-destructive">{fieldErrors.categoryId}</p>
          )}
        </div>

        {uploadMutation.error && (
          <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2">
            {(uploadMutation.error as Error).message}
          </p>
        )}

        <DialogActionButtons
          onCancel={handleClose}
          isLoading={uploadMutation.isPending}
          submitLabel="Import Sites"
        />
      </form>
    </BaseDialog>
  );
}
