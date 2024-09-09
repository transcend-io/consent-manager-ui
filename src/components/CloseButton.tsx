import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { messages } from '../messages';

/**
 * Close button, useful for closing modal
 */
export function CloseButton({
  className,
  fontColor,
  onClick,
  initialFocus,
}: {
  /** Class name of button */
  className: string;
  /** Font color */
  fontColor: string;
  /** Function to change viewState */
  onClick: (event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Whether to autofocus this button */
  initialFocus?: true;
}): JSX.Element {
  const { formatMessage } = useIntl();
  return (
    <button
      type="button"
      aria-label={formatMessage(messages.close)}
      className={className}
      onClick={onClick}
      data-initialFocus={initialFocus}
    >
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.06045 16.2227L0.460449 14.6227L6.86045 8.22266L0.460449 1.82266L2.06045 0.222656L8.46045 6.62266L14.8604 0.222656L16.4604 1.82266L10.0604 8.22266L16.4604 14.6227L14.8604 16.2227L8.46045 9.82266L2.06045 16.2227Z" fill="black"/>
      </svg>
      <span className="screen-reader">{formatMessage(messages.close)}</span>
    </button>
  );
}
