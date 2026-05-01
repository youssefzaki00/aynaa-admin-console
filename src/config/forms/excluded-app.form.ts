import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

// Regex يضمن:
// 1. يبدأ بحروف.
// 2. يحتوي على مقطعين على الأقل مفصولين بنقطة.
// 3. لا يحتوي على رموز خاصة باستثناء النقطة والـ underscore.
const packageRegex = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/i;

const excludedAppSchema = z.object({
  packageName: z
    .string()
    .min(1, "Package name is required")
    .regex(packageRegex, "Package name is invalid (example: com.example.app)"),
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
