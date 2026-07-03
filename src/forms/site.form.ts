import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/i;

const siteSchema = z.object({
  name: z.string().trim().optional(),
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .regex(urlRegex, "Please enter a valid domain (e.g. example.com)"),
  categoryId: z.string().min(1, "Category is required"),
  isBlocked: z.boolean(),
});

export const siteFormConfig: FormConfig = {
  title: "New Site",
  editTitle: "Edit Site",
  submitLabel: "Create",
  editSubmitLabel: "Update",
  schema: siteSchema,
  fields: [
    // {
    //   name: "name",
    //   label: "Name",
    //   type: "text",
    //   required: false,
    //   placeholder: "Site label",
    // },
    {
      name: "url",
      label: "URL",
      type: "text",
      required: true,
      placeholder: "e.g. example.com",
      dir: "ltr",
    },
    [
      {
        name: "categoryId",
        label: "Category",
        type: "searchable-select",
        required: true,
        placeholder: "Select category",
        optionsKey: "categories",
      },
      {
        name: "isBlocked",
        label: "Blocked",
        type: "switch",
        defaultValue: true,
      },
    ],
  ],
};
