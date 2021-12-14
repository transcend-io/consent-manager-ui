// external
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';

// global
import { useConfig, useEmotion } from '../hooks';
import { completeOptionsMessages } from '../messages';

/**
 * A consent toggle
 *
 * @param root0
 */
export default function Toggle({
  name,
  initialToggleState,
  disabled,
  handleToggle,
  ariaLabel,
}: {
  /** The name for this consent toggle */
  name: string;
  /** Based on Airgap local storage */
  initialToggleState: boolean;
  /** Whether this is a disabled input */
  disabled: boolean;
  /** Parent's event handler */
  handleToggle: (checked: boolean) => void;
  /** An override to the default aria label */
  ariaLabel?: string;
}): JSX.Element {
  const { config } = useConfig();
  const { css, cx } = useEmotion();
  const { formatMessage } = useIntl();

  const [toggleState, setToggleState] = useState<boolean>(initialToggleState);

  const handleChange = (event: JSX.TargetedEvent): void => {
    const { checked } = event.target as HTMLInputElement; // preact typing bug https://github.com/preactjs/preact/issues/1930
    setToggleState(checked);
    handleToggle(checked);
  };

  const checkboxSize = '16px';
  const disabledBackground = '#ececec';
  const disabledCheckmark = '#d8d8d8';

  // Span elt for the custom checkmark
  const checkmarkStyle = css`
    display: inline-block;
    width: ${checkboxSize};
    height: ${checkboxSize};
    box-sizing: border-box;
    border-radius: 4px;
    margin-right: 5px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid ${disabledCheckmark};
    position: absolute;
    top: 0;
    left: 0;
    transition: all 150ms ease, background 300ms ease;
    cursor: pointer;

    &:after {
      opacity: 0;
      transform-origin: bottom center;
      transform: rotate(45deg) scale(0);
      content: '';
      position: absolute;
      left: 1px;
      top: 0;
      width: 3px;
      height: 8px;
      border: solid #ffffff;
      border-width: 0px 2px 2px 0px;

      transition: all 150ms cubic-bezier(0.41, 0.94, 0.71, 1.41),
        opacity 150ms ease;
    }
  `;

  const inputStyle = css`
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }

    &:checked + span {
      background: ${config.theme.primaryColor};
      border-color: transparent;
      &:hover {
        filter: brightness(0.9);
      }
      &:after {
        opacity: 1;
        transform: rotate(45deg) scale(1);
      }
    }
    &:hover:enabled + span,
    &:focus-visible + span {
      border-color: ${config.theme.primaryColor};
    }
    &:disabled + span {
      background-color: ${disabledBackground};
      cursor: not-allowed;
      &:hover {
        filter: none;
        border-color: transparent;
      }
      &:after {
        border-color: ${disabledCheckmark};
      }
    }
  `;

  const labelStyle = css`
    position: relative;
    margin: 0 10px 15px 10px;
    font-size: 12px;
    font-weight: 500;
    height: ${checkboxSize};
    vertical-align: baseline;
    color: ${config.theme.fontColor};
    white-space: nowrap;
    text-shadow: none;
    padding-left: 25px;
    white-space: nowrap;
  `;

  return (
    <label
      className={labelStyle}
      htmlFor={name}
      aria-label={
        ariaLabel ||
        `${
          toggleState
            ? formatMessage(completeOptionsMessages.toggleDisable)
            : formatMessage(completeOptionsMessages.toggleEnable)
        } – ${name.toLocaleLowerCase()}`
      }
      title={
        ariaLabel ||
        `${
          toggleState
            ? formatMessage(completeOptionsMessages.toggleDisable)
            : formatMessage(completeOptionsMessages.toggleEnable)
        } – ${name.toLocaleLowerCase()}`
      }
    >
      <input
        className={cx(inputStyle)}
        type="checkbox"
        id={name}
        name={name}
        checked={toggleState}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className={cx(checkmarkStyle)} />
      {name}
    </label>
  );
}
