import { ObjByString } from '@transcend-io/type-utils';
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
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Font color */
  fontColor: string;
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { airgap, buildStrictAuth } = useAirgap();
  const { formatMessage } = useIntl();

  return (
    <div className="column-content" role="none">
      <CloseButton
        onClick={(event) => {
          event.preventDefault();
          airgap.setConsent(
            buildStrictAuth({ auth: event }),
            {},
            CONSENT_OPTIONS,
          );
          handleSetViewState('close');
        }}
        globalUiVariables={globalUiVariables}
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
              globalUiVariables,
            )}
          </p>
        </div>
        <div>
          <p
            className="paragraph"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: formatMessage(
                messages.privacyPolicyNoticeWithCloseButtonDescription,
                globalUiVariables,
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
