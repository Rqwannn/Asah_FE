import React, { createContext, useContext, useState, useCallback } from "react";
import { X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              min-w-[300px] p-4 rounded-lg shadow-lg flex items-center justify-between animate-in slide-in-from-right
              ${t.type === "success" ? "bg-green-100 border border-green-200 text-green-800" : ""}
              ${t.type === "error" ? "bg-red-100 border border-red-200 text-red-800" : ""}
              ${t.type === "info" ? "bg-white border border-gray-200 text-gray-800" : ""}
            `}
          >
            <div className="flex items-center gap-2">
              {t.type === "success" && <i className="ri-checkbox-circle-fill text-green-600"></i>}
              {t.type === "error" && <i className="ri-error-warning-fill text-red-600"></i>}
              <span className="text-sm font-medium">{t.message}</span>
            </div>
            <button onClick={() => removeToast(t.id)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
