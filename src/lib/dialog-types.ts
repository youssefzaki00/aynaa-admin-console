interface FormDialogParams {
  editItem?: any;
  onSave: (payload: any) => void;
}

export interface DialogParamsMap {
  "category-form": FormDialogParams;
  "keyword-form": FormDialogParams;
  "site-form": FormDialogParams;
  "excluded-app-form": FormDialogParams;
  delete: {
    title: string;
    description: string;
    onConfirm: () => void;
    data?: any;
    type?: string;
  };
  detail:
    | { data: any; type: string }
    | { title: string; rows: { label: string; value: any }[] };
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
