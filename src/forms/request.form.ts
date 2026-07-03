import { z } from "zod";
import type { FormConfig } from "@/dialogs/FormDialog";

const requestStatusValues = ["PENDING", "APPROVED", "DECLINED", "REJECTED"] as const;

const requestSchema = z.object({
  status: z.enum(requestStatusValues, {
    required_error: "Status is required",
  }),
  message: z.string().optional(),
});

export const requestFormConfig: FormConfig = {
  title: "Update Request",
  editTitle: "Update Request",
  submitLabel: "Update",
  editSubmitLabel: "Update",
  schema: requestSchema,
  fields: [
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      placeholder: "Select status",
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "APPROVED", label: "Approved" },
        { value: "DECLINED", label: "Declined" },
        { value: "REJECTED", label: "Rejected" },
      ],
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Optional admin note or response",
      rows: 3,
    },
  ],
};
