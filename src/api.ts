import {
  AirgapAPI,
  ConsentManagerAPI,
  ViewState,
  InitialViewState,
} from '@transcend-io/airgap.js-types';
import { isViewStateClosed } from './hooks';
import { logger } from './logger';
import { PRIVACY_SIGNAL_NAME } from './privacy-signals';
import { LOG_LEVELS, settings } from './settings';
import {
  HandleSetAuth,
  HandleSetLanguage,
  HandleChangePrivacyPolicy,
  HandleSetViewState,
  HandleChangeUiVariables,
} from './types';
import { VERSION } from './constants';
import type { ConsentManagerSupportedTranslationValue } from '@transcend-io/internationalization';
import { getTranscendPolicies } from './utils/getTranscendPolicies';
import { ObjByString } from '@transcend-io/type-utils';

interface MakeConsentManagerAPIInput {
  /** The event target, where events as dispatched */
  eventTarget: EventTarget;
  /** Property for the current view state of the consent manager UI */
  viewState: ViewState;
  /** The currently selected language */
  activeLocale: ConsentManagerSupportedTranslationValue;
  /** The current dynamic variables */
  currentVariables: ObjByString;
  /** Method to handle setting auth */
  handleSetAuth: HandleSetAuth;
  /** Method to handle changes to UI global variables */
  handleChangeUiVariables: HandleChangeUiVariables;
  /** Method to change language */
  handleChangeLanguage: HandleSetLanguage;
  /** Method to change view state */
  handleSetViewState: HandleSetViewState;
  /** Method to change the current privacy policy URL */
  handleChangePrivacyPolicy: HandleChangePrivacyPolicy;
  /** Method to change the current secondary policy URL */
  handleChangeSecondaryPolicy: HandleChangePrivacyPolicy;
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
  eventTarget,
  viewState,
  activeLocale,
  currentVariables,
  handleSetAuth,
  handleChangeLanguage,
  handleChangeUiVariables,
  handleChangePrivacyPolicy,
  handleChangeSecondaryPolicy,
  handleSetViewState,
  airgap,
}: MakeConsentManagerAPIInput): ConsentManagerAPI {
  const consentManagerMethods: Omit<ConsentManagerAPI, keyof EventTarget> = {
    setAuth: handleSetAuth,
    setUiVariables: (variables) =>
      Promise.resolve(handleChangeUiVariables(variables)),
    getUiVariables: () => currentVariables,
    getPolicies: (input = {}) =>
      Promise.resolve(
        getTranscendPolicies(
          input,
          settings.policiesCdnLocation,
          activeLocale,
          currentVariables,
        ),
      ),
    setPrivacyPolicy: (privacyPolicyLink) =>
      Promise.resolve(handleChangePrivacyPolicy(privacyPolicyLink)),
    setSecondaryPolicy: (privacyPolicyLink) =>
      Promise.resolve(handleChangeSecondaryPolicy(privacyPolicyLink)),
    setActiveLocale: (locale) => Promise.resolve(handleChangeLanguage(locale)),
    getActiveLocale: () => activeLocale,
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
    // eslint-disable-next-line require-await
    showConsentManager: async (options) => {
      if (options?.viewState === ViewState.TCF_EU) {
        logger.error(
          'TCF_EU view state is not valid for this user experience. ' +
            'Please configure your Regional Experience to use this view state and try again.',
        );
        return;
      }
      const excludedViewStates: InitialViewState[] = [
        InitialViewState.TCF_EU, // not valid without TCF experience
        InitialViewState.Hidden, // not 'open'
      ];
      const validViewStates = Object.values(InitialViewState).filter(
        (state) => !excludedViewStates.includes(state),
      );
      if (
        options?.viewState &&
        !validViewStates.includes(options.viewState as InitialViewState)
      ) {
        logger.error(
          `${
            options.viewState
          } is not a valid view state. Valid view states include ${validViewStates.join(
            ', ',
          )}`,
        );
        return;
      }
      handleSetViewState(options?.viewState || 'open', undefined, true);
    },
    hideConsentManager: () => Promise.resolve(handleSetViewState('close')),
    toggleConsentManager: () =>
      Promise.resolve(
        handleSetViewState(
          isViewStateClosed(viewState) ? 'open' : 'close',
          undefined,
          true,
        ),
      ),
    autoShowConsentManager: (options) => {
      if (options?.viewState === ViewState.TCF_EU) {
        logger.error(
          'TCF_EU view state is not valid for this user experience. ' +
            'Please configure your Regional Experience to use this view state and try again.',
        );
        return Promise.reject();
      }
      const excludedViewStates: InitialViewState[] = [
        InitialViewState.TCF_EU, // not valid without TCF experience
        InitialViewState.Hidden, // not 'open'
      ];
      const validViewStates = Object.values(InitialViewState).filter(
        (state) => !excludedViewStates.includes(state),
      );
      if (
        options?.viewState &&
        !validViewStates.includes(options.viewState as InitialViewState)
      ) {
        logger.error(
          `${
            options.viewState
          } is not a valid view state. Valid view states include ${validViewStates.join(
            ', ',
          )}`,
        );
        return Promise.reject();
      }
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
      handleSetViewState(options?.viewState || 'open', undefined, true);
      return Promise.resolve();
    },
    version: VERSION,
  };

  const consentManagerAPI: ConsentManagerAPI = Object.assign(
    eventTarget,
    consentManagerMethods,
  );

  return consentManagerAPI;
}
