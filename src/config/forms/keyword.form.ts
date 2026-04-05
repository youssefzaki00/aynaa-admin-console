import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const keywordSchema = z.object({
  word: z.string().min(1, "Keyword is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export const keywordFormConfig: FormConfig = {
  title: "New Keyword",
  editTitle: "Edit Keyword",
  submitLabel: "Create",
  editSubmitLabel: "Update",
  schema: keywordSchema,
  fields: [
    {
      name: "word",
      label: "Keyword",
      type: "text",
      required: true,
      placeholder: "Enter keyword",
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      required: true,
      placeholder: "Select category",
      optionsKey: "categories",
      populatedFrom: "category",
    },
  ],
};
