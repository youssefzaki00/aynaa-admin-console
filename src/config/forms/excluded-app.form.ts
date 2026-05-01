import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const excludedAppSchema = z.object({
  packageName: z.string().min(1, "Package name is required"),
  isActive: z.boolean(),
});

export const excludedAppFormConfig: FormConfig = {
  title: "Add Excluded App",
  editTitle: "Edit Excluded App",
  submitLabel: "Add",
  editSubmitLabel: "Update",
  schema: excludedAppSchema,
  fields: [
    {
      name: "packageName",
      label: "Package Name",
      type: "text",
      required: true,
      placeholder: "com.example.app",
      dir: "ltr",
    },
    {
      name: "isActive",
      label: "Active",
      type: "switch",
      defaultValue: true,
    },
  ],
};
