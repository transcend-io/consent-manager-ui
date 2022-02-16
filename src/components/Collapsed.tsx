// external
import { h, JSX } from 'preact';
import { useRef } from 'preact/hooks';
import { useIntl } from 'react-intl';

// global
import { useConfig, useElementSize, useEmotion } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';

// local
import { Logomark } from './Logo';

/**
 * The collapsed view, optionally displayed on close if customer does not yet have their own button
 */
export default function Collapsed({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();
  const { formatMessage } = useIntl();
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { width } = useElementSize(paragraphRef);

  const diameter = 32; // px
  const padding = 6; // px
  const hoverWidth = diameter + padding + (width || 94); // px, width with text on hover

  const containerCollapsedStyle = css`
    /* Box positioning */
    position: fixed;
    bottom: 100px;
    right: 5px;

    /* Box sizing */
    width: ${diameter}px;
    height: ${diameter}px;

    /* Box styling */
    box-sizing: border-box;
    border: none;
    border-radius: ${diameter / 2}px;
    background-color: rgba(255, 255, 255, 0.95);
    overflow: hidden;
    cursor: pointer;

    /* Content */
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
      helvetica neue, helvetica, 'sans-serif';

    /* Background interactions */
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px) saturate(5);

    /* Transitions */
    transition: width 150ms ease-in 500ms, background-color 150ms ease-in-out,
      box-shadow 150ms ease-in-out;

    &:active {
      background-color: rgba(255, 255, 255, 0.85);
      box-shadow: 0px 0.5px 5px 1.5px rgba(0, 0, 0, 0.12);
    }

    &:hover {
      width: ${hoverWidth}px;
      transition-delay: 0ms;
    }

    /** SVG */
    &:hover path {
      fill: ${config.theme.primaryColor};
    }

    /* Paragraph */
    p {
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;

      opacity: 0;
      transition: opacity 150ms ease-in 500ms;
    }

    &:hover p {
      opacity: 1;
      transition-delay: 0ms;
    }
  `;

  const squareLogoSVGStyle = css`
    width: 20px;
    height: 20px;
    padding: ${padding}px;
    flex-shrink: 0;

    path {
      fill: ${config.theme.fontColor};
      transition: fill 150ms;
    }
  `;

  return (
    <button
      onClick={() => handleSetViewState('open')}
      className={cx(containerCollapsedStyle)}
      aria-label={formatMessage(messages.collapsedLabel)}
    >
      <svg
        className={cx(squareLogoSVGStyle)}
        viewBox="0 0 15.25 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Logomark />
      </svg>
      <p ref={paragraphRef}>{formatMessage(messages.collapsedLabel)}</p>
    </button>
  );
}
