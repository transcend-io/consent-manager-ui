import { h, JSX } from 'preact';
import type {
  AirgapAPI,
  AirgapAuth,
  ConsentManagerConfig,
  ViewState,
} from '@transcend-io/airgap.js-types';
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';
import { isResponseViewState, isViewStateClosed } from '../hooks';
import type { HandleSetViewState } from '../types';
import { Collapsed } from './Collapsed';
import { AcceptAll } from './AcceptAll';
import { BottomMenu } from './BottomMenu';
import { CompleteOptions } from './CompleteOptions';
import { LanguageButton } from './LanguageButton';
import { LanguageOptions } from './LanguageOptions';
import { CompleteOptionsInverted } from './CompleteOptionsInverted';
import { TranscendLogo } from './TranscendLogo';
import { NoticeAndDoNotSell } from './NoticeAndDoNotSell';
import { QuickOptions } from './QuickOptions';
import { OptOutDisclosure } from './OptOutDisclosure';
import { AcceptOrRejectAdvertising } from './AcceptOrRejectAdvertising';
import { AcceptOrRejectAll } from './AcceptOrRejectAll';
import { DoNotSellDisclosure } from './DoNotSellDisclosure';
import { AcceptOrRejectAnalytics } from './AcceptOrRejectAnalytics';
import { DoNotSellExplainer } from './DoNotSellExplainer';
import { QuickOptions3 } from './QuickOptions3';
import { PrivacyPolicyNotice } from './PrivacyPolicyNotice';
import { PrivacyPolicyNoticeWithCloseButton } from './PrivacyPolicyNoticeWithCloseButton';
import { AcceptAllOrMoreChoices } from './AcceptAllOrMoreChoices';
import { AcceptOrRejectAllOrMoreChoices } from './AcceptOrRejectAllOrMoreChoices';
import { AcceptAllRejectAllToggle } from './AcceptAllRejectAllToggle';
import { useEffect, useRef } from 'preact/hooks';
import { CompleteOptionsToggles } from './CompleteOptionsToggles';
import { useIntl } from 'react-intl';
import { messages } from '../messages';
import { initialFocusElement } from '../helpers';
import { ObjByString } from '@transcend-io/type-utils';

/**
 * Presents view states (collapsed, GDPR-mode, CCPA-mode etc)
 */
export function Main({
  airgap,
  viewState,
  config,
  firstSelectedViewState,
  globalUiVariables,
  handleSetViewState,
  handleChangeLanguage,
  supportedLanguages,
  modalOpenAuth,
}: {
  /** Global variables for UI view state */
  globalUiVariables: ObjByString;
  /** airgap.js API */
  airgap: AirgapAPI;
  /** Configuration for consent UI */
  config: ConsentManagerConfig;
  /** The on click event passed as authentication to airgap. Needed for do-not-sell acknowledgement */
  modalOpenAuth?: AirgapAuth;
  /** The current viewState of the consent manager */
  viewState: ViewState;
  /** First view state selected when transcend.showConsentManager() is called */
  firstSelectedViewState: ViewState | null;
  /** Updater function for viewState */
  handleSetViewState: HandleSetViewState;
  /** Updater function for language change */
  handleChangeLanguage: (language: ConsentManagerLanguageKey) => void;
  /** Set of supported languages */
  supportedLanguages: ConsentManagerLanguageKey[];
}): JSX.Element {
  const { formatMessage } = useIntl();
  // need to focus the element marked with data-initialFocus when the modal is opened
  // regular autofocus attributes caused errors, thus the data attribute usage
  // NOTE: if we want to meet a11y guidelines we will need to implement a focus trap as well
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isViewStateClosed(viewState) && dialogRef.current) {
      const shouldAutofocus = !config?.autofocus || config?.autofocus === 'on';
      // This setTimeout was necessary for the api triggered states, (DoNotSell|OptOut)Disclosure
      setTimeout(() => {
        if (dialogRef.current && shouldAutofocus) {
          initialFocusElement(dialogRef.current);
        }
      }, 0);
    }
  }, [viewState, dialogRef, config.autofocus]);

  // Modal open views
  if (!isViewStateClosed(viewState)) {
    if (!isResponseViewState(viewState) && !airgap.getConsent().prompted) {
      airgap.setPrompted(true);
    }
    return (
      <div
        role="region"
        aria-label={formatMessage(messages.modalAriaLabel, globalUiVariables)}
        className="modal-container"
        id="consentManagerMainDialog"
        ref={dialogRef}
      >
        <div className="modal-container-inner">
          <div className="inner-container">
            {viewState === 'QuickOptions' && (
              <QuickOptions
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'AcceptAll' && (
              <AcceptAll
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'AcceptOrRejectAnalytics' && (
              <AcceptOrRejectAnalytics
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}
            {viewState === 'AcceptOrRejectAdvertising' && (
              <AcceptOrRejectAdvertising
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'DoNotSellExplainer' && (
              <DoNotSellExplainer
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'CompleteOptionsToggles' && (
              <CompleteOptionsToggles
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'QuickOptions3' && (
              <QuickOptions3
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'PrivacyPolicyNotice' && (
              <PrivacyPolicyNotice
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'PrivacyPolicyNoticeWithCloseButton' && (
              <PrivacyPolicyNoticeWithCloseButton
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'AcceptOrRejectAll' && (
              <AcceptOrRejectAll
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'AcceptAllRejectAllToggle' && (
              <AcceptAllRejectAllToggle
                handleSetViewState={handleSetViewState}
                fontColor={config.theme.fontColor}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'AcceptAllOrMoreChoices' && (
              <AcceptAllOrMoreChoices
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'AcceptOrRejectAllOrMoreChoices' && (
              <AcceptOrRejectAllOrMoreChoices
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'DoNotSellDisclosure' && modalOpenAuth && (
              <DoNotSellDisclosure
                handleSetViewState={handleSetViewState}
                modalOpenAuth={modalOpenAuth}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'OptOutDisclosure' && modalOpenAuth && (
              <OptOutDisclosure
                handleSetViewState={handleSetViewState}
                modalOpenAuth={modalOpenAuth}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'CompleteOptions' && (
              <CompleteOptions
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'CompleteOptionsInverted' && (
              <CompleteOptionsInverted
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'NoticeAndDoNotSell' && (
              <NoticeAndDoNotSell
                handleSetViewState={handleSetViewState}
                globalUiVariables={globalUiVariables}
              />
            )}

            {viewState === 'LanguageOptions' && (
              <LanguageOptions
                handleSetViewState={handleSetViewState}
                handleChangeLanguage={handleChangeLanguage}
                supportedLanguages={supportedLanguages}
              />
            )}
          </div>
          <div className="footer-container">
            <TranscendLogo fontColor={config.theme.fontColor} />
            <BottomMenu
              firstSelectedViewState={firstSelectedViewState}
              viewState={viewState}
              handleSetViewState={handleSetViewState}
              privacyPolicy={config.privacyPolicy}
              secondaryPolicy={config.secondaryPolicy}
              globalUiVariables={globalUiVariables}
            />
            <LanguageButton
              handleSetViewState={handleSetViewState}
              viewState={viewState}
              fontColor={config.theme.fontColor}
              supportedLanguages={supportedLanguages}
              globalUiVariables={globalUiVariables}
            />
          </div>
        </div>
      </div>
    );
  }

  // Modal collapsed view
  if (
    viewState === 'Collapsed' &&
    (!firstSelectedViewState || !isViewStateClosed(firstSelectedViewState))
  ) {
    return (
      <Collapsed
        handleSetViewState={handleSetViewState}
        globalUiVariables={globalUiVariables}
      />
    );
  }

  // Completely hidden
  return <div />;
}
