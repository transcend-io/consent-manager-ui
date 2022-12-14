import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { messages } from '../messages';
import type { HandleSetViewState } from '../types';
import { GPCIndicator } from './GPCIndicator';
import { Switch } from './Switch';

/**
 * Component showing explanatory text before offering a way
 * to opt out of the sale or share of data
 */
export function DoNotSellNotice({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();
  const [consentLocale, setConsentLocal] = useState(
    !!airgap.getConsent().purposes.SaleOfInfo,
  );

  // Opt in to all purposes
  const handleDoNotSellNotice = (
    value: boolean,
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ): void => {
    event.preventDefault();
    airgap.setConsent(event, { SaleOfInfo: value });
    setConsentLocal(value);
  };

  return (
    <div className="column-content">
      <div>
        <div>
          <p className="text-title text-title-left">
            {formatMessage(messages.consentTitleDoNotSellNotice)}
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
            {/* {formatMessage(messages.doNotSellDescription, {
              a: (chunks) => <a href="/test">{chunks}</a>,
              p: (chunks) => <p>{chunks}</p>,
              b: (chunks) => <b>{chunks}</b>,
              i: (chunks) => <i>{chunks}</i>,
            })} */}
          </p>
        </div>
        <div>
          <Switch
            id={`sale-of-info-${consentLocale}`}
            checked={consentLocale}
            handleSwitch={handleDoNotSellNotice}
          />
          <p className="paragraph">
            {formatMessage(
              consentLocale
                ? messages.doNotSellOptedIn
                : messages.doNotSellOptedOut,
            )}
            <GPCIndicator />
          </p>
        </div>
      </div>
    </div>
  );
}
