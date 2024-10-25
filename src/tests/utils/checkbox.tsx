import {
  fireEvent,
  RenderResult,
  SelectorMatcherOptions,
} from '@testing-library/preact';

export const getPurposeCheckState = <T extends RenderResult>(
  screen: T,
  purposeName: string,
  options: SelectorMatcherOptions = {},
): boolean => {
  const checkboxEl = screen
    .getByText(purposeName, { ...options, exact: false })
    ?.querySelector('input');
  return !!checkboxEl?.checked;
};

export const clickPurposeCheckbox = <T extends RenderResult>(
  screen: T,
  purposeName: string,
  options: SelectorMatcherOptions = {},
): void => {
  const checkboxEl = screen
    .getByText(purposeName, { ...options, exact: false })
    ?.querySelector('input');
  if (checkboxEl) fireEvent.click(checkboxEl);
};
