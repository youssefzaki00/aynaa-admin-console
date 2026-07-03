import {
  categoryFormConfig,
  excludedAppFormConfig,
  keywordFormConfig,
  siteFormConfig,
  appFormConfig,
  requestFormConfig,
} from "@/forms";
import type { DialogName } from "./dialog-types";

type DialogComponent = "form" | "delete" | "review" | "image-preview" | "site-upload";

type DialogRoute = {
  component: DialogComponent;
  getProps?: (params: any) => any;
  onClose?: (closeDialog: () => void) => void;
};

export const dialogRoutes: Record<DialogName, DialogRoute> = {
  "category-form": {
    component: "form",
    getProps: (params) => ({
      config: categoryFormConfig,
      editItem: params.editItem ?? null,
      onSave: params.onSave ?? (() => {}),
    }),
  },

  "keyword-form": {
    component: "form",
    getProps: (params) => {
      const { editItem, onSave, ...extraParams } = params;
      return {
        config: keywordFormConfig,
        editItem: editItem ?? null,
        onSave: onSave ?? (() => {}),
        extraParams,
      };
    },
  },

  "site-form": {
    component: "form",
    getProps: (params) => {
      const { editItem, onSave, ...extraParams } = params;
      return {
        config: siteFormConfig,
        editItem: editItem ?? null,
        onSave: onSave ?? (() => {}),
        extraParams,
      };
    },
  },

  "excluded-app-form": {
    component: "form",
    getProps: (params) => ({
      config: excludedAppFormConfig,
      editItem: params.editItem ?? null,
      onSave: params.onSave ?? (() => {}),
    }),
  },

  "app-form": {
    component: "form",
    getProps: (params) => ({
      config: appFormConfig,
      editItem: params.editItem ?? null,
      onSave: params.onSave ?? (() => {}),
    }),
  },

  "request-form": {
    component: "form",
    getProps: (params) => ({
      config: requestFormConfig,
      editItem: params.editItem ?? null,
      onSave: params.onSave ?? (() => {}),
    }),
  },

  delete: {
    component: "delete",
    getProps: (params) => ({
      title: params.title ?? "Delete",
      description: params.description ?? "Are you sure?",
      onConfirm: () => {
        params.onConfirm?.();
      },
    }),
  },

  review: {
    component: "review",
    getProps: (params) => ({
      title: params.title ?? "Review",
      onConfirm: params.onConfirm ?? (() => {}),
    }),
  },

  "image-preview": {
    component: "image-preview",
    getProps: (params) => ({
      urls: params.urls ?? [],
    }),
  },

  "site-upload": {
    component: "site-upload",
    getProps: () => ({}),
  },
};
