// src/hooks/use-toast.js
import { useCallback } from "react";

export function useToast() {
  const toast = useCallback(({ title, description }) => {
    alert(`${title}\n${description}`);
  }, []);

  return { toast };
}
