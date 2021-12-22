// external
import { h, JSX } from 'preact';

// global
import { useConfig, useEmotion } from '../hooks';

/**
 * Button with click handler to match Airgap's requirement of having a UIEvent
 *
 * @param root0
 */
export default function Button({
  primaryText,
  secondaryText,
  handleClick,
}: {
  /** The button primary text */
  primaryText: string;
  /** The button secondary text */
  secondaryText?: string;
  /** Parent handler for the form */
  handleClick: JSX.MouseEventHandler<HTMLButtonElement> | undefined;
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();

  const baseTextStyle = css`
    color: ${config.theme.primaryColor};
    display: block;
    font-style: normal;
    text-align: center;
    transition: color 150ms;
  `;

  const primaryTextStyle = css`
    ${baseTextStyle}
    font-size: 12px;
    font-weight: 700;
  `;

  const secondaryTextStyle = css`
    ${baseTextStyle}
    font-size: 9px;
    font-weight: 400;
  `;

  const buttonStyle = css`
    min-height: 42px;
    border-radius: 500px;
    width: 100%;
    :not(:last-of-type) {
      margin-bottom: 8px;
    }
    background-color: rgba(255, 255, 255, 0.7);
    opacity: 0.9;
    border: 1px solid ${config.theme.primaryColor};
    box-sizing: border-box;
    cursor: pointer;
    filter: brightness(100%);
    flex-shrink: 0;

    font-family: inherit;
    text-align: center;
    padding: 6px;

    @media (min-width: ${config.breakpoints.tablet}) {
      width: 135px;
      :not(:last-of-type) {
        margin-bottom: 0;
      }
    }

    &:hover {
      background-color: ${config.theme.primaryColor};

      span {
        color: #ffffff;
      }
    }

    &:active {
      filter: brightness(80%);
    }

    transition: filter 150ms, background-color 150ms;
  `;

  return (
    <button className={cx(buttonStyle)} onClick={handleClick}>
      <span className={cx(primaryTextStyle)}>{primaryText}</span>
      {secondaryText && (
        <span className={cx(secondaryTextStyle)}>{secondaryText}</span>
      )}
    </button>
  );
}
