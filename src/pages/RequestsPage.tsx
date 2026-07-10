import { useEffect, useState } from "react";
import CreatePage, { type PageConfig } from "@/components/CreatePage";
import StatusFilterPanel from "@/components/StatusFilterPanel";
import { useRequests, useUpdateRequest } from "@/hooks/useRequests";
import { useRequestCustomSetup } from "@/hooks/use-request-setup";
import { getRequestsColumns } from "@/columns/requests.columns";
import { getRequestsList, type AppRequest, type RequestStatus } from "@/services/requests";
import type { FiltersHook } from "@/hooks/use-filters";
import SearchInput from "@/components/SearchInput";
import { Inbox } from "lucide-react";

const config: PageConfig<AppRequest> = {
  useQuery: (params) => useRequests(params),
  mapQueryParams: (page, _search, filters) => ({
    page,
    limit: 5,
    userId: filters.userId || undefined,
    status: (filters.status as RequestStatus) || undefined,
  }),
  disableSearch: true,
  dataPath: (raw) => getRequestsList(raw),
  useUpdate: useUpdateRequest,
  messages: {
    createSuccess: "",
    updateSuccess: "Request updated",
    deleteSuccess: "",
  },
  columnGenerator: getRequestsColumns,
  filterDefaults: { status: "", userId: "" },
  useCustomSetup: useRequestCustomSetup,
};

function UserIdFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    if (local === value) return;
    const timeout = setTimeout(() => onChange(local), 400);
    return () => clearTimeout(timeout);
  }, [local, value, onChange]);

  const handleChange = (next: string) => {
    setLocal(next);
    if (next === "") {
      onChange("");
    }
  };

  return (
    <SearchInput
      className="w-36"
      placeholder="User ID"
      value={local}
      onChange={handleChange}
      inputClassName="h-9 text-sm"
    />
  );
}

function RequestsFilterPanel({ filtersHook }: { filtersHook: FiltersHook }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <StatusFilterPanel
        value={filtersHook.filters.status}
        onChange={(v) => filtersHook.handleFilterChange("status", v)}
      />
      <UserIdFilter
        value={filtersHook.filters.userId}
        onChange={(v) => filtersHook.handleFilterChange("userId", v)}
      />
    </div>
  );
}

export default function RequestsPage() {
  return (
    <CreatePage
      config={config}
      title="Uninstall Requests"
      description="Review uninstall reasons and approve or reject requests"
      icon={<Inbox className="h-6 w-6" />}
      filterPanel={(filtersHook) => <RequestsFilterPanel filtersHook={filtersHook} />}
    />
  );
}
