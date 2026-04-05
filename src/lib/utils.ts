import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mutationCallbacks = (
  successMsg: string,
  errorMsg?: string,
  onSuccess?: () => void,
) => ({
  onSuccess: () => {
    toast.success(successMsg);
    onSuccess?.();
  },
  onError: (err: { message?: string }) => {
    toast.error(err?.message ?? errorMsg ?? "Something went wrong");
  },
});

export function normalizePagination(raw: any) {
  if (!raw) return undefined;
  return {
    total: raw.total ?? 0,
    page: raw.page ?? 1,
    limit: raw.limit ?? 20,
    totalPages: raw.totalPages ?? raw.pages ?? 1,
  };
}

export const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch {
    toast.error("Failed to copy");
  }
};
