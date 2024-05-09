import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { CloseButton } from './CloseButton';
import { GPCIndicator } from './GPCIndicator';
import { Switch } from './Switch';

// Timer for save state
let savingTimeout: ReturnType<typeof setTimeout>;

/**
 * Component showing explanatory text before offering a way
 * to opt out of the sale or share of data
 */
export function AcceptAllRejectAllToggle({
  handleSetViewState,
  fontColor,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Font color */
  fontColor: string;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();
  const [saving, setSaving] = useState<boolean | null>(null);
  const [consentLocal, setConsentLocal] = useState(
    !!airgap.getConsent().purposes.SaleOfInfo,
  );
  const switchId = `all-purposes`;

  const handleSwitch = (
    checked: boolean,
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ): void => {
    if (checked) {
      event.preventDefault();
      airgap.optIn(event);
    } else {
      event.preventDefault();
      airgap.optOut(event);
    }

    setConsentLocal(checked);
    setSaving(true);

    // Clear any existing timeouts still running
    if (savingTimeout) {
      clearTimeout(savingTimeout);
    }
    savingTimeout = setTimeout(() => {
      setSaving(false);
    }, 500);
  };

  return (
    <div className="column-content" role="none">
      <CloseButton
        onClick={() => {
          handleSetViewState('close');
        }}
        className="accept-all-reject-all-toggle-close"
        fontColor={fontColor}
      />
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(messages.consentTitleAcceptAllRejectAllToggle)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            <div
              role="paragraph"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: formatMessage(
                  messages.acceptAllRejectAllToggleDescription,
                ),
              }}
            />
          </p>
        </div>
        <div className="margin-tops do-not-sell-explainer-interface">
          <GPCIndicator />
          <Switch
            id={switchId}
            checked={consentLocal}
            handleSwitch={handleSwitch}
            label={formatMessage(
              consentLocal
                ? messages.doNotSellOptedIn
                : messages.doNotSellOptedOut,
            )}
            initialFocus
          />
          <p
            className="paragraph"
            role={'status'}
            aria-hidden={typeof saving === 'boolean' ? 'false' : 'true'}
          >
            {typeof saving === 'boolean'
              ? formatMessage(
                  saving
                    ? messages.saving
                    : consentLocal
                    ? messages.preferencesSavedOptedIn
                    : messages.preferencesSaved,
                )
              : '\u200b'}
          </p>
        </div>
      </div>
    </div>
  );
}
