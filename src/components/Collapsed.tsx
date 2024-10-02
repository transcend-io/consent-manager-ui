import { ObjByString } from '@transcend-io/type-utils';
import { h, JSX } from 'preact';
import { useRef } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { TranscendLogoLogomark } from './TranscendLogo';

/**
 * The collapsed view, optionally displayed on close if customer does not yet have their own button
 */
export function Collapsed({
  handleSetViewState,
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  return (
    <button
      onClick={() => handleSetViewState('open')}
      className="collapsed-container"
      aria-label={formatMessage(messages.collapsedLabel, globalUiVariables)}
    >
      <svg
        className="collapsed-square-logo-svg"
        viewBox="0 0 15.25 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <TranscendLogoLogomark />
      </svg>
      <p ref={paragraphRef}>
        {formatMessage(messages.collapsedLabel, globalUiVariables)}
      </p>
    </button>
  );
}
