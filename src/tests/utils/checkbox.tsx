import {
  fireEvent,
  RenderResult,
} from '@testing-library/preact';

export const getPurposeCheckState = <T extends RenderResult>(
  screen: T,
  purposeName: string,
): boolean => {
  const checkboxEl = screen
    .getByText(purposeName, { exact: false })
    ?.querySelector('input');
  return !!checkboxEl?.checked;
};

export const clickPurposeCheckbox = <T extends RenderResult>(
  screen: T,
  purposeName: string,
): void => {
  const checkboxEl = screen
    .getByText(purposeName, { exact: false })
    ?.querySelector('input');
  if (checkboxEl) fireEvent.click(checkboxEl);
};
