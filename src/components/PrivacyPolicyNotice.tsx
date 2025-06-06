import { ObjByString } from '@transcend-io/type-utils';
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing explanatory text when privacy policy has changed
 */
export function PrivacyPolicyNotice({
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

  // Opt in to all purposes
  const handlePrivacyPolicyNotice:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    airgap.setConsent(buildStrictAuth({ auth: event }), {}, CONSENT_OPTIONS);
    handleSetViewState('close');
  };

  return (
    <div className="column-content" role="none">
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(
              messages.consentTitlePrivacyPolicyNotice,
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
                messages.privacyPolicyNoticeDescription,
                globalUiVariables,
              ),
            }}
          />
        </div>
      </div>
      <Button
        primaryText={formatMessage(
          messages.privacyPolicyNoticeButton,
          globalUiVariables,
        )}
        handleClick={handlePrivacyPolicyNotice}
        initialFocus
      />
    </div>
  );
}
