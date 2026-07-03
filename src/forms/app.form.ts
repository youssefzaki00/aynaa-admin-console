import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const packageRegex = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/i;

const appSchema = z.object({
  packageName: z
    .string()
    .min(1, "Package name is required")
    .regex(packageRegex, "Package name is invalid (example: com.example.app)"),
  isActive: z.boolean(),
});

export const appFormConfig: FormConfig = {
  title: "Add App",
  editTitle: "Edit App",
  submitLabel: "Add",
  editSubmitLabel: "Update",
  schema: appSchema,
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
