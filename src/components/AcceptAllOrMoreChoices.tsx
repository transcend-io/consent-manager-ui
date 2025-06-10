import { ViewState } from '@transcend-io/airgap.js-types';
import { ObjByString } from '@transcend-io/type-utils';
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept all or more choices" interface
 */
export function AcceptAllOrMoreChoices({
  handleSetViewState,
  globalUiVariables,
  moreChoicesViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global variables to pass to message contents */
  globalUiVariables: ObjByString;
  /** The view state to use for more-choices redirect */
  moreChoicesViewState: ViewState;
}): JSX.Element {
  const { airgap, buildStrictAuth } = useAirgap();
  const { formatMessage } = useIntl();

  // Opt in to all purposes
  const handleAcceptAll:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    airgap.optIn(buildStrictAuth({ auth: event }));
    handleSetViewState('close');
  };

  // redirect to more choices
  const handleMoreChoices:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    handleSetViewState(moreChoicesViewState);
  };

  return (
    <div className="column-content">
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(messages.consentTitleAcceptAll, globalUiVariables)}
          </p>
        </div>
        <div>
          <p
            className="paragraph"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: formatMessage(
                messages.acceptAllDescription,
                globalUiVariables,
              ),
            }}
          />
        </div>
      </div>
      <div className="accept-or-reject-all-button-row">
        <Button
          primaryText={formatMessage(
            messages.acceptAllButtonPrimary,
            globalUiVariables,
          )}
          handleClick={handleAcceptAll}
        />
        <Button
          primaryText={formatMessage(
            messages.moreChoicesButtonPrimary,
            globalUiVariables,
          )}
          handleClick={handleMoreChoices}
          initialFocus
        />
      </div>
    </div>
  );
}
