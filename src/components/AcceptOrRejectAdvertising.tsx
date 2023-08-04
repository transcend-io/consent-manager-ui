import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept" or "reject" for Advertising purpose
 */
export function AcceptOrRejectAdvertising({
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
        <div>
          <p className="text-title text-title-left">
            {formatMessage(messages.consentTitleAcceptOrRejectAdvertising)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            {formatMessage(messages.acceptOrRejectAdvertisingDescription)}
          </p>
        </div>
      </div>
      <div className="accept-or-reject-all-button-row">
        <Button
          primaryText={formatMessage(messages.acceptAdvertising)}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(event, { Advertising: true }, CONSENT_OPTIONS);
            handleSetViewState('close');
          }}
        />
        <Button
          primaryText={formatMessage(messages.rejectAdvertising)}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(event, { Advertising: false }, CONSENT_OPTIONS);
            handleSetViewState('close');
          }}
        />
      </div>
    </div>
  );
}
