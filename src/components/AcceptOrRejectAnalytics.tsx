import { ObjByString } from '@transcend-io/type-utils';
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
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global UI view state variables */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { airgap, buildStrictAuth } = useAirgap();
  const { formatMessage } = useIntl();

  return (
    <div className="column-content">
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(
              messages.consentTitleAcceptOrRejectAnalytics,
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
                messages.acceptOrRejectAnalyticsDescription,
                globalUiVariables,
              ),
            }}
          />
        </div>
      </div>
      <div className="accept-or-reject-all-button-row">
        <Button
          primaryText={formatMessage(
            messages.acceptAnalytics,
            globalUiVariables,
          )}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(
              buildStrictAuth({ auth: event }),
              { Analytics: true },
              CONSENT_OPTIONS,
            );
            handleSetViewState('close');
          }}
        />
        <Button
          primaryText={formatMessage(
            messages.rejectAnalytics,
            globalUiVariables,
          )}
          handleClick={(event) => {
            event.preventDefault();
            airgap.setConsent(
              buildStrictAuth({ auth: event }),
              { Analytics: false },
              CONSENT_OPTIONS,
            );
            handleSetViewState('close');
          }}
          initialFocus
        />
      </div>
    </div>
  );
}
