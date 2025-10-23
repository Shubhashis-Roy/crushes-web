// src/hooks/use-toast.ts
import { toast } from "react-hot-toast";
import { useCallback } from "react";

export function useToast() {
  const toastMessage = useCallback(({ title, description, type = "info" }) => {
    const message = description ? `${title}\n${description}` : title;

    if (type === "error") {
      toast.error(message, {
        style: {
          background: "rgba(45,27,67,0.85)",
          color: "#fff",
          border: "1px solid rgba(255,120,160,0.4)",
          backdropFilter: "blur(10px)",
        },
        position: "bottom-center",
      });
    } else if (type === "success") {
      toast.success(message, {
        style: {
          background: "rgba(45,27,67,0.85)",
          color: "#fff",
          border: "1px solid rgba(130,255,200,0.4)",
          backdropFilter: "blur(10px)",
        },
        position: "bottom-center",
      });
    } else {
      toast(message, {
        style: {
          background: "rgba(45,27,67,0.85)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
        },
        position: "bottom-center",
      });
    }
  }, []);

  return { toast: toastMessage };
}
