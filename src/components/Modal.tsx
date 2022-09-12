import { ComponentChild, h, JSX } from 'preact';
import type { ViewState } from '@transcend-io/airgap.js-types';
import { useConfig, useEmotion } from '../hooks';

/**
 * Styling for the banner/modal container
 */
export function Modal({
  children,
}: {
  /** The current view state */
  viewState: ViewState;
  /** Inner HTML of modal */
  children: ComponentChild;
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();

  // Modal style
  const mobileMargin = 5; // px
  const logoHeight = 17; // px
  const containerModalStyle = css`
    /* Box positioning */
    position: fixed;
    bottom: ${mobileMargin * 2}px;
    left: ${mobileMargin}px;
    right: ${mobileMargin}px;
    margin: 0 auto;

    /* Box sizing */
    width: calc(100% - ${mobileMargin * 2}px);

    @media (min-width: ${config.breakpoints.tablet}) {
      bottom: ${mobileMargin}px;
      max-width: 630px;
      min-height: 160px;
      bottom: 22px;
    }

    /* Box styling */
    box-sizing: border-box;
    border-radius: 18px;
    border: 0.5px solid #d8d8d8;
    background-color: rgba(255, 255, 255, 0.9);
    overflow: hidden;

    /* Content */
    padding: 21px;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir,
      helvetica neue, helvetica, 'sans-serif';

    /* Background interactions */
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px) saturate(5);

    /* Fade in */
    animation: fadeIn 150ms;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    /* Transition */
    transition: width 150ms, height 150ms;
  `;

  const containerModalInnerStyle = css`
    min-height: 79px;
    height: calc(100% - 38px);
    width: 100%;
    padding-bottom: ${21 + logoHeight}px;
  `;

  return (
    <div role="dialog" className={cx(containerModalStyle)}>
      <div role="document" className={cx(containerModalInnerStyle)}>
        {children}
      </div>
    </div>
  );
}
