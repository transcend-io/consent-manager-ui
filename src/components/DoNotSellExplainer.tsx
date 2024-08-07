import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { CONSENT_OPTIONS } from '../constants';
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
export function DoNotSellExplainer({
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

  const handleSwitch = (
    checked: boolean,
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ): void => {
    airgap.setConsent(event, { SaleOfInfo: checked }, CONSENT_OPTIONS);
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
        className="do-not-sell-explainer-close"
        fontColor={fontColor}
      />
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(messages.consentTitleDoNotSellExplainer)}
          </p>
        </div>
        <div>
          <div className="paragraph"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.doNotSellDescription),
            }}
          />
        </div>
        <div className="margin-tops do-not-sell-explainer-interface">
          <GPCIndicator />
          <Switch
            id="sale-of-info"
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
