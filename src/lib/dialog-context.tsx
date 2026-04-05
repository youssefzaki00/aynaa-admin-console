import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { DialogName, DialogParamsMap } from "./dialog-types";

type DialogState = {
  name: DialogName | null;
  params: Record<string, unknown>;
};

type DialogContextValue = {
  openDialog: <K extends DialogName>(
    name: K,
    params: DialogParamsMap[K],
  ) => void;
  closeDialog: () => void;
  state: DialogState;
};

const DialogContext = createContext<DialogContextValue | null>(null);

const noop: DialogContextValue = {
  openDialog: () => {},
  closeDialog: () => {},
  state: { name: null, params: {} },
};

export function useDialog() {
  const ctx = useContext(DialogContext);
  return ctx ?? noop;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({ name: null, params: {} });

  const openDialog = useCallback(
    <K extends DialogName>(name: K, params: DialogParamsMap[K]) => {
      setState({ name, params: params as Record<string, unknown> });
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setState({ name: null, params: {} });
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, state }}>
      {children}
    </DialogContext.Provider>
  );
}
