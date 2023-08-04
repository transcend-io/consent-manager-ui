import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
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
  const switchId = `sale-of-info-${consentLocal}`;

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
    <div className="column-content">
      <button
        type="button"
        aria-label={formatMessage(messages.close)}
        className="do-not-sell-explainer-close"
        onClick={() => {
          handleSetViewState('close');
        }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill={fontColor}
            // eslint-disable-next-line max-len
            d="M25.71 24.29a.996.996 0 1 1-1.41 1.41L16 17.41 7.71 25.7a.996.996 0 1 1-1.41-1.41L14.59 16l-8.3-8.29A.996.996 0 1 1 7.7 6.3l8.3 8.29 8.29-8.29a.996.996 0 1 1 1.41 1.41L17.41 16l8.3 8.29z"
          />
        </svg>
        <span className="screen-reader">{formatMessage(messages.close)}</span>
      </button>
      <div>
        <div>
          <p className="text-title text-title-left">
            {formatMessage(messages.consentTitleDoNotSellExplainer)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.doNotSellDescription),
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
          />

          <p className="paragraph">
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
