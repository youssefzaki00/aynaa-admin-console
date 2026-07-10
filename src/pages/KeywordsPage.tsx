import CreatePage, { type PageConfig } from "@/components/CreatePage";
import { useKeywords, useCreateKeyword, useUpdateKeyword, useToggleKeyword, useDeleteKeyword } from "@/hooks/useKeywords";
import { useKeywordCustomSetup } from "@/hooks/use-keyword-setup";
import { getKeywordColumns } from "@/columns/keywords.columns";
import { Ban } from "lucide-react";
import { getKeywordsList, type Keyword } from "@/services/keywords";

const config: PageConfig<Keyword> = {
  useQuery: (params) => useKeywords(params),
  mapQueryParams: (_page, search) => ({ search: search || undefined }),
  listMode: "full",
  dataPath: (raw) => getKeywordsList(raw),
  useCreate: useCreateKeyword,
  useUpdate: useUpdateKeyword,
  useDelete: useDeleteKeyword,
  useToggle: useToggleKeyword,
  dialogId: "keyword-form",
  messages: {
    createSuccess: "Keyword created",
    updateSuccess: "Keyword updated",
    deleteSuccess: "Keyword deleted",
    toggleSuccess: "Keyword toggled",
  },
  columnGenerator: getKeywordColumns,
  filterDefaults: {},
  useCustomSetup: useKeywordCustomSetup,
};

export default function KeywordsPage() {
  return (
    <CreatePage
      config={config}
      title="Keywords"
      description="Manage blocked keywords"
      icon={<Ban className="h-6 w-6" />}
      addLabel="Add Keyword"
      searchPlaceholder="Search keywords..."
    />
  );
}
