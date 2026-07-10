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

const relativeTimeFormatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

const RELATIVE_TIME_UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
  { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
  { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
  { unit: "day", ms: 1000 * 60 * 60 * 24 },
  { unit: "hour", ms: 1000 * 60 * 60 },
  { unit: "minute", ms: 1000 * 60 },
  { unit: "second", ms: 1000 },
];

export function formatRelativeTime(isoDate: string | undefined | null): string {
  if (!isoDate) return "—";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "—";

  const diffMs = date.getTime() - Date.now();
  const absDiff = Math.abs(diffMs);

  for (const { unit, ms } of RELATIVE_TIME_UNITS) {
    if (absDiff >= ms || unit === "second") {
      const value = Math.round(diffMs / ms);
      return relativeTimeFormatter.format(value, unit);
    }
  }

  return "—";
}

export function formatAbsoluteTime(isoDate: string | undefined | null): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}
