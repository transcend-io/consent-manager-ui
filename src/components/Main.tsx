import { h, JSX } from 'preact';
import type {
  AirgapAPI,
  AirgapAuth,
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
import { AcceptOrRejectAll } from './AcceptOrRejectAll';
import { DoNotSellDisclosure } from './DoNotSellDisclosure';
import { AcceptOrRejectAnalytics } from './AcceptOrRejectAnalytics';
import { DoNotSellExplainer } from './DoNotSellExplainer';
import { QuickOptions3 } from './QuickOptions3';
import { PrivacyPolicyNotice } from './PrivacyPolicyNotice';
import { AcceptAllOrMoreChoices } from './AcceptAllOrMoreChoices';
import { AcceptOrRejectAllOrMoreChoices } from './AcceptOrRejectAllOrMoreChoices';

/**
 * Presents view states (collapsed, GDPR-mode, CCPA-mode etc)
 */
export function Main({
  airgap,
  viewState,
  firstSelectedViewState,
  handleSetViewState,
  handleChangeLanguage,
  supportedLanguages,
  modalOpenAuth,
}: {
  /** airgap.js API */
  airgap: AirgapAPI;
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
  // Modal open views
  if (!isViewStateClosed(viewState)) {
    if (!isResponseViewState(viewState)) {
      airgap.setPrompted(true);
    }
    return (
      <div role="dialog" aria-model="true" className="modal-container">
        <div role="document" className="modal-container-inner">
          <div role="document" className="inner-container">
            {viewState === 'QuickOptions' && (
              <QuickOptions handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptAll' && (
              <AcceptAll handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptOrRejectAnalytics' && (
              <AcceptOrRejectAnalytics
                handleSetViewState={handleSetViewState}
              />
            )}

            {viewState === 'DoNotSellExplainer' && (
              <DoNotSellExplainer handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'QuickOptions3' && (
              <QuickOptions3 handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'PrivacyPolicyNotice' && (
              <PrivacyPolicyNotice handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptOrRejectAll' && (
              <AcceptOrRejectAll handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptAllOrMoreChoices' && (
              <AcceptAllOrMoreChoices handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'AcceptOrRejectAllOrMoreChoices' && (
              <AcceptOrRejectAllOrMoreChoices
                handleSetViewState={handleSetViewState}
              />
            )}

            {viewState === 'DoNotSellDisclosure' && modalOpenAuth && (
              <DoNotSellDisclosure
                handleSetViewState={handleSetViewState}
                modalOpenAuth={modalOpenAuth}
              />
            )}

            {viewState === 'CompleteOptions' && (
              <CompleteOptions handleSetViewState={handleSetViewState} />
            )}

            {viewState === 'CompleteOptionsInverted' && (
              <CompleteOptionsInverted
                handleSetViewState={handleSetViewState}
              />
            )}

            {viewState === 'NoticeAndDoNotSell' && (
              <NoticeAndDoNotSell handleSetViewState={handleSetViewState} />
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
            <TranscendLogo />
            <BottomMenu
              firstSelectedViewState={firstSelectedViewState}
              viewState={viewState}
              handleSetViewState={handleSetViewState}
            />
            <LanguageButton
              handleSetViewState={handleSetViewState}
              viewState={viewState}
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
    return <Collapsed handleSetViewState={handleSetViewState} />;
  }

  // Completely hidden
  return <div />;
}
