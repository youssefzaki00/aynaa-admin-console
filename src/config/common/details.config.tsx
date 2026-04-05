import { type ReactNode } from "react";

export interface DetailRow {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
  variant?: "default" | "status";
}

export function getDetailConfig(
  type: string,
  data: any,
): { title: string; rows: DetailRow[] } {
  switch (type) {
    case "category":
      return {
        title: "Category Details",
        rows: [
          { label: "Status", value: data.isActive ? "Active" : "Inactive", variant: "status" },
          { label: "Name", value: data.name },
          { label: "Display Name", value: data.displayName },
          { label: "ID", value: data.id },
          ...(data.description ? [{ label: "Description", value: data.description, fullWidth: true }] : []),
        ],
      };
    case "keyword":
      return {
        title: "Keyword Details",
        rows: [
          { label: "Status", value: data.isEnabled ? "Enabled" : "Disabled", variant: "status" },
          { label: "Word", value: data.word },
          { label: "Category", value: data.category?.displayName || "—" },
          { label: "ID", value: data.id },
        ],
      };
    case "site":
      return {
        title: "Site Details",
        rows: [
          { label: "Status", value: data.isActive ? "Active" : "Inactive", variant: "status" },
          { label: "URL", value: data.url },
          { label: "Name", value: data.name || "—" },
          { label: "Category", value: data.category || "—" },
          { label: "ID", value: data.id },
        ],
      };
    case "whitelist":
      return {
        title: "Whitelisted App Details",
        rows: [
          { label: "App Name", value: data.appName },
          { label: "Package Name", value: data.packageName },
          { label: "ID", value: data.id },
        ],
      };
    default:
      return { title: "Details", rows: [] };
  }
}
