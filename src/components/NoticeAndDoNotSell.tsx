import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { messages, noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { useAirgap } from '../hooks';
import { Button } from './Button';
import { CONSENT_OPTIONS } from '../constants';
import { ObjByString } from '@transcend-io/type-utils';

/**
 * Component showing 'okay' button for "do not sell my personal information" interface
 */
export function NoticeAndDoNotSell({
  handleSetViewState,
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { airgap, buildStrictAuth } = useAirgap();
  const { formatMessage } = useIntl();

  const handleConfirm: JSX.MouseEventHandler<HTMLButtonElement> | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    // Confirm current consent
    airgap.setConsent(
      buildStrictAuth({ auth: event }),
      airgap.getConsent().purposes,
      CONSENT_OPTIONS,
    );
    handleSetViewState('close');
  };

  return (
    <div className="column-content" role="none">
      <p
        id="consent-dialog-title"
        role="heading"
        className="text-title text-title-left"
      >
        {formatMessage(messages.noticeTitle, globalUiVariables)}
      </p>
      <Button
        primaryText={formatMessage(
          noticeAndDoNotSellMessages.confirmButtonPrimary,
          globalUiVariables,
        )}
        handleClick={handleConfirm}
        ariaDescription={formatMessage(
          messages.noticeButtonAriaDescription,
          globalUiVariables,
        )}
        initialFocus
      />
    </div>
  );
}
