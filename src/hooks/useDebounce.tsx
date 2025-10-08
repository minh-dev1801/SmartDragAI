import { useRef, useCallback } from "react";

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 500
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const debounceCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { debounceCallback, cancel };
};
