import { useMemo } from "react";
import FormGroup from "@/components/FormGroup";
import { FormField, type FormFieldConfig } from "@/components/FormField";

interface FormFieldRendererProps {
  field: FormFieldConfig;
  formState: Record<string, any>;
  editItem: any;
  extraParams: Record<string, any>;
  onFieldChange: (name: string, value: any) => void;
  error?: string;
}

export default function FormFieldRenderer({
  field,
  formState,
  editItem,
  extraParams,
  onFieldChange,
  error,
}: FormFieldRendererProps) {
  const availableOptions = useMemo(
    () =>
      field.optionsKey
        ? extraParams?.[field.optionsKey] || []
        : field.options || [],
    [field.optionsKey, field.options, extraParams],
  );

  const fieldConfig: FormFieldConfig = useMemo(
    () => ({
      ...field,
      value: formState[field.name],
      onChange: (val: any) => onFieldChange(field.name, val),
      defaultValue: editItem?.[field.name] ?? field.defaultValue,
      editItem,
      options: availableOptions,
    }),
    [field, formState, editItem, availableOptions, onFieldChange],
  );

  return (
    <FormGroup label={field.label} required={field.required} error={error}>
      <FormField config={fieldConfig} />
    </FormGroup>
  );
}
