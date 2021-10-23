const { setTimeout, clearTimeout } = self;

/** Polyfills for requestIdleCallback and cancelIdleCallback */

export const {
  requestIdleCallback = (
    callback: (...args: any[]) => any,
    options: {
      /** Callback timeout */
      timeout: number;
    } = { timeout: 0 },
  ): number => setTimeout(callback, options.timeout),
  cancelIdleCallback = (callbackId: number) => {
    clearTimeout(callbackId);
  },
} = self;
