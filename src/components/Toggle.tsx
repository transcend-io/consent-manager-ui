import { ObjByString } from '@transcend-io/type-utils';
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
  invertLabels,
  initialFocus,
  globalUiVariables,
}: {
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
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
  /** When true, invert the labels for the alt text */
  invertLabels?: boolean;
  /** Whether to autofocus this input */
  initialFocus?: true;
}): JSX.Element {
  const { formatMessage } = useIntl();

  const [toggleState, setToggleState] = useState<boolean>(initialToggleState);

  const handleChange = (checked: boolean): void => {
    setToggleState(checked);
    handleToggle(checked);
  };

  const id = name.replace(/\s/g, '-').toLowerCase();

  const useToggleDisable = invertLabels ? !toggleState : !!toggleState;
  return (
    <label
      className="toggle-label"
      aria-label={
        ariaLabel ||
        `${
          useToggleDisable
            ? formatMessage(
                completeOptionsMessages.toggleDisable,
                globalUiVariables,
              )
            : formatMessage(
                completeOptionsMessages.toggleEnable,
                globalUiVariables,
              )
        } – ${name.toLocaleLowerCase()}`
      }
      title={
        ariaLabel ||
        `${
          useToggleDisable
            ? formatMessage(
                completeOptionsMessages.toggleDisable,
                globalUiVariables,
              )
            : formatMessage(
                completeOptionsMessages.toggleEnable,
                globalUiVariables,
              )
        } – ${name.toLocaleLowerCase()}`
      }
    >
      <input
        className="toggle-input"
        type="checkbox"
        id={id}
        name={name}
        checked={toggleState}
        onChange={() => handleChange(!toggleState)}
        disabled={disabled}
        onKeyPress={(e) => {
          if (e.key !== 'Enter') return;
          e.stopPropagation();
          e.preventDefault();
          handleChange(!toggleState);
        }}
        data-initialFocus={initialFocus}
      />
      <span className="toggle-checkmark" />
      {name}
    </label>
  );
}
