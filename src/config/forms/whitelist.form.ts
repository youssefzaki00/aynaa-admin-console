import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const whitelistSchema = z.object({
  appName: z.string().min(1, "App name is required"),
  packageName: z.string().min(1, "Package name is required"),
});

export const whitelistFormConfig: FormConfig = {
  title: "Add App to Whitelist",
  editTitle: "Edit Whitelisted App",
  submitLabel: "Add",
  editSubmitLabel: "Update",
  schema: whitelistSchema,
  fields: [
    {
      name: "appName",
      label: "App Name",
      type: "text",
      required: true,
      placeholder: "App Name",
    },
    {
      name: "packageName",
      label: "Package Name",
      type: "text",
      required: true,
      placeholder: "e.g. com.whatsapp",
      dir: "ltr",
    },
  ],
};
