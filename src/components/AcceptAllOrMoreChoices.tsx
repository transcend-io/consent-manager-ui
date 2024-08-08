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
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Global variables to pass to message contents */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  // Opt in to all purposes
  const handleAcceptAll:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    airgap.optIn(event);
    handleSetViewState('close');
  };

  // redirect to more choices
  const handleMoreChoices:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    handleSetViewState('CompleteOptions');
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
      <div
        className="accept-or-reject-all-button-row"
        role="group"
        aria-label={formatMessage(
          messages.buttonGroupAriaDescription,
          globalUiVariables,
        )}
      >
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
