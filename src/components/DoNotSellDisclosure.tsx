import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import type { AirgapAuth } from '@transcend-io/airgap.js-types';
import { useEffect, useState } from 'preact/hooks';
import { noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState } from '../types';
import { useAirgap } from '../hooks';
import { Button } from './Button';
import { CONSENT_OPTIONS } from '../constants';

/**
 * Component showing acknowledgement of do not sell
 */
export function DoNotSellDisclosure({
  handleSetViewState,
  modalOpenAuth,
}: {
  /** Authentication for opening the airgap modal */
  modalOpenAuth: AirgapAuth;
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  // don't render success unless opt out occurs
  const [isOptedOut, setIsOptedOut] = useState(false);

  const handleOptOut = (event: AirgapAuth): void => {
    // Confirm current consent
    airgap.setConsent(event, { SaleOfInfo: false }, CONSENT_OPTIONS);
  };

  const handleConfirm = (): void => {
    handleSetViewState('close');
  };

  // Check for GPC
  const privacySignals = airgap.getPrivacySignals();
  const globalPrivacyControl = privacySignals.has('GPC');

  // opt the user out on modal open
  useEffect(() => {
    handleOptOut(modalOpenAuth);
    setIsOptedOut(true);
  }, []);

  // delay UI until opt out happens
  if (!isOptedOut) {
    return <div />;
  }
  return (
    <div className="column-content">
      <div>
        <div>
          <p id="consent-dialog-title" className="text-title text-title-left">
            {formatMessage(
              globalPrivacyControl
                ? noticeAndDoNotSellMessages.doNotSellHonoredGpc
                : noticeAndDoNotSellMessages.doNotSellHonored,
            )}
          </p>
        </div>
        <div>
          <p className="paragraph">
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: formatMessage(
                  noticeAndDoNotSellMessages.doNotSellHonoredDescription,
                ),
              }}
            />
          </p>
        </div>
      </div>
      <Button
        primaryText={formatMessage(
          noticeAndDoNotSellMessages.confirmButtonPrimary,
        )}
        handleClick={handleConfirm}
      />
    </div>
  );
}
