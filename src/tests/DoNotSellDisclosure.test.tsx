import '@testing-library/jest-dom';

import { h } from 'preact';
import { render, testWindow } from './utils/render';
import { test, expect, describe } from '@jest/globals';

import { DoNotSellDisclosure } from '../components/DoNotSellDisclosure';
import { MOCK_PURPOSES_OPTED_IN } from './utils/constants';
import { init as initMockAirgap } from './utils/ag-mock'

describe('DoNotSellDisclosure', () => {
  test('matches snapshot', () => {
    const { snapshot } = render(<DoNotSellDisclosure modalOpenAuth={null} handleSetViewState={() => null} />);
    expect(snapshot).toMatchSnapshot();
  });

  test('opts you out of sale of info on render', async () => {
    initMockAirgap(MOCK_PURPOSES_OPTED_IN);
    const prevConsent = { ...testWindow.airgap.getConsent() };
    render(<DoNotSellDisclosure modalOpenAuth={null} handleSetViewState={() => null} />);

    await (new Promise((resolve) => { setTimeout(resolve, 5) }))

    const consent = { ...testWindow.airgap.getConsent() };
    expect(!!prevConsent.purposes?.SaleOfInfo).toEqual(!consent.purposes?.SaleOfInfo);
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });
});
