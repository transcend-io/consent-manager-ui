import '@testing-library/jest-dom';

import { h } from 'preact';
import { render, testWindow } from './utils/render';
import { test, expect, describe } from '@jest/globals';

import { OptOutDisclosure } from '../components/OptOutDisclosure';
import {
  MOCK_PURPOSES_OPTED_IN,
  MOCK_TEMPLATE_VARIABLES,
} from './utils/constants';
import { init as initMockAirgap } from './utils/ag-mock';

describe('OptOutDisclosure', () => {
  test('matches snapshot', () => {
    const { snapshot } = render(
      <OptOutDisclosure
        modalOpenAuth={null}
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('opts you out of all purposes on render', async () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_IN);
    const prevConsent = { ...testWindow.airgap.getConsent() };
    render(
      <OptOutDisclosure
        modalOpenAuth={null}
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 5);
    });

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
