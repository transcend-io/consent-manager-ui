import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing explanatory text when privacy policy has changed
 */
export function PrivacyPolicyNotice({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  // Opt in to all purposes
  const handlePrivacyPolicyNotice:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    airgap.setConsent(event, {});
    handleSetViewState('close');
  };

  return (
    <div className="column-content">
      <div>
        <div>
          <p className="text-title text-title-left">
            {formatMessage(messages.consentTitlePrivacyPolicyNotice)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            {formatMessage(messages.privacyPolicyNoticeDescription)}
          </p>
        </div>
      </div>
      <Button
        primaryText={formatMessage(messages.privacyPolicyNoticeButton)}
        handleClick={handlePrivacyPolicyNotice}
      />
    </div>
  );
}