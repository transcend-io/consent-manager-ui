import { Fragment, h, JSX } from 'preact';

/**
 * A switch
 */
export function Switch({
  id,
  checked,
  handleSwitch,
  label,
}: {
  /** Based opt in status */
  checked: boolean;
  /** Parent's event handler */
  handleSwitch: (
    checked: boolean,
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => void;
  /** The ID of the switch */
  id: string;
  /** The label for the switch */
  label: string;
}): JSX.Element {
  return (
    <Fragment>
      <label className="switch label">
        <input
          key={id}
          className="switch switch-checkbox"
          id={`switch-${id}`}
          type="checkbox"
          checked={checked}
          onClick={(e) => {
            handleSwitch(!checked, e);
          }}
        />
        <span className="switch switch-background">
          <span className={`switch switch-button`} />
        </span>
        {label}
      </label>
    </Fragment>
  );
}
