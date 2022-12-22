import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap, useConfig } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { GPCIndicator } from './GPCIndicator';
import { Switch } from './Switch';

/**
 * Component showing explanatory text before offering a way
 * to opt out of the sale or share of data
 */
export function DoNotSellExplainer({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();
  const { config } = useConfig();
  const [saving, setSaving] = useState<boolean | undefined>();
  const [consentLocal, setConsentLocal] = useState(
    !!airgap.getConsent().purposes.SaleOfInfo,
  );

  // Opt in to all purposes
  const handleDoNotSellExplainer = (
    checked: boolean,
    event: JSX.TargetedEvent,
  ): void => {
    event.preventDefault();
    airgap.setConsent(event, { SaleOfInfo: checked });
    setConsentLocal(checked);
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setTimeout(() => {
        setSaving(undefined);
      }, 2000);
    }, 1000);
  };

  const switchId = `sale-of-info-${consentLocal}`;

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
          {}
          <path
            fill={config.theme.fontColor}
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
            {typeof saving === 'boolean' && (
              <div>
                {formatMessage(
                  saving ? messages.saving : messages.preferencesSaved,
                )}
              </div>
            )}
          </p>
        </div>
        <div className="margin-tops">
          <GPCIndicator />
          <Switch
            id={switchId}
            checked={consentLocal}
            handleSwitch={handleDoNotSellExplainer}
            label={formatMessage(
              consentLocal
                ? messages.doNotSellOptedIn
                : messages.doNotSellOptedOut,
            )}
          />
        </div>
      </div>
    </div>
  );
}
