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
