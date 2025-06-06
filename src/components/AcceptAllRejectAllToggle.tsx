import { ObjByString } from '@transcend-io/type-utils';
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
  globalUiVariables,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Font color */
  fontColor: string;
  /** Global variables to pass to message contents */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { airgap, buildStrictAuth } = useAirgap();
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
      airgap.optIn(buildStrictAuth({ auth: event }));
    } else {
      event.preventDefault();
      airgap.optOut(buildStrictAuth({ auth: event }));
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
        globalUiVariables={globalUiVariables}
      />
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(
              messages.consentTitleAcceptAllRejectAllToggle,
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
                messages.acceptAllRejectAllToggleDescription,
                globalUiVariables,
              ),
            }}
          />
        </div>
        <div className="margin-tops do-not-sell-explainer-interface">
          <GPCIndicator globalUiVariables={globalUiVariables} />
          <Switch
            id={switchId}
            checked={consentLocal}
            handleSwitch={handleSwitch}
            label={formatMessage(
              consentLocal
                ? messages.doNotSellOptedIn
                : messages.doNotSellOptedOut,
              globalUiVariables,
            )}
            initialFocus
          />
          <p
            className="paragraph"
            role="status"
            aria-hidden={typeof saving === 'boolean' ? 'false' : 'true'}
          >
            {typeof saving === 'boolean'
              ? formatMessage(
                  saving
                    ? messages.saving
                    : consentLocal
                      ? messages.preferencesSavedOptedIn
                      : messages.preferencesSaved,
                  globalUiVariables,
                )
              : '\u200b'}
          </p>
        </div>
      </div>
    </div>
  );
}
