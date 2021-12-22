// external
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentChild, h, JSX } from 'preact';

// global
import { useConfig, useEmotion } from '../hooks';

// eslint-disable-next-line jsdoc/require-returns, jsdoc/require-param
/**
 * Wrapper for side-by-side content, as in the Do Not Sell and Accept All views
 */
export default function ColumnContent({
  children,
}: {
  /** Inner HTML of modal */
  children: ComponentChild;
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();

  const wrapperStyle = css`
    min-height: 79px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    @media (min-width: ${config.breakpoints.tablet}) {
      flex-direction: row;
    }

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
  `;

  return <div className={cx(wrapperStyle)}>{children}</div>;
}
