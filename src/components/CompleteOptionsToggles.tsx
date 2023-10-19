import { h, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { getConsentSelections } from '../consent-selections';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap, useGetPurposeMessageKeys } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { DEFAULT_PURPOSE_TO_MESSAGE_KEY, ORDER_OF_PURPOSES } from './constants';
import { Switch } from './Switch';

/**
 * Component showing explanatory text before offering a way
 * to toggle in and out
 */
export function CompleteOptionsToggles({
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

  // Get the tracking purposes from Airgap for display
  const initialConsentSelections = getConsentSelections(airgap);
  const purposeToMessageKey = useGetPurposeMessageKeys({
    consentSelection: initialConsentSelections,
    defaultPurposeToMessageKey: DEFAULT_PURPOSE_TO_MESSAGE_KEY,
  });
  const purposeToDescription = useMemo(() => airgap.getPurposeTypes(), []);

  // Set state on the currently selected toggles
  const [consentSelections, setConsentSelections] = useState(
    initialConsentSelections,
  );

  // sort ordering of options
  const orderedSelections = Object.entries(consentSelections).sort(([a], [b]) =>
    // sort custom purposes to the end
    ORDER_OF_PURPOSES.indexOf(a) < 0 && ORDER_OF_PURPOSES.indexOf(b) > 0
      ? 1
      : ORDER_OF_PURPOSES.indexOf(b) < 0 && ORDER_OF_PURPOSES.indexOf(a) > 0
      ? -1
      : // order purposes based on order defined above
        ORDER_OF_PURPOSES.indexOf(a) - ORDER_OF_PURPOSES.indexOf(b),
  );

  const handleSwitch = ({
    checked,
    purpose,
    event,
  }: {
    /** Checked */
    checked: boolean;
    /** Purpose name */
    purpose: string;
    /** Event */
    event: JSX.TargetedEvent<HTMLInputElement, Event>;
  }): void => {
    airgap.setConsent(event, { [purpose]: checked }, CONSENT_OPTIONS);
    setConsentSelections({
      ...consentSelections,
      [purpose]: checked,
    });
  };

  return (
    <div className="column-content">
      <button
        type="button"
        aria-label={formatMessage(messages.close)}
        className="complete-options-toggle-close"
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
          <p id="consent-dialog-title" className="text-title text-title-left">
            {formatMessage(messages.consentTitleCompleteOptionsToggle)}
          </p>
        </div>
        <div>
          <p className="paragraph">
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: formatMessage(
                  messages.consentTitleCompleteOptionsToggleDescription,
                ),
              }}
            />
          </p>
        </div>
        <div className="margin-tops complete-options-toggle-interface">
          <span key="essential">
            <Switch
              id={`Essential-true`}
              checked={true}
              disabled={true}
              handleSwitch={(checked, event) =>
                // this should never be called but makes type happy
                handleSwitch({
                  checked,
                  purpose: 'Essential',
                  event,
                })
              }
              label={
                Object.hasOwnProperty.call(purposeToMessageKey, 'Essential')
                  ? formatMessage(purposeToMessageKey.Essential)
                  : 'Essential'
              }
            />
            <p className="paragraph complete-options-toggle-description">
              {purposeToDescription.Essential?.description}
            </p>
          </span>
          {orderedSelections.map(([purpose, isChecked]) => (
            <span key={purpose}>
              <Switch
                id={`${purpose}-${isChecked}`}
                checked={isChecked}
                handleSwitch={(checked, event) =>
                  handleSwitch({
                    checked,
                    purpose,
                    event,
                  })
                }
                label={
                  Object.hasOwnProperty.call(purposeToMessageKey, purpose)
                    ? formatMessage(purposeToMessageKey[purpose])
                    : purpose
                }
              />
              <p className="paragraph complete-options-toggle-description">
                {purposeToDescription[purpose]?.description}
              </p>
            </span>
          ))}
          <p className="paragraph" />
        </div>
      </div>
    </div>
  );
}
