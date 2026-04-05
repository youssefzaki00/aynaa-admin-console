import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/i;

const siteSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .regex(urlRegex, "Please enter a valid domain (e.g. example.com)"),
});

const SITE_CATEGORIES = [
  { value: "PORN", label: "PORN" },
  { value: "GAMBLING", label: "GAMBLING" },
  { value: "DRUGS", label: "DRUGS" },
  { value: "VIOLENCE", label: "VIOLENCE" },
  { value: "OTHER", label: "OTHER" },
];

export const siteFormConfig: FormConfig = {
  title: "New Site",
  editTitle: "Edit Site",
  submitLabel: "Create",
  editSubmitLabel: "Update",
  schema: siteSchema,
  fields: [
    {
      name: "url",
      label: "URL",
      type: "text",
      required: true,
      placeholder: "e.g. example.com",
      dir: "ltr",
    },
  ],
};
