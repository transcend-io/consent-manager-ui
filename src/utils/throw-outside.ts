// local
import { requestIdleCallback } from './idle-callback';

/**
 * Helper for throwing errors without interrupting our code
 *
 * @param ex - Error to throw
 */
export const throwOutside = (ex: Error | DOMException | DOMError): void => {
  requestIdleCallback(() => {
    throw ex;
  });
};
