import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept" or "reject"
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
    <div className="column-content">
      <div>
        <p className="text-title text-title-left">
          {formatMessage(messages.consentTitleAcceptOrRejectAnalytics)}
        </p>
        <p className="paragraph">
          {formatMessage(messages.acceptOrRejectAnalyticsDescription)}
        </p>
      </div>
      <div className="accept-or-reject-all-button-row">
        <Button
          primaryText={formatMessage(messages.acceptAnalytics)}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(event, { Analytics: true });
            handleSetViewState('close');
          }}
        />
        <Button
          primaryText={formatMessage(messages.rejectAnalytics)}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(event, { Analytics: false });
            handleSetViewState('close');
          }}
        />
      </div>
    </div>
  );
}
