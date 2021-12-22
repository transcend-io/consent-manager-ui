// local
import { throwOutside } from './throw-outside';

/**
 * Attempt to parse JSON and catch any errors that happen during parsing.
 *
 * @param json - JSON to parse
 * @param fallback - Fallback value to return on error
 * @param reviver - JSON.parse reviver parameter
 * @returns Parsed JSON value or fallback value on error
 */
export const jsonParseSafe = (
  json: string,
  fallback: () => unknown = () => ({}),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviver?: (key: string, value: any) => any,
): ReturnType<typeof JSON.parse> => {
  try {
    return JSON.parse(json, reviver);
  } catch (ex) {
    throwOutside(ex);
    return fallback?.();
  }
};
