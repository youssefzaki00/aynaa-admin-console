import CreatePage, { type PageConfig } from "@/components/CreatePage";
import {
  useApps,
  useCreateApp,
  useUpdateApp,
  useDeleteApp,
} from "@/hooks/useApps";
import { useAppsCustomSetup } from "@/hooks/use-app-setup";
import { getAppsColumns } from "@/columns/apps.columns";
import { getAppsList, type App } from "@/services/apps";
import { Smartphone } from "lucide-react";

const config: PageConfig<App> = {
  useQuery: (params) => useApps(params),
  mapQueryParams: () => ({}),
  listMode: "full",
  dataPath: (raw) => getAppsList(raw),
  useCreate: useCreateApp,
  useUpdate: useUpdateApp,
  useDelete: useDeleteApp,
  dialogId: "app-form",
  messages: {
    createSuccess: "App created",
    updateSuccess: "App updated",
    deleteSuccess: "App deleted",
  },
  columnGenerator: getAppsColumns,
  filterDefaults: {},
  useCustomSetup: useAppsCustomSetup,
  disableSearch: true,
};

export default function AppsPage() {
  return (
    <CreatePage
      config={config}
      title="Apps"
      description="Manage monitored applications"
      icon={<Smartphone className="h-6 w-6" />}
      addLabel="Add App"
      searchPlaceholder="Search packages..."
    />
  );
}
