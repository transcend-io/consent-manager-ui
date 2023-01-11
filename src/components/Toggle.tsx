import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { completeOptionsMessages } from '../messages';

/**
 * A consent toggle
 */
export function Toggle({
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
  const { formatMessage } = useIntl();

  const [toggleState, setToggleState] = useState<boolean>(initialToggleState);

  const handleChange = (event: JSX.TargetedEvent): void => {
    const { checked } = event.target as HTMLInputElement; // preact typing bug https://github.com/preactjs/preact/issues/1930
    setToggleState(checked);
    handleToggle(checked);
  };

  const id = name.replace(/\s/g, '-').toLowerCase();

  return (
    <label
      className="toggle-label"
      htmlFor={id}
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
        className="toggle-input"
        type="checkbox"
        id={id}
        name={name}
        checked={toggleState}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="toggle-checkmark" />
      {name}
    </label>
  );
}
