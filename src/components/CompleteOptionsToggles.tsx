import { ObjByString } from '@transcend-io/type-utils';
import { h, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { getConsentSelections } from '../consent-selections';
import { CONSENT_OPTIONS } from '../constants';
import {
  useAirgap,
  useGetPurposeDescriptionKeys,
  useGetPurposeMessageKeys,
} from '../hooks';
import { completeOptionsMessages, messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { CloseButton } from './CloseButton';
import {
  DEFAULT_PURPOSE_TO_DESCRIPTION_KEY,
  DEFAULT_PURPOSE_TO_MESSAGE_KEY,
  ORDER_OF_PURPOSES,
} from './constants';
import { Switch } from './Switch';
import { Button } from './Button';

/**
 * Component showing explanatory text before offering a way
 * to toggle in and out
 */
export function CompleteOptionsToggles({
  handleSetViewState,
  fontColor,
  globalUiVariables,
  mode = 'immediate', // 'immediate' or 'confirm'
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
  /** Font color */
  fontColor: string;
  /** Global UI view state variables  */
  globalUiVariables: ObjByString;
  mode?: 'immediate' | 'confirm'; // add mode prop
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  // Get the tracking purposes from Airgap for display
  const initialConsentSelections = getConsentSelections(airgap);
  const purposeToMessageKey = useGetPurposeMessageKeys({
    consentSelection: initialConsentSelections,
    defaultPurposeToMessageKey: DEFAULT_PURPOSE_TO_MESSAGE_KEY,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const purposeToDescription = useMemo(() => airgap.getPurposeTypes(), []);
  const purposeToDescriptionKey = useGetPurposeDescriptionKeys({
    consentSelection: initialConsentSelections,
    defaultPurposeToDescriptionKey: DEFAULT_PURPOSE_TO_DESCRIPTION_KEY,
    airgapPurposes: purposeToDescription,
  });
  // Set state on the currently selected toggles
  const [consentSelections, setConsentSelections] = useState(
    initialConsentSelections,
  );

  // For confirm mode, keep a separate state for pending changes
  const [pendingSelections, setPendingSelections] = useState(consentSelections);

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
    if (mode === 'immediate') {
      airgap.setConsent(event, { [purpose]: checked }, CONSENT_OPTIONS);
      setConsentSelections({
        ...consentSelections,
        [purpose]: checked,
      });
    } else {
      setPendingSelections({
        ...pendingSelections,
        [purpose]: checked,
      });
    }
    console.log('Testing Confirmation: ', airgap.getConsent().purposes);
  };

  // When Confirm is pressed in confirm mode
  const handleConfirm = (event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    airgap.setConsent(event, pendingSelections, CONSENT_OPTIONS);
    setConsentSelections(pendingSelections);
    console.log('Testing Confirmation: ', airgap.getConsent().purposes);
    handleSetViewState('close');
  };

  // Use correct selections for rendering
  const selectionsToRender = mode === 'immediate' ? consentSelections : pendingSelections;

  return (
    <div className="column-content" role="none">
      <CloseButton
        onClick={() => {
          handleSetViewState('close');
        }}
        className="complete-options-toggle-close"
        fontColor={fontColor}
        globalUiVariables={globalUiVariables}
        {...(Object.entries(selectionsToRender).length === 0 ? { initialFocus: true } : {})}
      />
      <div>
        <div>
          <p
            id="consent-dialog-title"
            role="heading"
            className="text-title text-title-left"
          >
            {formatMessage(
              messages.consentTitleCompleteOptionsToggle,
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
                messages.consentTitleCompleteOptionsToggleDescription,
                globalUiVariables,
              ),
            }}
          />
        </div>
        <div
          className="margin-tops complete-options-toggle-interface"
          role="group"
          aria-label={formatMessage(
            messages.buttonGroupAriaDescription,
            globalUiVariables,
          )}
        >
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
                  ? formatMessage(
                      purposeToMessageKey.Essential,
                      globalUiVariables,
                    )
                  : 'Essential'
              }
            />
            <p className="paragraph complete-options-toggle-description">
              {formatMessage(
                purposeToDescriptionKey.Essential,
                globalUiVariables,
              )}
            </p>
          </span>
          {orderedSelections.map(([purpose, isChecked], idx) => (
            <span key={purpose}>
              <Switch
                id={purpose}
                checked={selectionsToRender[purpose]}
                handleSwitch={(checked, event) =>
                  handleSwitch({
                    checked,
                    purpose,
                    event,
                  })
                }
                label={
                  Object.hasOwnProperty.call(purposeToMessageKey, purpose)
                    ? formatMessage(
                        purposeToMessageKey[purpose],
                        globalUiVariables,
                      )
                    : purpose
                }
                {...(idx === 0 ? { initialFocus: true } : {})}
              />
              <p className="paragraph complete-options-toggle-description">
                {formatMessage(
                  purposeToDescriptionKey[purpose],
                  globalUiVariables,
                )}
              </p>
            </span>
          ))}
        </div>
        {mode === 'confirm' && (
          <div className="confirm-button-container">
            <Button
              primaryText={formatMessage(completeOptionsMessages.saveButtonPrimary, globalUiVariables)}
              handleClick={handleConfirm}
              {...(orderedSelections.length === 0 ? { initialFocus: true } : {})}
            />
          </div>
        )}
      </div>
    </div>
  );
}
