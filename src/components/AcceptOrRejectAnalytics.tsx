import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept" or "reject" for Analytics purpose
 */
export function AcceptOrRejectAnalytics({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  return (
    <div className="column-content" role="none">
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(messages.consentTitleAcceptOrRejectAnalytics)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            <div
              role="paragraph"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: formatMessage(
                  messages.acceptOrRejectAnalyticsDescription,
                ),
              }}
            />
          </p>
        </div>
      </div>
      <div
        className="accept-or-reject-all-button-row"
        role="group"
        aria-label={formatMessage(messages.buttonGroupAriaDescription)}
      >
        <Button
          primaryText={formatMessage(messages.rejectAnalytics)}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(event, { Analytics: false }, CONSENT_OPTIONS);
            handleSetViewState('close');
          }}
          autoFocus
        />
        <Button
          primaryText={formatMessage(messages.acceptAnalytics)}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(event, { Analytics: true }, CONSENT_OPTIONS);
            handleSetViewState('close');
          }}
        />
      </div>
    </div>
  );
}
