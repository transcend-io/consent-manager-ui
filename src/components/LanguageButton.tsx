// external
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, JSX } from 'preact';

// main
import { ViewState } from '@transcend-io/airgap.js-types';

// global
import { useConfig, useEmotion } from '../hooks';
import type { HandleSetViewState } from '../types';

// eslint-disable-next-line jsdoc/require-returns, jsdoc/require-param
/**
 * The button to change languages
 */
export default function LanguageButton({
  handleSetViewState,
  viewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Current viewState */
  viewState: ViewState;
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();

  const onLanguageOptions = viewState === ViewState.LanguageOptions;

  const languageButtonStyle = css`
    background: unset;
    border: unset;
    width: unset;
    padding: unset;
    margin: unset;

    width: 17px;
    height: 17px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;

    svg {
      fill: ${onLanguageOptions
        ? config.theme.primaryColor
        : config.theme.fontColor};
      transition: fill 150ms;
    }

    svg {
      &:hover {
        fill: ${config.theme.primaryColor};
      }

      &:active {
        fill: ${config.theme.primaryColor};
      }
    }
  `;

  const handleClick = (): void => {
    if (!onLanguageOptions) {
      handleSetViewState(ViewState.LanguageOptions);
    } else {
      handleSetViewState('back');
    }
  };

  return (
    <button className={cx(languageButtonStyle)} onClick={handleClick}>
      <svg
        fill={config.theme.fontColor}
        width="17"
        height="17"
        viewBox="0 0 17 17"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* eslint-disable-next-line max-len */}
        <path d="M1.54545 0C0.700815 0 0 0.700815 0 1.54545V10.0455C0 10.8901 0.700815 11.5909 1.54545 11.5909H5.40909V15.4545C5.40909 16.3084 6.10068 17 6.95455 17H15.4545C16.3084 17 17 16.3084 17 15.4545V6.95455C17 6.10068 16.3084 5.40909 15.4545 5.40909H11.5909V1.54545C11.5909 0.700815 10.8901 0 10.0455 0H1.54545ZM1.54545 1.54545H10.0455V6.18182L6.18182 10.0455H1.54545V1.54545ZM5.40909 2.70455V3.86364H3.09091V4.63636H6.95455C6.95455 5.83331 6.61732 6.55191 5.99618 7.02397C5.82635 7.15304 5.62398 7.26123 5.40154 7.35449C5.15205 7.2311 4.91771 7.09143 4.72088 6.92587C4.16677 6.45979 3.86364 5.86635 3.86364 5.40909H3.09091C3.09091 6.17969 3.5342 6.93826 4.22283 7.51749C4.26843 7.55584 4.32435 7.58639 4.37225 7.62314C3.98477 7.68505 3.56774 7.72727 3.09091 7.72727V8.5C3.95275 8.5 4.71991 8.41088 5.37589 8.19513C5.85407 8.3841 6.38426 8.5 6.95455 8.5V7.72727C6.76545 7.72727 6.58468 7.70391 6.40669 7.67596C6.42513 7.66256 6.44592 7.65201 6.46404 7.63823C7.29178 7.00915 7.72727 5.98942 7.72727 4.63636H8.5V3.86364H6.18182V2.70455H5.40909ZM10.3564 8.48189H12.0497L13.8804 13.9272H12.3712L12.0316 12.7304H10.2537L9.90359 13.9272H8.53018L10.3564 8.48189ZM11.114 9.7089L10.5178 11.7343H11.7705L11.1864 9.7089H11.114Z" />
      </svg>
    </button>
  );
}
