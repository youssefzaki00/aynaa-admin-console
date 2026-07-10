import CreatePage, { type PageConfig } from "@/components/CreatePage";
import { useRequests, useUpdateRequest } from "@/hooks/useRequests";
import { useRequestCustomSetup } from "@/hooks/use-request-setup";
import { getRequestsColumns } from "@/columns/requests.columns";
import { getRequestsList, type AppRequest } from "@/services/requests";
import { Inbox } from "lucide-react";

const config: PageConfig<AppRequest> = {
  useQuery: (params) => useRequests(params),
  mapQueryParams: (page, _search, filters) => ({
    page,
    limit: 20,
    type: filters.type || undefined,
  }),
  dataPath: (raw) => getRequestsList(raw),
  useUpdate: useUpdateRequest,
  dialogId: "request-form",
  disableSearch: true,
  messages: {
    createSuccess: "",
    updateSuccess: "Request updated",
    deleteSuccess: "",
  },
  columnGenerator: getRequestsColumns,
  filterDefaults: { type: "" },
  useCustomSetup: useRequestCustomSetup,
};

export default function RequestsPage() {
  return (
    <CreatePage
      config={config}
      title="Requests"
      description="Review and manage user requests"
      icon={<Inbox className="h-6 w-6" />}
    />
  );
}
