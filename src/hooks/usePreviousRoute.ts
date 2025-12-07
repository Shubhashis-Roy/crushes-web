import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks the last route visited before the current one.
 * Works across full route transitions.
 */
//! NOT USE
export const usePreviousRoute = (): string | null => {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);
  const currentPath = useRef<string | null>(location.pathname);

  useEffect(() => {
    // When location changes, update refs
    if (currentPath.current !== location.pathname) {
      previousPath.current = currentPath.current;
      currentPath.current = location.pathname;
    }
  }, [location.pathname]);

  return previousPath.current;
};
