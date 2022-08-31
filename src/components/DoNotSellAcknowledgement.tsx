// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// global
import { noticeAndDoNotSellMessages } from '../messages';
import type { HandleSetViewState, NavigatorWithGPC } from '../types';
import { useAirgap } from '../hooks';

// local
import Button from './Button';
import ColumnContent from './ColumnContent';
import Title from './Title';
import { Purpose } from '@transcend-io/airgap.js-types';
import { useEffect } from 'preact/hooks';

/**
 * Component showing acknowledgement of do not sell
 */
export default function DoNotSellAcknowledgement({
  handleSetViewState,
}: {
  /** Function to change viewState */
  handleSetViewState: HandleSetViewState;
}): JSX.Element {
  const { airgap } = useAirgap();
  const { formatMessage } = useIntl();

  const handleOptOut: JSX.MouseEventHandler<HTMLButtonElement> | undefined = (
    event: JSX.TargetedEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
    // Confirm current consent
    airgap.setConsent(event, {
      ...airgap.getConsent().purposes,
      [Purpose.SaleOfInfo]: false,
    });
    console.log(airgap.getConsent());
  };

  const { globalPrivacyControl } = navigator as NavigatorWithGPC;

  useEffect(() => {
    handleOptOut();
  }, []);

  // FIXME

  return (
    <ColumnContent>
      <div>
        <div>
          <Title align="left">
            {formatMessage(
              globalPrivacyControl
                ? noticeAndDoNotSellMessages.doNotSellHonoredGpc
                : noticeAndDoNotSellMessages.doNotSellHonored,
            )}
          </Title>
        </div>
        <div>
          <p>
            {formatMessage(
              globalPrivacyControl
                ? noticeAndDoNotSellMessages.doNotSellHonoredGpcDescription
                : noticeAndDoNotSellMessages.doNotSellHonoredDescription,
            )}
          </p>
        </div>
      </div>
      <Button
        primaryText={formatMessage(
          noticeAndDoNotSellMessages.confirmButtonPrimary,
        )}
        handleClick={handleConfirm}
      />
    </ColumnContent>
  );
}
