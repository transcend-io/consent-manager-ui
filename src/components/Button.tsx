import { h, JSX } from 'preact';

/**
 * Button with click handler to match Airgap's requirement of having a UIEvent
 */
export function Button({
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
  return (
    <button className="button" onClick={handleClick}>
      <span className="button-base-text button-primary-text">
        {primaryText}
      </span>
      {secondaryText && (
        <span className="button-base-text button-secondary-text">
          {secondaryText}
        </span>
      )}
    </button>
  );
}
