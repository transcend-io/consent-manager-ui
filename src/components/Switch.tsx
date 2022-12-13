import { Fragment, h, JSX } from 'preact';

/**
 * A switch
 */
export function Switch({
  id,
  checked,
  handleSwitch,
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
}): JSX.Element {
  return (
    <Fragment>
      <input
        key={id}
        className="switch-checkbox"
        id={`switch-${id}`}
        type="checkbox"
        checked={checked}
        onClick={(e) => {
          handleSwitch(!checked, e);
        }}
      />
      <label className="switch-label" htmlFor={`switch-${id}`}>
        <span className={`switch-button`} />
      </label>
    </Fragment>
  );
}
