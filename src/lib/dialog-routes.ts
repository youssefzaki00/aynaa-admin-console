import {
  categoryFormConfig,
  keywordFormConfig,
  siteFormConfig,
  whitelistFormConfig,
} from "@/config/forms";
import { getDetailConfig } from "@/config/common/details.config";
import type { DialogName } from "./dialog-types";

type DialogComponent = "form" | "detail" | "delete" | "review" | "image-preview";

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
    getProps: (params) => ({
      config: siteFormConfig,
      editItem: params.editItem ?? null,
      onSave: params.onSave ?? (() => {}),
    }),
  },

  "whitelist-form": {
    component: "form",
    getProps: (params) => ({
      config: whitelistFormConfig,
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

  detail: {
    component: "detail",
    getProps: (params) => {
      if (params.rows && params.title) {
        return {
          title: params.title,
          rows: params.rows,
        };
      }

      if (params.data && params.type) {
        const config = getDetailConfig(params.type, params.data);
        return {
          title: config.title,
          rows: config.rows,
        };
      }

      return {
        title: "",
        rows: [],
      };
    },
  },
};
