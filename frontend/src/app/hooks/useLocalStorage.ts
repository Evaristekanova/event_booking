import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      // Try to parse as JSON first, fallback to raw string if it fails
      try {
        return JSON.parse(item);
      } catch {
        // If JSON parsing fails, return the raw string value
        // This handles cases where the value was stored as a plain string (like JWT tokens)
        return item as T;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      if (typeof window !== "undefined") {
        // Store primitive values (strings, numbers, booleans) directly
        // Store objects and arrays as JSON
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

  // Remove item from localStorage
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

  // Clear all localStorage
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

  // Sync with other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          // Try to parse as JSON first, fallback to raw string if it fails
          try {
            setStoredValue(JSON.parse(e.newValue));
          } catch {
            // If JSON parsing fails, treat as raw string
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
    // Convenience getters for common types
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

// Convenience hooks for common types
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
