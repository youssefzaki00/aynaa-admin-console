import BaseDialog from "@/components/BaseDialog";
import DialogActionButtons from "@/components/DialogActionButtons";
import { type FormFieldConfig } from "@/components/FormField";
import FormFieldRenderer from "@/components/FormFieldRenderer";
import { useForm } from "@/hooks/use-form";
import { useCategoryFormOptions } from "@/hooks/use-category-form-options";
import type { ZodSchema } from "zod";

export interface FormConfig {
  title: string;
  editTitle: string;
  submitLabel: string;
  editSubmitLabel: string;
  fields: (FormFieldConfig | FormFieldConfig[])[];
  schema: ZodSchema;
  maxWidth?: string;
  transformPayload?: (data: any, formState: any) => any;
}

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  config: FormConfig;
  editItem?: any;
  onSave: (payload: any) => void;
  extraParams?: Record<string, any>;
}

export default function FormDialog({
  open,
  onClose,
  config,
  editItem,
  onSave,
  extraParams = {},
}: FormDialogProps) {
  const categoryFormOptions = useCategoryFormOptions(open, config.fields);
  const mergedExtraParams = { ...extraParams, ...categoryFormOptions };

  const {
    formState,
    errors,
    handleFieldChange,
    handleSubmit,
  } = useForm({
    open,
    fields: config.fields,
    editItem,
    schema: config.schema,
    transformPayload: config.transformPayload,
    onSave,
  });

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={editItem ? config.editTitle : config.title}
      maxWidth={config.maxWidth || "max-w-lg"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {config.fields.map((fieldOrRow, index) => {
          if (Array.isArray(fieldOrRow)) {
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {fieldOrRow.map((field) => (
                  <FormFieldRenderer
                    key={field.name}
                    field={field}
                    formState={formState}
                    editItem={editItem}
                    extraParams={mergedExtraParams}
                    onFieldChange={handleFieldChange}
                    error={errors[field.name]}
                  />
                ))}
              </div>
            );
          } else {
            const field = fieldOrRow as FormFieldConfig;
            return (
              <FormFieldRenderer
                key={field.name}
                field={field}
                formState={formState}
                editItem={editItem}
                extraParams={mergedExtraParams}
                onFieldChange={handleFieldChange}
                error={errors[field.name]}
              />
            );
          }
        })}

        <DialogActionButtons
          onCancel={onClose}
          submitLabel={editItem ? config.editSubmitLabel : config.submitLabel}
        />
      </form>
    </BaseDialog>
  );
}
