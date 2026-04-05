import CreatePage, { type PageConfig } from "@/components/CreatePage";
import { useWhitelist, useAddToWhitelist, useUpdateWhitelist, useRemoveFromWhitelist } from "@/hooks/useWhitelist";
import { getWhitelistColumns } from "@/config/columns/whitelist.columns";
import { ShieldCheck } from "lucide-react";
import type { WhitelistApp } from "@/services/whitelist";

const config: PageConfig<WhitelistApp> = {
  useQuery: (params) => useWhitelist(params),
  mapQueryParams: (page) => ({ page, limit: 50 }),
  dataPath: (raw) => {
    const list = raw?.data?.whitelist ?? [];
    return Array.isArray(list)
      ? list
          .filter((app: any): app is WhitelistApp => !!app && !!(app.id || app.packageName))
          .map((app: any) => ({ ...app, id: app.id || app.packageName }))
      : [];
  },
  useCreate: useAddToWhitelist,
  useUpdate: useUpdateWhitelist,
  useDelete: useRemoveFromWhitelist,
  dialogId: "whitelist-form",
  messages: {
    createSuccess: "App added to whitelist",
    updateSuccess: "Whitelist app updated",
    deleteSuccess: "App removed from whitelist",
  },
  columnGenerator: getWhitelistColumns,
  filterDefaults: {},
};

export default function WhitelistPage() {
  return (
    <CreatePage
      config={config}
      title="Whitelist"
      description="Manage whitelisted applications"
      icon={<ShieldCheck className="h-6 w-6" />}
      addLabel="Add App"
      searchPlaceholder="Search apps..."
    />
  );
}
