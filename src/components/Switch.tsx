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
  autoFocus,
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
  autoFocus?: true;
}): JSX.Element {
  const handleClick = (e: JSX.TargetedEvent<HTMLInputElement, Event>): void =>
    handleSwitch(!checked, e);

  return (
    <label className="switch label">
      <input
        className="switch switch-checkbox screen-reader"
        id={`switch-${id}`}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onClick={handleClick}
        onKeyPress={(e) => {
          if (e.key !== 'Enter') return;
          handleSwitch(!checked, e);
        }}
        {...{
          'data-autofocus': autoFocus,
        }}
      />
      <span className="switch switch-background">
        <span className="switch switch-button" />
      </span>
      {label}
    </label>
  );
}
