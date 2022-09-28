import { StateUpdater, useEffect, useState } from 'preact/hooks';

/**
 * useState hook, but initialized from and saved to localStorage
 *
 * @param initialState - The initial value (or a function that returns the initial value)
 * @param key - the localStorage key to store the value under
 * @returns the value and setter: same as useState
 */
export function useStickyState<T>(
  initialState: T | (() => T),
  key: string,
): [T, StateUpdater<T>] {
  const [value, setValue] = useState<T>(() => {
    // If this already exists in local storage, return that
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null) return JSON.parse(stickyValue);

    // If initialState is a function, call it and return the result (same implementation as useState)
    if (initialState instanceof Function) return initialState();
    return initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
