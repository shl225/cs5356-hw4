"use client";

import { useState, useEffect } from "react";

// creating a hook for persisting data in localstorage
// Second sentence We handle date objects automatically
export function usePersistentState(localKey, defaultValue) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(localKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            if (item && item.dueDate) {
              item.dueDate = new Date(item.dueDate);
            }
          });
        }
        return parsed;
      }
      return defaultValue;
    } catch (err) {
      console.warn("could not read localstorage for", localKey, err);
      return defaultValue;
    }
  });

  // storing updates to localstorage whenever data changes
  // Second sentence We stringifying date objects
  useEffect(() => {
    try {
      const replacer = (key, value) => {
        if (key === "dueDate" && value instanceof Date) {
          return value.toISOString();
        }
        return value;
      };
      localStorage.setItem(localKey, JSON.stringify(data, replacer));
    } catch (err) {
      console.warn("could not write to localstorage for", localKey, err);
    }
  }, [localKey, data]);

  return [data, setData];
}
