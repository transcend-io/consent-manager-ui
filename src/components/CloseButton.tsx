import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { messages } from 'src/messages';

/**
 * Close button, useful for closing modal
 */
export function CloseButton({
  className,
  fontColor,
  onClick,
}: {
  /** Class name of button */
  className: string;
  /** Font color */
  fontColor: string;
  /** Function to change viewState */
  onClick: (event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>) => void;
}): JSX.Element {
  const { formatMessage } = useIntl();
  return (
    <button
      type="button"
      aria-label={formatMessage(messages.close)}
      className={className}
      onClick={onClick}
    >
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill={fontColor}
          // eslint-disable-next-line max-len
          d="M25.71 24.29a.996.996 0 1 1-1.41 1.41L16 17.41 7.71 25.7a.996.996 0 1 1-1.41-1.41L14.59 16l-8.3-8.29A.996.996 0 1 1 7.7 6.3l8.3 8.29 8.29-8.29a.996.996 0 1 1 1.41 1.41L17.41 16l8.3 8.29z"
        />
      </svg>
      <span className="screen-reader">{formatMessage(messages.close)}</span>
    </button>
  );
}
