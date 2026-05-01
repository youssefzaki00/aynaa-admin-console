import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import SearchableSelect from "@/components/SearchableSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Switch } from "@/ui/switch";

export type FieldType =
  | "text"
  | "url"
  | "number"
  | "textarea"
  | "select"
  | "searchable-select"
  | "switch";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  onChange?: (value: any) => void;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  rows?: number;
  allowClear?: boolean;
  disabled?: boolean;
  populatedFrom?: string;
  optionsKey?: string;
  dir?: "ltr" | "rtl";
  /** Passed to searchable-select CommandInput — wire to debounced API search. */
  onRemoteSearch?: (query: string) => void;
}

export function FormField({ config }: { config: FormFieldConfig }) {
  const {
    name,
    type,
    required,
    placeholder,
    value,
    onChange,
    options = [],
    min,
    max,
    rows = 3,
    disabled,
    dir,
  } = config;

  switch (type) {
    case "textarea":
      return (
        <Textarea
          name={name}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          className="bg-background/50 border-border/50"
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
        />
      );

    case "select":
      return (
        <Select
          value={value !== undefined && value !== "" ? String(value) : undefined}
          onValueChange={(v) => onChange?.(v)}
          disabled={disabled}
        >
          <SelectTrigger className="bg-background/50 border-border/50">
            <SelectValue placeholder={placeholder} />
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

    case "searchable-select":
      return (
        <SearchableSelect
          options={options}
          value={value !== undefined && value !== "" ? String(value) : undefined}
          onChange={(v) => onChange?.(v)}
          placeholder={placeholder}
          disabled={disabled}
          onSearchChange={config.onRemoteSearch}
        />
      );

    case "switch":
      return (
        <div className="flex items-center gap-3">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={disabled}
          />
          <span className="text-sm font-medium text-muted-foreground">
            {value ? "Enabled" : "Disabled"}
          </span>
        </div>
      );

    case "number":
      return (
        <Input
          name={name}
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange?.(parseInt(e.target.value) || 0)}
          required={required}
          className="bg-background/50 border-border/50"
          placeholder={placeholder}
          disabled={disabled}
        />
      );

    case "url":
    case "text":
    default:
      return (
        <Input
          name={name}
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          className="bg-background/50 border-border/50"
          placeholder={placeholder}
          dir={dir}
          disabled={disabled}
        />
      );
  }
}
