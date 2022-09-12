import { requestIdleCallback } from './idle-callback';

/**
 * Helper for throwing errors without interrupting our code
 *
 * @param ex - Error to throw
 */
export const throwOutside = (ex: Error | DOMException | unknown): void => {
  requestIdleCallback(() => {
    throw ex;
  });
};
