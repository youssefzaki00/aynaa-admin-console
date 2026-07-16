import { useCallback } from "react";
import { toast } from "sonner";
import { useCreateSite, useUpdateSite } from "@/hooks/useSites";
import { mutationCallbacks } from "@/lib/utils";
import type { FiltersHook } from "@/hooks/use-filters";
import type { Site, SiteCreateBody } from "@/services/sites";
import hosts from "../../public/hosts.json";
import extractHost from "@/lib/extract-hosts";

const BlockedHosts = new Set(hosts);
const isBlocked = (host: string) => {
  if (BlockedHosts.has(host)) return true;
  if (!host.startsWith("www.") && BlockedHosts.has(`www.${host}`)) return true;
  if (host.startsWith("www.") && BlockedHosts.has(host.replace(/^www\./, ""))) return true;
  return false;
};
export function useCreateSiteWithHostCheck() {
  const createMutation = useCreateSite();
  const mutate = useCallback(
    (body: SiteCreateBody, options?: Parameters<typeof createMutation.mutate>[1]) => {
      const host = extractHost(body.url);
      if (isBlocked(host)) {
        toast.error("This site already exists in the hosts list");
        return;
      }
      createMutation.mutate(body, options);
    },
    [createMutation],
  );

  return { ...createMutation, mutate };
}

export function useSiteCustomSetup(_args: {
  filtersHook: FiltersHook;
  data: Site[];
  rawData: unknown;
}) {
  const updateMutation = useUpdateSite();

  const onToggle = useCallback(
    (id: string, checked: boolean) => {
      updateMutation.mutate(
        { id, data: { isActive: checked } },
        mutationCallbacks("Site status updated", "Failed to update site status"),
      );
    },
    [updateMutation],
  );

  return {
    isBlocked,
    transformEditData: (item: Site) => ({
      ...item,
      categoryId: "",
    }),
    customColumnHandlers: { onToggle },
  };
}
