import { h, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { getConsentSelections } from '../consent-selections';
import { CONSENT_OPTIONS } from '../constants';
import { useAirgap, useGetPurposeMessageKeys } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { CloseButton } from './CloseButton';
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
      <CloseButton
        onClick={() => {
          handleSetViewState('close');
        }}
        className="complete-options-toggle-close"
        fontColor={fontColor}
      />
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
