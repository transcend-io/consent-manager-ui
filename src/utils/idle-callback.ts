// eslint-disable-next-line no-restricted-globals
const { setTimeout, clearTimeout } = self;

/** Polyfills for requestIdleCallback and cancelIdleCallback */

export const {
  requestIdleCallback = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...args: any[]) => any,
    options: {
      /** Callback timeout */
      timeout: number;
    } = { timeout: 0 },
  ): number => setTimeout(callback, options.timeout),
  cancelIdleCallback = (callbackId: number) => {
    clearTimeout(callbackId);
  },
  // eslint-disable-next-line no-restricted-globals
} = self;
