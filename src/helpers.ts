import { ORDER_OF_PURPOSES } from './components/constants';
import type { ConsentSelection } from './types';

/**
 * Focuses first descendant of the root arg with the data-initialFocus attribute
 *
 * @param root - element to use as document root
 */
export function initialFocusElement(root: Element | DocumentFragment): void {
  const el = root.querySelector(
    'button[data-initialFocus=true], input[data-initialFocus=true]',
  ) as HTMLButtonElement | HTMLInputElement | null;
  el?.focus();
}

export const sortByPurposeOrder = (
  [a]: [keyof ConsentSelection, ...unknown[]],
  [b]: [keyof ConsentSelection, ...unknown[]],
): number =>
  // sort custom purposes to the end
  ORDER_OF_PURPOSES.indexOf(a) < 0 && ORDER_OF_PURPOSES.indexOf(b) > 0
    ? 1
    : ORDER_OF_PURPOSES.indexOf(b) < 0 && ORDER_OF_PURPOSES.indexOf(a) > 0
    ? -1
    : // order purposes based on order defined above
      ORDER_OF_PURPOSES.indexOf(a) - ORDER_OF_PURPOSES.indexOf(b);
