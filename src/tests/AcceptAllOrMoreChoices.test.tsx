import '@testing-library/jest-dom';

import { h } from 'preact';
import { render, testWindow } from './utils/render';
import { test, expect, describe, beforeEach } from '@jest/globals';

import { AcceptAllOrMoreChoices } from '../components/AcceptAllOrMoreChoices';
import { fireEvent } from '@testing-library/preact';
import { MOCK_PURPOSES_OPTED_OUT } from './utils/constants';
import { init as initMockAirgap } from './utils/ag-mock'
import { messages } from '../messages';

describe('AcceptAllOrMoreChoices', () => {
  beforeEach(() => {
    initMockAirgap(MOCK_PURPOSES_OPTED_OUT);
  });

  test('matches snapshot', () => {
    const { snapshot } = render(<AcceptAllOrMoreChoices handleSetViewState={() => null} />);
    expect(snapshot).toMatchSnapshot();
  });

  test('button ordering is consistent', () => {
    const { container } = render(<AcceptAllOrMoreChoices handleSetViewState={() => null} />);

    const domLabels = [...container.querySelectorAll('button')]
      ?.map((span) =>
        span.children[0].childNodes.item(0).textContent
      )

    expect(domLabels).toStrictEqual([
      messages.acceptAllButtonPrimary.defaultMessage,
      messages.moreChoicesButtonPrimary.defaultMessage,
    ]);
  });

  test('submission affects stored consent', () => {
    const prevConsent = { ...testWindow.airgap.getConsent() };
    const { container } = render(<AcceptAllOrMoreChoices handleSetViewState={() => null} />);

    // Ensure submission reflects purpose selection in airgap
    const submitButton = container.querySelector('button');
    if (submitButton) fireEvent.click(submitButton);

    const consent = { ...testWindow.airgap.getConsent() };

    Object.entries(MOCK_PURPOSES_OPTED_OUT).forEach(([, purpose]) => {
      expect(!!prevConsent.purposes?.[purpose.name]).toEqual(!consent.purposes?.[purpose.name]);
    });
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });

  test('that CompleteOptions is opened', () => {
    let calledArg;
    const { container } = render(<AcceptAllOrMoreChoices handleSetViewState={(state) => { calledArg = state }} />);

    const moreChoicesButton = container.querySelector('button:nth-of-type(2)');
    if (moreChoicesButton) fireEvent.click(moreChoicesButton);

    expect(calledArg).toEqual('CompleteOptions')
  });
});
