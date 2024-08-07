import '@testing-library/jest-dom';

import { h } from 'preact';
import { render, testWindow } from './utils/render';
import { test, expect, describe } from '@jest/globals';

import { QuickOptions3 } from '../components/QuickOptions3';
import { fireEvent } from '@testing-library/preact';
import { MOCK_PURPOSES_OPTED_OUT } from './utils/constants';
import { init as initMockAirgap } from './utils/ag-mock'
import { quickOptionsMessages } from '../messages';

describe('QuickOptions3', () => {
  test('matches snapshot', () => {
    const { snapshot } = render(<QuickOptions3 handleSetViewState={() => null} />);
    expect(snapshot).toMatchSnapshot();
  });

  test('button ordering is consistent', () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_OUT);
    const { container } = render(<QuickOptions3 handleSetViewState={() => null} />);

    const domLabels = [...container.querySelectorAll('button')]
      ?.map((span) =>
        span.children[0].childNodes.item(0).textContent
      )

    expect(domLabels).toStrictEqual([
      quickOptionsMessages.essentialsButtonPrimary.defaultMessage,
      quickOptionsMessages.functionalAnalyticsButtonPrimary.defaultMessage,
      quickOptionsMessages.advertisingButtonPrimary.defaultMessage,
    ]);
  });

  test('submission affects stored consent (essential)', () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_OUT);
    const prevConsent = { ...testWindow.airgap.getConsent() };
    const { container } = render(<QuickOptions3 handleSetViewState={() => null} />);

    // Ensure submission reflects purpose selection in airgap
    const essentialButton = container.querySelector('button:nth-of-type(1)');
    if (essentialButton) fireEvent.click(essentialButton);

    const consent = { ...testWindow.airgap.getConsent() };

    Object.entries(MOCK_PURPOSES_OPTED_OUT).forEach(([, purpose]) => {
      expect(!!prevConsent.purposes?.[purpose.name]).toEqual(!!consent.purposes?.[purpose.name]);
    });
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });

  test('submission affects stored consent (functional)', () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_OUT);
    const prevConsent = { ...testWindow.airgap.getConsent() };
    const { container } = render(<QuickOptions3 handleSetViewState={() => null} />);

    // Ensure submission reflects purpose selection in airgap
    const functionalButton = container.querySelector('button:nth-of-type(2)');
    if (functionalButton) fireEvent.click(functionalButton);

    const consent = { ...testWindow.airgap.getConsent() };

    expect(!!prevConsent.purposes?.Functional).toEqual(!consent.purposes?.Functional);
    expect(!!prevConsent.purposes?.Analytics).toEqual(!consent.purposes?.Analytics);
    expect(!!prevConsent.purposes?.Advertising).toEqual(!!consent.purposes?.Advertising);
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });

  test('submission affects stored consent (advertising)', () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_OUT);
    const prevConsent = { ...testWindow.airgap.getConsent() };
    const { container } = render(<QuickOptions3 handleSetViewState={() => null} />);

    // Ensure submission reflects purpose selection in airgap
    const advertisingButton = container.querySelector('button:nth-of-type(3)');
    if (advertisingButton) fireEvent.click(advertisingButton);

    const consent = { ...testWindow.airgap.getConsent() };

    expect(!!prevConsent.purposes?.Functional).toEqual(!consent.purposes?.Functional);
    expect(!!prevConsent.purposes?.Analytics).toEqual(!consent.purposes?.Analytics);
    expect(!!prevConsent.purposes?.Advertising).toEqual(!consent.purposes?.Advertising);
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });
});
