/**
 * Focuses first descendant of the root arg with the data-autofocus attribute
 *
 * @param root - element to use as document root
 */
export function autoFocusElement(root: Element | DocumentFragment): void {
  const el = root.querySelector(
    'button[data-autofocus=true], input[data-autofocus=true]',
  ) as HTMLButtonElement | HTMLInputElement | null;
  el?.focus();
}
