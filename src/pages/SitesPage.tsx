import CreatePage, { type PageConfig } from "@/components/CreatePage";
import { useSites, useCreateSite, useUpdateSite, useDeleteSite } from "@/hooks/useSites";
import { getSiteColumns } from "@/config/columns/sites.columns";
import { Globe } from "lucide-react";
import type { Site } from "@/services/sites";

const config: PageConfig<Site> = {
  useQuery: (params) => useSites(params),
  mapQueryParams: (page, search) => ({ page, limit: 20, search: search || undefined }),
  dataPath: (raw) => (Array.isArray(raw?.data?.sites) ? raw.data.sites : []),
  useCreate: useCreateSite,
  useUpdate: useUpdateSite,
  useDelete: useDeleteSite,
  dialogId: "site-form",
  messages: {
    createSuccess: "Site created",
    updateSuccess: "Site updated",
    deleteSuccess: "Site deleted",
  },
  columnGenerator: getSiteColumns,
  filterDefaults: {},
};
console.log(config.dataPath);
export default function SitesPage() {
  return (
    <CreatePage
      config={config}
      title="Sites"
      description="Manage blocked sites"
      icon={<Globe className="h-6 w-6" />}
      addLabel="Add Site"
      searchPlaceholder="Search sites..."
    />
  );
}
