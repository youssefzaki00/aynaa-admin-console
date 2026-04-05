import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
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
    case "searchable-select":
      return (
        <Select
          value={value}
          onValueChange={onChange}
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
