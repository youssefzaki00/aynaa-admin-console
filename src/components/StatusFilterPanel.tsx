import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";

interface StatusFilterPanelProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  className?: string;
}

const DEFAULT_OPTIONS = [
  { value: "all", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function StatusFilterPanel({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  className = "w-36",
}: StatusFilterPanelProps) {
  return (
    <Select value={value || "all"} onValueChange={(v) => onChange(v === "all" ? "" : v)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
