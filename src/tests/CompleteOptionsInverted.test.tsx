import '@testing-library/jest-dom';

import { h } from 'preact';
import { render, testWindow } from './utils/render';
import { clickPurposeCheckbox, getPurposeCheckState } from './utils/checkbox';
import { test, expect, describe, beforeEach } from '@jest/globals';

import { CompleteOptionsInverted } from '../components/CompleteOptionsInverted';
import { fireEvent } from '@testing-library/preact';
import { MOCK_PURPOSES_OPTED_IN } from './utils/constants';
import { DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY } from '../components/constants';
import { sortByPurposeOrder } from '../helpers';
import { getPurposeEntries, getPurposeMessageInverted, getPurposeValues } from './utils/purposes';
import { init as initMockAirgap } from './utils/ag-mock'

describe('CompleteOptionsInverted', () => {
  beforeEach(() => {
    initMockAirgap(MOCK_PURPOSES_OPTED_IN);
  });

  test('matches snapshot', () => {
    const { snapshot } = render(<CompleteOptionsInverted handleSetViewState={() => null} />);
    expect(snapshot).toMatchSnapshot();
  });

  test('purpose ordering is consistent', () => {
    const screen = render(<CompleteOptionsInverted handleSetViewState={() => null} />);
    const { container } = screen;

    const sortedNamesToLabels = [
      ...Object.values(MOCK_PURPOSES_OPTED_IN)
        .map((purpose) => [purpose.name] as [string])
        .sort(sortByPurposeOrder)
        .map(([purposeName]) =>
          purposeName in DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY
            ? DEFAULT_PURPOSE_TO_INVERTED_MESSAGE_KEY[purposeName].defaultMessage
            : purposeName,
        ),
    ];

    const domLabels = [...container.querySelectorAll('form label')]
      ?.map((label) =>
        [...label.childNodes].find((child) => child.nodeType === 3),
      )
      .map((labelTextNode) => (labelTextNode as Text).textContent);

    expect(sortedNamesToLabels).toStrictEqual(domLabels);
  });

  test('defaults are honored', () => {
    const screen = render(<CompleteOptionsInverted handleSetViewState={() => null} />);
    getPurposeEntries().forEach(([key, purpose]) => {
      const label = getPurposeMessageInverted(purpose);
      expect(getPurposeCheckState(screen, label)).toEqual(
        !MOCK_PURPOSES_OPTED_IN[key].defaultConsent,
      );
    });
  });

  test('check states change when clicked, submission affects stored consent', () => {
    const prevConsent = { ...testWindow.airgap?.getConsent() };
    // console.log(prevConsent)
    const screen = render(<CompleteOptionsInverted handleSetViewState={() => null} />);
    const { container } = screen;
    getPurposeEntries().forEach(([key, purpose]) => {
      const label = getPurposeMessageInverted(purpose);
      clickPurposeCheckbox(screen, label);
      expect(getPurposeCheckState(screen, label)).toEqual(
        !!MOCK_PURPOSES_OPTED_IN[key].defaultConsent,
      );
    });

    // Ensure submission reflects purpose selection in airgap
    const submitButton = container.querySelector('button');
    if (submitButton) fireEvent.click(submitButton);

    const consent = { ...testWindow.airgap?.getConsent() };
    // console.log(consent)

    Object.entries(MOCK_PURPOSES_OPTED_IN).forEach(([, purpose]) => {
      expect(!!prevConsent.purposes?.[purpose.name]).toEqual(!consent.purposes?.[purpose.name]);
    });
    expect(prevConsent.confirmed).toEqual(false);
    expect(consent.confirmed).toEqual(true);
  });

  test('purposes rerender on remount', () => {
    let screen = render(<CompleteOptionsInverted handleSetViewState={() => null} />);
    let { container, unmount } = screen;
    getPurposeValues().forEach((purpose) => {
      const label = getPurposeMessageInverted(purpose);
      clickPurposeCheckbox(screen, label);
    });

    // Ensure submission reflects purpose selection in airgap
    const submitButton = container.querySelector('button');
    if (submitButton) fireEvent.click(submitButton);

    unmount();

    screen = render(<CompleteOptionsInverted handleSetViewState={() => null} />);
    ({ container, unmount } = screen);

    // Ensure we rerender the ui with the new consent when unmounting and remounting ui
    getPurposeEntries().forEach(([key, purpose]) => {
      const label = getPurposeMessageInverted(purpose);
      expect(getPurposeCheckState(screen, label)).toEqual(
        !!MOCK_PURPOSES_OPTED_IN[key].defaultConsent,
      );
    });
  });
});
