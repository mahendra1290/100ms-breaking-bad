import React from "react";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export function useDebounce(callback, wait) {
  return React.useCallback(debounce(callback, wait), []);
}
