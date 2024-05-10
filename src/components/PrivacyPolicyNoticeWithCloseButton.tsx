import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { CloseButton } from './CloseButton';

/**
 * Component showing explanatory text when privacy policy has changed
 * with no buttons except for a close button in the top right corner
 */
export function PrivacyPolicyNoticeWithCloseButton({
  handleSetViewState,
  fontColor,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Font color */
  fontColor: string;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  return (
    <div className="column-content" role="none">
      <CloseButton
        onClick={(event) => {
          event.preventDefault();
          airgap.setConsent(event, {}, CONSENT_OPTIONS);
          handleSetViewState('close');
        }}
        className="privacy-policy-notice-with-close-button-close"
        fontColor={fontColor}
        initialFocus
      />
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(
              messages.consentTitlePrivacyPolicyNoticeWithCloseButton,
            )}
          </p>
        </div>
        <div>
          <p className="paragraph">
            <div
              role="paragraph"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: formatMessage(
                  messages.privacyPolicyNoticeWithCloseButtonDescription,
                ),
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
