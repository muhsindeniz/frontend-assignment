import { createContext, useContext, ReactNode, useState } from "react";
import ToastComponent from "~/components/Toast/Toast";
import { Toast } from "~/components/Toast/types";
import { v4 } from "uuid";

type ToastContextType = {
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  success: (toast: Omit<Toast, "type" | "id">) => void;
  error: (toast: Omit<Toast, "type" | "id">) => void;
  warning: (toast: Omit<Toast, "type" | "id">) => void;
  hideToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const addToast = (toast: Toast) => setToast(toast);
  const removeToast = (id: string) => {
    if (toast?.id === id) setToast(null);
  };
  const hideToast = () => setToast(null);

  const success = (toast: Omit<Toast, "type" | "id">) => {
    addToast({ ...toast, type: "success", id: v4() });
  };

  const error = (toast: Omit<Toast, "type" | "id">) => {
    addToast({ ...toast, type: "danger", id: v4() });
  };

  const warning = (toast: Omit<Toast, "type" | "id">) => {
    addToast({ ...toast, type: "warning", id: v4() });
  };

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast, hideToast, success, error, warning }}
    >
      {children}
      {toast && <ToastComponent {...toast} />}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
