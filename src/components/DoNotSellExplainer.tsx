import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { Button } from './Button';
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
  };

  const switchId = `sale-of-info-${consentLocal}`;

  return (
    <div className="column-content">
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
          <Button
            primaryText={formatMessage(messages.close)}
            handleClick={() => handleSetViewState('Closed')}
          />
        </div>
      </div>
    </div>
  );
}
