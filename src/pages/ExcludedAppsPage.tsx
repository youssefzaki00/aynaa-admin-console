import CreatePage, { type PageConfig } from "@/components/CreatePage";
import {
  useExcludedApps,
  useCreateExcludedApp,
  useUpdateExcludedApp,
  useDeleteExcludedApp,
} from "@/hooks/useExcludedApps";
import { getExcludedAppsColumns } from "@/columns/excluded-apps.columns";
import { ShieldOff } from "lucide-react";
import type { ExcludedApp } from "@/services/excluded-apps";

const config: PageConfig<ExcludedApp> = {
  useQuery: (params) => useExcludedApps(params),
  mapQueryParams: (_page, search) => ({ search: search || undefined }),
  listMode: "full",
  dataPath: (raw) => raw?.data?.excludedApps ?? [],
  useCreate: useCreateExcludedApp,
  useUpdate: useUpdateExcludedApp,
  useDelete: useDeleteExcludedApp,
  dialogId: "excluded-app-form",
  messages: {
    createSuccess: "Excluded app created",
    updateSuccess: "Excluded app updated",
    deleteSuccess: "Excluded app deleted",
  },
  columnGenerator: getExcludedAppsColumns,
  filterDefaults: {},
  disableSearch: true,
};

export default function ExcludedAppsPage() {
  return (
    <CreatePage
      config={config}
      title="Excluded Apps"
      description="Manage apps excluded from blocking"
      icon={<ShieldOff className="h-6 w-6" />}
      addLabel="Add App"
      searchPlaceholder="Search packages..."
    />
  );
}
