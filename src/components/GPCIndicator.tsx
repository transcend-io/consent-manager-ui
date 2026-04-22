import { h, JSX } from 'preact';
import { useIntl } from 'react-intl';
import { useAirgap } from '../hooks';
import { completeOptionsMessages } from '../messages';
import { ObjByString } from '@transcend-io/type-utils';
import { arePrivacySignalsApplicable } from 'src/utils/is-privacy-signal-applicable';

/**
 * Indicator that the Global Privacy Control signal is controlling this setting
 */
export function GPCIndicator({
  globalUiVariables,
}: {
  /** Global variables to pass to message contents */
  globalUiVariables: ObjByString;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const { airgap } = useAirgap();

  // Is Global Privacy Control setting the SaleOfInfo toggle?
  const gpcSetThis: boolean = arePrivacySignalsApplicable(airgap, ['GPC']);

  // Don't render if GPC is not setting this, or we're not in a relevant territory
  if (!gpcSetThis) return <span style={{ display: 'none' }} />;

  return (
    <div className="gpc-setting">
      <svg height="6" width="6">
        <circle cx="3" cy="3" r="3" fill="#52c41a" />
      </svg>
      <p>
        {formatMessage(
          completeOptionsMessages.globalPrivacySignal,
          globalUiVariables,
        )}
      </p>
    </div>
  );
}
