import { h, JSX } from 'preact';

/**
 * A switch
 */
export function Switch({
  id,
  checked,
  handleSwitch,
  disabled,
  label,
  initialFocus,
}: {
  /** Based opt in status */
  checked: boolean;
  /** If disabled */
  disabled?: boolean;
  /** Parent's event handler */
  handleSwitch: (
    checked: boolean,
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => void;
  /** The ID of the switch */
  id: string;
  /** The label for the switch */
  label: string;
  /** Whether to autofocus this input */
  initialFocus?: true;
  }): JSX.Element {
  let labelClassName='switch label';
  let backgroundClassName = 'switch switch-background';
  if(disabled) {
    labelClassName+=' switch-disabled';
    backgroundClassName += ' switch-disabled';
  }
  return (
    <label className={labelClassName}>
      <input
        className="switch switch-checkbox screen-reader"
        id={`switch-${id}`}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={(e) => handleSwitch(!checked, e)}
        onKeyPress={(e) => {
          if (e.key !== 'Enter') return;
          handleSwitch(!checked, e);
        }}
        data-initialFocus={initialFocus}
      />
      <span className={backgroundClassName}>
        <span className="switch switch-button" />
      </span>
      {label}
    </label>
  );
}
