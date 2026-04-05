import { useState, useEffect, useMemo, useCallback } from "react";
import type { FormFieldConfig } from "@/components/FormField";
import type { ZodSchema } from "zod";
import { initializeFormState, buildFormPayload } from "@/lib/form-utils";

interface UseFormProps {
  open: boolean;
  fields: (FormFieldConfig | FormFieldConfig[])[];
  editItem?: any;
  schema: ZodSchema;
  transformPayload?: (data: any, formState: any) => any;
  onSave: (payload: any) => void;
}

export function useForm({
  open,
  fields,
  editItem,
  schema,
  transformPayload,
  onSave,
}: UseFormProps) {
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const flatFields = useMemo(
    () =>
      fields.flatMap((fieldOrRow) =>
        Array.isArray(fieldOrRow) ? fieldOrRow : [fieldOrRow],
      ),
    [fields],
  );

  useEffect(() => {
    if (open) {
      const initialState = initializeFormState(fields, editItem);
      setFormState(initialState);
      setErrors({});
    }
  }, [open, editItem, fields]);

  const handleFieldChange = (name: string, value: any) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const payload = buildFormPayload(formState, flatFields, transformPayload);

      const result = schema.safeParse(payload);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const key = err.path.join(".");
          if (!fieldErrors[key]) fieldErrors[key] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setErrors({});
      onSave(result.data);
    },
    [schema, flatFields, formState, transformPayload, onSave],
  );

  return {
    formState,
    flatFields,
    errors,
    handleFieldChange,
    handleSubmit,
  };
}
