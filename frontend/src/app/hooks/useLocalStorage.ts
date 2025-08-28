import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      try {
        return JSON.parse(item);
      } catch {
        return item as T;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        if (
          typeof valueToStore === "string" ||
          typeof valueToStore === "number" ||
          typeof valueToStore === "boolean"
        ) {
          window.localStorage.setItem(key, String(valueToStore));
        } else {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  const clearAll = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.clear();
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          try {
            setStoredValue(JSON.parse(e.newValue));
          } catch {
            setStoredValue(e.newValue as T);
          }
        } catch (error) {
          console.error(
            `Error parsing localStorage value for key "${key}":`,
            error
          );
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearAll,
    getString: () => (typeof storedValue === "string" ? storedValue : ""),
    getNumber: () => (typeof storedValue === "number" ? storedValue : 0),
    getBoolean: () => (typeof storedValue === "boolean" ? storedValue : false),
    getObject: () =>
      typeof storedValue === "object" && storedValue !== null
        ? storedValue
        : {},
    getArray: () => (Array.isArray(storedValue) ? storedValue : []),
  };
}

export function useLocalStorageString(key: string, initialValue: string = "") {
  return useLocalStorage(key, initialValue);
}

export function useLocalStorageNumber(key: string, initialValue: number = 0) {
  return useLocalStorage(key, initialValue);
}

export function useLocalStorageBoolean(
  key: string,
  initialValue: boolean = false
) {
  return useLocalStorage(key, initialValue);
}

export function useLocalStorageObject<T extends Record<string, unknown>>(
  key: string,
  initialValue: T
) {
  return useLocalStorage(key, initialValue);
}

export function useLocalStorageArray<T>(key: string, initialValue: T[] = []) {
  return useLocalStorage(key, initialValue);
}
