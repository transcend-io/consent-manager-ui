import '@testing-library/jest-dom';

import { h } from 'preact';
import { render, testWindow } from './utils/render';
import { test, expect, describe } from '@jest/globals';

import { AcceptAllRejectAllToggle } from '../components/AcceptAllRejectAllToggle';
import { fireEvent } from '@testing-library/preact';
import {
  MOCK_PURPOSES_OPTED_IN,
  MOCK_PURPOSES_OPTED_OUT,
  MOCK_TEMPLATE_VARIABLES,
} from './utils/constants';
import { init as initMockAirgap } from './utils/ag-mock';

describe('AcceptAllRejectAllToggle', () => {
  test('matches snapshot', () => {
    const { snapshot } = render(
      <AcceptAllRejectAllToggle
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('submission affects stored consent (opted out)', () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_OUT);

    const prevConsent = { ...testWindow.airgap.getConsent() };
    const { container } = render(
      <AcceptAllRejectAllToggle
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );

    // Ensure submission reflects purpose selection in airgap
    const toggleCheckbox = container.querySelector('input');
    expect(toggleCheckbox?.checked).toEqual(false);
    if (toggleCheckbox) fireEvent.click(toggleCheckbox);

    const consent = { ...testWindow.airgap.getConsent() };

    Object.entries(MOCK_PURPOSES_OPTED_OUT).forEach(([, purpose]) => {
      expect(!!prevConsent.purposes?.[purpose.name]).toEqual(
        !consent.purposes?.[purpose.name],
      );
    });
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });

  test('submission affects stored consent (opted in)', () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_IN);

    const prevConsent = { ...testWindow.airgap.getConsent() };
    const { container } = render(
      <AcceptAllRejectAllToggle
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );

    // Ensure submission reflects purpose selection in airgap
    const toggleCheckbox = container.querySelector('input');
    expect(toggleCheckbox?.checked).toEqual(true);
    if (toggleCheckbox) fireEvent.click(toggleCheckbox);

    const consent = { ...testWindow.airgap.getConsent() };

    Object.entries(MOCK_PURPOSES_OPTED_IN).forEach(([, purpose]) => {
      expect(!!prevConsent.purposes?.[purpose.name]).toEqual(
        !consent.purposes?.[purpose.name],
      );
    });
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });
});
