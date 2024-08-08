import '@testing-library/jest-dom';

import { h } from 'preact';
import { render, testWindow } from './utils/render';
import { clickPurposeCheckbox, getPurposeCheckState } from './utils/checkbox';
import { test, expect, describe, beforeEach } from '@jest/globals';

import { CompleteOptionsToggles } from '../components/CompleteOptionsToggles';
import { fireEvent } from '@testing-library/preact';
import {
  MOCK_PURPOSES_OPTED_IN,
  MOCK_TEMPLATE_VARIABLES,
} from './utils/constants';
import { DEFAULT_PURPOSE_TO_MESSAGE_KEY } from '../components/constants';
import { sortByPurposeOrder } from '../helpers';
import {
  getPurposeEntries,
  getPurposeMessage,
  getPurposeValues,
} from './utils/purposes';
import { init as initMockAirgap } from './utils/ag-mock';

describe('CompleteOptionsToggles', () => {
  beforeEach(() => {
    initMockAirgap(MOCK_PURPOSES_OPTED_IN);
  });

  test('matches snapshot', () => {
    const { snapshot } = render(
      <CompleteOptionsToggles
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    expect(snapshot).toMatchSnapshot();
  });

  test('purpose ordering is consistent', () => {
    const screen = render(
      <CompleteOptionsToggles
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    const { container } = screen;

    const sortedNamesToLabels = [
      DEFAULT_PURPOSE_TO_MESSAGE_KEY.Essential.defaultMessage,
      ...Object.values(MOCK_PURPOSES_OPTED_IN)
        .map((purpose) => [purpose.name] as [string])
        .sort(sortByPurposeOrder)
        .map(([purposeName]) =>
          purposeName in DEFAULT_PURPOSE_TO_MESSAGE_KEY
            ? DEFAULT_PURPOSE_TO_MESSAGE_KEY[purposeName].defaultMessage
            : purposeName,
        ),
    ];

    const domLabels = [
      ...container.querySelectorAll(
        'div.complete-options-toggle-interface label',
      ),
    ]
      ?.map((label) =>
        [...label.childNodes].find((child) => child.nodeType === 3),
      )
      .map((labelTextNode) => (labelTextNode as Text).textContent);

    expect(sortedNamesToLabels).toStrictEqual(domLabels);
  });

  test('defaults are honored', () => {
    const screen = render(
      <CompleteOptionsToggles
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    getPurposeEntries().forEach(([key, purpose]) => {
      const label = getPurposeMessage(purpose);
      expect(
        getPurposeCheckState(screen, label, { selector: 'label' }),
      ).toEqual(MOCK_PURPOSES_OPTED_IN[key].defaultConsent);
    });
  });

  test('check states change when clicked, submission affects stored consent', () => {
    const prevConsent = { ...testWindow.airgap?.getConsent() };
    const screen = render(
      <CompleteOptionsToggles
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    const { container } = screen;
    getPurposeEntries().forEach(([key, purpose]) => {
      const label = getPurposeMessage(purpose);
      clickPurposeCheckbox(screen, label, { selector: 'label' });
      expect(
        getPurposeCheckState(screen, label, { selector: 'label' }),
      ).toEqual(!MOCK_PURPOSES_OPTED_IN[key].defaultConsent);
    });

    // Ensure submission reflects purpose selection in airgap
    const submitButton = container.querySelector('button[type=submit]');
    if (submitButton) fireEvent.click(submitButton);

    const consent = { ...testWindow.airgap?.getConsent() };

    Object.entries(MOCK_PURPOSES_OPTED_IN).forEach(([, purpose]) => {
      expect(!!prevConsent.purposes?.[purpose.name]).toEqual(
        !consent.purposes?.[purpose.name],
      );
    });
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });

  test('purposes rerender on remount', () => {
    let screen = render(
      <CompleteOptionsToggles
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    let { container, unmount } = screen;
    getPurposeValues().forEach((purpose) => {
      const label = getPurposeMessage(purpose);
      clickPurposeCheckbox(screen, label, { selector: 'label' });
    });

    // Ensure submission reflects purpose selection in airgap
    const submitButton = container.querySelector('button[type=submit]');
    if (submitButton) fireEvent.click(submitButton);

    unmount();

    screen = render(
      <CompleteOptionsToggles
        fontColor="#000"
        handleSetViewState={() => null}
        globalUiVariables={MOCK_TEMPLATE_VARIABLES}
      />,
    );
    ({ container, unmount } = screen);

    // Ensure we rerender the ui with the new consent when unmounting and remounting ui
    getPurposeEntries().forEach(([key, purpose]) => {
      const label = getPurposeMessage(purpose);
      expect(
        getPurposeCheckState(screen, label, { selector: 'label' }),
      ).toEqual(!MOCK_PURPOSES_OPTED_IN[key].defaultConsent);
    });
  });
});
