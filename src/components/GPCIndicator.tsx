// external
import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';

// main
import type { AirgapAPI } from '@transcend-io/airgap.js-types';

// global
import { useAirgap, useConfig, useEmotion, useRegime } from '../hooks';
import { completeOptionsMessages } from '../messages';

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
 * Type override for new GPC standard (not in official DOM spec yet)
 */
type NavigatorWithGPC = Navigator & {
  /** see https://globalprivacycontrol.github.io/gpc-spec/ */
  globalPrivacyControl: boolean;
};

/**
 * Indicator that the Global Privacy Control signal is controlling this setting
 */
export default function GPCIndicator(): JSX.Element {
  const { css, cx } = useEmotion();
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();
  const regime = useRegime(airgap);
  const { config } = useConfig();

  const gpcSettingStyle = css`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    svg {
      flex-shrink: 0;
    }

    p {
      margin: 0 0 0 6px;
      font-size: 12px;
      color: ${config.theme.fontColor};
    }
  `;

  // Get whether SaleOfInfo is on right now in Airgap
  const saleOfInfoIsOn = getSaleOfInfoIsOn(airgap);

  // Is Global Privacy Control setting the SaleOfInfo toggle?
  const { globalPrivacyControl } = navigator as NavigatorWithGPC;
  const gpcSetThis = globalPrivacyControl && !saleOfInfoIsOn;

  // Don't render if GPC is not setting this, or we're not in a relevant territory
  if (!gpcSetThis || regime !== 'CPRA') return <span />;

  return (
    <div className={cx(gpcSettingStyle)}>
      <svg height="6" width="6">
        <circle cx="3" cy="3" r="3" fill="#52c41a" />
      </svg>
      <p>{formatMessage(completeOptionsMessages.globalPrivacySignal)}</p>
    </div>
  );
}
