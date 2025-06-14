import { ObjByString } from '@transcend-io/type-utils';
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';

/**
 * Component showing "accept all" interface
 */
export function AcceptAll({
  handleSetViewState,
  globalUiVariables,
}: {
  /** Global variables to pass to message contents */
  globalUiVariables: ObjByString;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
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
      <Button
        primaryText={formatMessage(
          messages.acceptAllButtonPrimary,
          globalUiVariables,
        )}
        handleClick={handleAcceptAll}
        ariaDescription={formatMessage(
          messages.acceptAllButtonAriaDescription,
          globalUiVariables,
        )}
        initialFocus
      />
    </div>
  );
}
