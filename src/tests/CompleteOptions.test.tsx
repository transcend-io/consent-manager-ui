import '@testing-library/jest-dom';

import { h } from 'preact';
import { clickPurposeCheckbox, render } from './utils';
import { test, expect } from '@jest/globals';

import { CompleteOptions } from '../components/CompleteOptions';
import { fireEvent } from '@testing-library/preact';

/*
"Advertising"
"Analytics"
"CustomPurpose"
"Functional"
"SaleOfInfo"
"UniquePurpose"
*/

test('unique test', () => {
  const prevPurposes = { ...window.airgap?.getConsent().purposes };
  const screen = render(<CompleteOptions handleSetViewState={() => null} />);
  const { container } = screen;
  clickPurposeCheckbox(screen, 'Advertising');

  const submitButton = container.querySelector('button[type=submit]');
  if (submitButton) fireEvent.click(submitButton);

  const purposes = { ...window.airgap?.getConsent().purposes };

  // console.log(prevPurposes, purposes);

  expect(!!prevPurposes?.Advertising).toEqual(!purposes?.Advertising);

  /* Test:
   * input initial check state
   * purpose order
   * input check state after click
   * airgap consent
   */
});
