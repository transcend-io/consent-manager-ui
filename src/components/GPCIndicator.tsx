import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import type { AirgapAPI } from '@transcend-io/airgap.js-types';
import { useAirgap } from '../hooks';
import { completeOptionsMessages } from '../messages';
import { getPrimaryRegime } from '../regimes';
import { NavigatorWithGPC } from '../types';

/**
 * Helper to get the current sale of info setting
 */
function getSaleOfInfoIsOn(airgap: AirgapAPI): boolean {
  // Get the current consent state of Airgap from storage
  const consent = airgap.getConsent();
  const purpose = 'SaleOfInfo';
  return !!consent.purposes[purpose];
}

/**
 * Indicator that the Global Privacy Control signal is controlling this setting
 */
export function GPCIndicator(): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();
  const regime = getPrimaryRegime(airgap.getRegimes());

  // Get whether SaleOfInfo is on right now in Airgap
  const saleOfInfoIsOn = getSaleOfInfoIsOn(airgap);

  // Is Global Privacy Control setting the SaleOfInfo toggle?
  const { globalPrivacyControl } = navigator as NavigatorWithGPC;
  const gpcSetThis = globalPrivacyControl && !saleOfInfoIsOn;

  // Don't render if GPC is not setting this, or we're not in a relevant territory
  if (!gpcSetThis || regime !== 'CPRA') return <span />;

  return (
    <div className="gpc-setting">
      <svg height="6" width="6">
        <circle cx="3" cy="3" r="3" fill="#52c41a" />
      </svg>
      <p>{formatMessage(completeOptionsMessages.globalPrivacySignal)}</p>
    </div>
  );
}
