import { h, JSX } from 'preact';
import { AirgapAuth, ViewState } from '@transcend-io/airgap.js-types';
import { ConsentManagerLanguageKey } from '@transcend-io/internationalization';
import { viewStateIsClosed } from '../hooks';
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

/**
 * Presents view states (collapsed, GDPR-mode, CCPA-mode etc)
 */
export function Main({
  viewState,
  firstSelectedViewState,
  handleSetViewState,
  handleChangeLanguage,
  supportedLanguages,
  modalOpenAuth,
}: {
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
  if (!viewStateIsClosed(viewState)) {
    return (
      <div role="dialog" aria-model="true" className="modal-container">
        <div role="document" className="modal-container-inner">
          {viewState === ViewState.QuickOptions && (
            <QuickOptions handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.AcceptAll && (
            <AcceptAll handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.AcceptOrRejectAnalytics && (
            <AcceptOrRejectAnalytics handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.DoNotSellExplainer && (
            <DoNotSellExplainer handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.QuickOptions3 && (
            <QuickOptions3 handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.PrivacyPolicyNotice && (
            <PrivacyPolicyNotice handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.AcceptOrRejectAll && (
            <AcceptOrRejectAll handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.DoNotSellDisclosure && modalOpenAuth && (
            <DoNotSellDisclosure
              handleSetViewState={handleSetViewState}
              modalOpenAuth={modalOpenAuth}
            />
          )}

          {viewState === ViewState.CompleteOptions && (
            <CompleteOptions handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.CompleteOptionsInverted && (
            <CompleteOptionsInverted handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.NoticeAndDoNotSell && (
            <NoticeAndDoNotSell handleSetViewState={handleSetViewState} />
          )}

          {viewState === ViewState.LanguageOptions && (
            <LanguageOptions
              handleSetViewState={handleSetViewState}
              handleChangeLanguage={handleChangeLanguage}
              supportedLanguages={supportedLanguages}
            />
          )}

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
    viewState === ViewState.Collapsed &&
    (!firstSelectedViewState || !viewStateIsClosed(firstSelectedViewState))
  ) {
    return <Collapsed handleSetViewState={handleSetViewState} />;
  }

  // Completely hidden
  return <div />;
}
