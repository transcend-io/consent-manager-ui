import {
  AirgapAPI,
  ConsentManagerAPI,
  ViewState,
} from '@transcend-io/airgap.js-types';
import { isViewStateClosed } from './hooks';
import { logger } from './logger';
import { PRIVACY_SIGNAL_NAME } from './privacy-signals';
import { LOG_LEVELS } from './settings';
import { HandleSetLanguage, HandleSetViewState } from './types';

interface MakeConsentManagerAPIInput {
  /** Property for the current view state of the consent manager UI */
  viewState: ViewState;
  /** Method to change language */
  handleChangeLanguage: HandleSetLanguage;
  /** Method to change view state */
  handleSetViewState: HandleSetViewState;
  /** Airgap.js */
  airgap: AirgapAPI;
}

let promptSuppressionNoticeShown = false;

/**
 * Create the Consent Manager API object
 *
 * @param input - the methods the API triggers, and the values it returns
 * @returns the Consent Manager API
 */
export function makeConsentManagerAPI({
  viewState,
  handleChangeLanguage,
  handleSetViewState,
  airgap,
}: MakeConsentManagerAPIInput): ConsentManagerAPI {
  const api: ConsentManagerAPI = {
    setActiveLocale: (locale) => Promise.resolve(handleChangeLanguage(locale)),
    getViewState: () => viewState,
    viewStates: new Set(Object.values(ViewState)),
    doNotSell: (auth, options) =>
      Promise.resolve(
        handleSetViewState(options?.viewState || 'DoNotSellDisclosure', auth),
      ),
    optOutNotice: (auth, options) =>
      Promise.resolve(
        handleSetViewState(options?.viewState || 'OptOutDisclosure', auth),
      ),
    showConsentManager: (options) =>
      Promise.resolve(
        handleSetViewState(options?.viewState || 'open', undefined, true),
      ),
    hideConsentManager: () => Promise.resolve(handleSetViewState('close')),
    toggleConsentManager: () =>
      Promise.resolve(
        handleSetViewState(
          isViewStateClosed(viewState) ? 'open' : 'close',
          undefined,
          true,
        ),
      ),
    autoShowConsentManager: () => {
      const privacySignals = airgap.getPrivacySignals();
      const regimePurposes = airgap.getRegimePurposes();
      const applicablePrivacySignals =
        // Prompt was auto-suppressed with DNT+any regime or GPC+regimes with SaleOfInfo
        (privacySignals.has('DNT') && regimePurposes.size > 0) ||
        (privacySignals.has('GPC') && regimePurposes.has('SaleOfInfo'));
      const shouldShowNotice = !airgap.getConsent().confirmed;
      if (!shouldShowNotice) {
        if (
          applicablePrivacySignals &&
          !promptSuppressionNoticeShown &&
          LOG_LEVELS.has('warn')
        ) {
          logger.warn(
            'Tracking consent auto-prompt suppressed due to supported privacy signals:',
            [...privacySignals].map((signal) =>
              // expand supported privacy signals to their full names
              PRIVACY_SIGNAL_NAME.has(signal)
                ? PRIVACY_SIGNAL_NAME.get(signal)
                : signal,
            ),
            // eslint-disable-next-line max-len
            '\n\nSee https://docs.transcend.io/docs/consent/configuration/configuring-the-ui#user-privacy-signal-integration for more information.',
          );
          promptSuppressionNoticeShown = true;
        }
        return Promise.resolve();
      }
      handleSetViewState('open', undefined, true);
      return Promise.resolve();
    },
  };

  return api;
}
