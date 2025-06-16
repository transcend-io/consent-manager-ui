import { h, JSX } from 'preact';

/**
 * Button with click handler to match Airgap's requirement of having a UIEvent
 */
export function Button({
  primaryText,
  secondaryText,
  handleClick,
  type,
  ariaDescription,
  initialFocus,
}: {
  /** The button primary text */
  primaryText: string;
  /** The button secondary text */
  secondaryText?: string;
  /** Parent handler for the form */
  handleClick: JSX.MouseEventHandler<HTMLButtonElement> | undefined;
  /** Optional button type */
  type?: 'submit' | 'reset' | 'button';
  /** Aria button description */
  ariaDescription?: string;
  /** Whether to autofocus this button */
  initialFocus?: true;
}): JSX.Element {
  return (
    <button
      className="button"
      onClick={handleClick}
      type={type || 'button'}
      aria-description={ariaDescription}
      data-initialFocus={initialFocus}
    >
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
