// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// main
import { DefinedMessage } from '@transcend-io/internationalization';

// global
import { useConfig, useEmotion } from '@transcend-io/consent-manager-ui/src/hooks';
import { completeOptionsMessages } from '@transcend-io/consent-manager-ui/src/messages';
import type { ConsentSelection } from '@transcend-io/consent-manager-ui/src/types';

// local
import Button from './Button';
import GPCIndicator from './GPCIndicator';
import Toggle from './Toggle';

// Mapping of purposes to the message translation key
const purposeToMessageKey: Record<string, DefinedMessage> = {
  Essential: completeOptionsMessages.essentialLabel,
  Functional: completeOptionsMessages.functionalLabel,
  Analytics: completeOptionsMessages.analyticsLabel,
  Advertising: completeOptionsMessages.advertisingLabel,
  SaleOfInfo: completeOptionsMessages.saleOfInfoLabel,
};

/**
 * The consent form with toggles and save button
 */
export default function Form({
  consentSelections,
  handleToggle,
  handleSave,
}: {
  /** For each tracking purpose, whether the toggle button is on/off (not enforced until they hit save) */
  consentSelections: ConsentSelection;
  /** When a checkbox toggle is hit */
  handleToggle: (purpose: string, checked: boolean) => void;
  /** When the consent preferences are actually saved */
  handleSave: JSX.MouseEventHandler<HTMLButtonElement> | undefined;
}): JSX.Element {
  const { css, cx } = useEmotion();
  const { formatMessage } = useIntl();

  const { config } = useConfig();

  const formStyle = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  `;

  const togglesContainer = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    justify-content: center;

    @media (min-width: ${config.breakpoints.tablet}) {
      flex-direction: row;
    }
  `;

  return (
    <form className={cx(formStyle)}>
      <GPCIndicator />
      <div className={cx(togglesContainer)}>
        <Toggle
          key="Essential"
          name={formatMessage(purposeToMessageKey.Essential)}
          initialToggleState
          disabled
          handleToggle={() => {
            // noop
          }}
          ariaLabel={formatMessage(completeOptionsMessages.essentialAriaLabel)}
        />
        {Object.entries(consentSelections).map(([purpose, isChecked]) => (
          <Toggle
            key={purpose}
            name={
              Object.hasOwnProperty.call(purposeToMessageKey, purpose)
                ? formatMessage(purposeToMessageKey[purpose])
                : purpose
            }
            initialToggleState={isChecked}
            disabled={false}
            handleToggle={(checked: boolean) => handleToggle(purpose, checked)}
          />
        ))}
      </div>
      <Button
        handleClick={handleSave}
        primaryText={formatMessage(completeOptionsMessages.saveButtonPrimary)}
      />
    </form>
  );
}
