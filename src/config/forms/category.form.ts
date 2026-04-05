import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  displayName: z.string().min(1, "Display name is required"),
  description: z.string().optional(),
});

export const categoryFormConfig: FormConfig = {
  title: "New Category",
  editTitle: "Edit Category",
  submitLabel: "Create",
  editSubmitLabel: "Update",
  schema: categorySchema,
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "e.g. DRUGS",
    },
    {
      name: "displayName",
      label: "Display Name",
      type: "text",
      required: true,
      placeholder: "Display Name",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Description",
      rows: 3,
    },
  ],
};
