import { Fragment, h, JSX } from 'preact';

/**
 * A switch
 */
export function Switch({
  id,
  checked,
  handleSwitch,
  disabled,
  label,
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
}): JSX.Element {
  const handleClick = (
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ): void => {
    event.preventDefault();
    handleSwitch(!checked, event);
  };

  return (
    <Fragment>
      <label className="switch label">
        <input
          key={id}
          className="switch switch-checkbox screen-reader"
          id={`switch-${id}`}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onClick={handleClick}
        />
        <span className="switch switch-background">
          <span className="switch switch-button" />
        </span>
        {label}
      </label>
    </Fragment>
  );
}
