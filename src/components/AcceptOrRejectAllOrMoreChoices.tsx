import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages, bottomMenuMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';
import { MenuItem } from './MenuItem';

/**
 * Component showing "accept all" or "reject all" or "more choices"
 */
export function AcceptOrRejectAllOrMoreChoices({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
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

  // Opt out of all non-essential purposes
  const handleRejectAll:
    | JSX.MouseEventHandler<HTMLButtonElement>
    | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    airgap.optOut(event);
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
            {formatMessage(messages.consentTitleAcceptAll)}
          </p>
        </div>
        <div>
          <p className="paragraph we-use-cookies-paragraph">
            <div role="paragraph">
              {formatMessage(messages.acceptAllDescription)}
              &nbsp;
              <a href="https://privacy.goshippo.com/policies?name=privacy-notice" class="privacy-policy-link" target="_blank" rel="noreferrer">
                {formatMessage(bottomMenuMessages.showPolicyButtonAcceptOrRejectAllOrMoreChoices)}
              </a>
            </div>
          </p>
        </div>
        <div
          className="accept-or-reject-all-button-row"
          role="group"
          aria-label={formatMessage(messages.buttonGroupAriaDescription)}
        >
          <Button
            primaryText={formatMessage(messages.acceptAllButtonPrimary)}
            handleClick={handleAcceptAll}
            initialFocus
          />
          <Button
            primaryText={formatMessage(messages.rejectAllButtonPrimary)}
            handleClick={handleRejectAll}
          />
          <Button
            primaryText={formatMessage(messages.moreChoicesButtonPrimary)}
            additionalClassName="button-large button"
            handleClick={handleMoreChoices}
          />
        </div>
      </div>
    </div>
  );
}
