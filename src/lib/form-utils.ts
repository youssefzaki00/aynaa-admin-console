import type { FormFieldConfig } from "@/components/FormField";

export function initializeFormState(
  fields: (FormFieldConfig | FormFieldConfig[])[],
  editItem?: any,
): Record<string, any> {
  const initialState: Record<string, any> = {};
  const flatFields = fields.flatMap((fieldOrRow) =>
    Array.isArray(fieldOrRow) ? fieldOrRow : [fieldOrRow],
  );

  flatFields.forEach((field) => {
    if (field.type === "switch") {
      initialState[field.name] =
        editItem?.[field.name] ?? field.defaultValue ?? true;
    } else if (field.type === "number") {
      initialState[field.name] =
        editItem?.[field.name] ?? field.defaultValue ?? 0;
    } else if (field.type === "select" || field.type === "searchable-select") {
      if (field.populatedFrom && editItem?.[field.populatedFrom]) {
        initialState[field.name] = editItem[field.populatedFrom].id;
      } else {
        initialState[field.name] = editItem?.[field.name] || field.defaultValue || "";
      }
    } else {
      initialState[field.name] =
        editItem?.[field.name] ?? field.defaultValue ?? "";
    }
  });

  return initialState;
}

export function buildFormPayload(
  formState: Record<string, any>,
  fields: FormFieldConfig[],
  transformPayload?: (data: any, formState: any) => any,
): Record<string, any> {
  const payload: Record<string, any> = {};

  fields.forEach((field) => {
    const val = formState[field.name];

    if (field.type === "number") {
      payload[field.name] =
        typeof val === "number" ? val : val ? parseInt(val, 10) : undefined;
    } else if (field.type === "switch") {
      payload[field.name] = !!val;
    } else if (field.type === "select" && field.allowClear) {
      payload[field.name] = val || null;
    } else {
      payload[field.name] = val;
    }
  });

  return transformPayload ? transformPayload(payload, formState) : payload;
}
