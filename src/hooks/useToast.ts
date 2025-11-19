import { toast } from "react-hot-toast";
import { useCallback } from "react";

type ToastType = "success" | "error" | "info";

interface ToastParams {
  title: string;
  description?: string;
  type?: ToastType;
}

export function useToast() {
  const toastMessage = useCallback(
    ({ title, description, type = "info" }: ToastParams) => {
      const message = description ? `${title}\n${description}` : title;

      const baseStyle = {
        background: "rgba(45,27,67,0.9)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
        fontSize: "14px",
        padding: "12px 16px",
      };

      const toastOptions = {
        duration: 2000, // auto dismiss after 2 sec
        position: "top-right" as const, // move to top right
        style: baseStyle,
      };

      switch (type) {
        case "success":
          toast.success(message, {
            ...toastOptions,
            style: {
              ...baseStyle,
              border: "1px solid rgba(80,255,180,0.4)",
            },
          });
          break;
        case "error":
          toast.error(message, {
            ...toastOptions,
            style: {
              ...baseStyle,
              border: "1px solid rgba(255,100,120,0.4)",
            },
          });
          break;
        default:
          toast(message, toastOptions);
      }
    },
    []
  );

  return { toast: toastMessage };
}
