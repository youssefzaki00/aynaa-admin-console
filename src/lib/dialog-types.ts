interface FormDialogParams {
  editItem?: any;
  onSave: (payload: any) => void;
}

export interface DialogParamsMap {
  "category-form": FormDialogParams;
  "keyword-form": FormDialogParams;
  "site-form": FormDialogParams;
  "excluded-app-form": FormDialogParams;
  "app-form": FormDialogParams;
  "request-form": FormDialogParams;
  "request-review": {
    variant: "approve" | "reject";
    request: any;
    onConfirm: () => Promise<void> | void;
  };
  delete: {
    title: string;
    description: string;
    onConfirm: () => void;
    confirmLabel?: string;
    data?: any;
    type?: string;
  };
  review: {
    title: string;
    onConfirm: (adminNote?: string) => void;
  };
  "image-preview": {
    urls: string[];
  };
  "site-upload": Record<string, never>;
}

export type DialogName = keyof DialogParamsMap;
